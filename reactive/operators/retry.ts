import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function retry<A>(maxAttempts: number = 1): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let attempts = 0;
        const subscriptions: Array<Subscription> = [];
        const attempt = () => source.subscribe(
            (value) => subscriber.next(value),
            (error) => {
                if(attempts < maxAttempts) {
                    attempts++;
                    subscriptions.push(attempt());
                } else {
                    subscriber.error(error);
                }
            },
            () => subscriber.complete()
        );

        subscriptions.push(attempt());

        return new Subscription(() => {
            subscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
        });
    });
}
