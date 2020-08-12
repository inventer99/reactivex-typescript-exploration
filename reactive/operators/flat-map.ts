import { Observable } from '../observable';
import { OperatorFn } from '../operator';
import { Subscription } from '../subscription';


export function flatMap<A, B>(projector: (value: A) => Observable<B>): OperatorFn<A, B> {
    return (source) => new Observable<B>((subscriber) => {
        let canComplete = true, completed = false;
        const subscriptions: Array<Subscription> = [];

        const cleanup = () => subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });

        const subscription = source.subscribe(
            (value) => {
                try {
                    const projected = projector(value);

                    const projectedSubscription = projected.subscribe(
                        (projectedValue) => subscriber.next(projectedValue),
                        (error) => {
                            cleanup();
                            subscriber.error(error);
                        },
                        () => {
                            queueMicrotask(() => {
                                subscriptions.splice(subscriptions.indexOf(subscription), 1);
                                if(subscriptions.length === 0) {
                                    canComplete = true;
                                    if(completed) {
                                        subscriber.complete();
                                    }
                                }
                            });
                        }
                    );
                    subscriptions.push(projectedSubscription);
                    canComplete = false;
                } catch(error) {
                    subscriber.error(error);
                }
            },
            (error) => {
                cleanup();
                subscriber.error(error);
            },
            () => {
                completed = true;
                if(canComplete) {
                    subscriber.complete();
                }
            }
        );

        return new Subscription(() => {
            subscription.unsubscribe();
            cleanup();
        });
    });
}
