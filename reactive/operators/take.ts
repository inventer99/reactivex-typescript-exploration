import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function take<A>(n: number): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let count = 0;

        const subscription = source.subscribe(
            (value) => {
                if(count < n) {
                    subscriber.next(value);
                    count++;
                } else {
                    queueMicrotask(() => {
                        subscription.unsubscribe();
                    });
                    subscriber.complete();
                }
            },
            (error) => {
                queueMicrotask(() => {
                    subscription.unsubscribe();
                });
                subscriber.error(error)
            },
            () => {
                queueMicrotask(() => {
                    subscription.unsubscribe();
                });
                subscriber.complete()
            }
        );

        return subscription;
    });
}
