import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function catchError<A>(handler: (error: any) => Observable<A>): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        return source.subscribe(
            (value) => subscriber.next(value),
            (error) => {
                try {
                    const projected = handler(error);

                    const subscription = projected.subscribe(
                        (value) => subscriber.next(value),
                        (error) => {
                            queueMicrotask(() => {
                                subscription.unsubscribe();
                            });
                            subscriber.error(error);
                        },
                        () => {
                            queueMicrotask(() => {
                                subscription.unsubscribe();
                            });
                            subscriber.complete();
                        }
                    );
                } catch(error) {
                    subscriber.error(error);
                }
            },
            () => subscriber.complete()
        );
    });
}
