import { Observable } from '../observable';
import { OperatorFn } from '../operator';
import { Subscription } from '../subscription';


export function flatMap<A, B>(projector: (value: A) => Observable<B>): OperatorFn<A, B> {
    return (source) => new Observable<B>((subscriber) => {
        const subscriptions: Array<Subscription> = [];

        const cleanup = () => subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });

        subscriptions.push(source.subscribe(
            (value) => {
                try {
                    const projected = projector(value);

                    const subscription = projected.subscribe(
                        (projectedValue) => {
                            subscriber.next(projectedValue);
                        },
                        (error) => {
                            cleanup();
                            subscriber.error(error);
                        },
                        () => {
                            queueMicrotask(() => {
                                subscriptions.splice(subscriptions.indexOf(subscription), 1);
                            });
                        }
                    );
                    subscriptions.push(subscription);
                } catch(error) {
                    subscriber.error(error);
                }
            },
            (error) => {
                cleanup();
                subscriber.error(error);
            },
            () => {
                cleanup();
                subscriber.complete();
            }
        ));

        return new Subscription(() => {
            cleanup();
        });
    });
}
