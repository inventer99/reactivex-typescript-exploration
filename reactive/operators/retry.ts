import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function retry<A>(maxAttempts: number = 1): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let attempts = 0;
        let currentSubscription: Subscription;

        function attempt() {
            currentSubscription = source.subscribe(
                (value) => subscriber.next(value),
                (error) => {
                    if(attempts < maxAttempts) {
                        attempts++;
                        queueMicrotask(() => {
                            currentSubscription.unsubscribe();
                        });
                        attempt();
                    } else {
                        subscriber.error(error);
                    }
                },
                () => subscriber.complete()
            );
        }

        attempt();

        return new Subscription(() => {
            if(currentSubscription) {
                currentSubscription.unsubscribe();
            }
        });
    });
}
