import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function concat<T>(...observables: Array<Observable<T>>): Observable<T> {
    return new Observable((subscriber) => {
        let currentSubscription: Subscription;

        const concat = (currentObservable?: Observable<T>, ...remainingObservables: Array<Observable<T>>) => {
            if(!currentObservable) {
                return;
            }

            currentSubscription = currentObservable.subscribe(
                (value) => subscriber.next(value),
                (error) => subscriber.error(error),
                () => {
                    concat(...remainingObservables);
                    if(!subscriber.isClosed() && remainingObservables.length === 0) {
                        subscriber.complete();
                    }
                }
            );
        };

        concat(...observables);

        return new Subscription(() => {
            currentSubscription.unsubscribe();
        });
    });
}
