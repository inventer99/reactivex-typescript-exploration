import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function first<A>(): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let receivedNext = false;
        const subscription = source.subscribe(
            (value) => {
                if(!receivedNext) {
                    subscriber.next(value);
                    subscriber.complete();
                    queueMicrotask(() => {
                        subscription.unsubscribe();
                    });
                    receivedNext = true;
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
                if(!receivedNext) {
                    subscriber.complete()
                }
            }
        );

        return new Subscription(() => {
            if(!receivedNext) {
                subscription.unsubscribe();
            }
        });
    });
}
