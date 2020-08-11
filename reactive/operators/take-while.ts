import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function takeWhile<A>(predicate: (value: A) => boolean): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let taking = true;

        const subscription = source.subscribe(
            (value) => {
                taking = taking && predicate(value);
                if(taking) {
                    subscriber.next(value)
                } else {
                    queueMicrotask(() => {
                        subscription.unsubscribe();
                    });
                    subscriber.complete();
                }
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );

        return subscription;
    });
}
