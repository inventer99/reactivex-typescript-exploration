import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function merge<T>(...observables: Array<Observable<T>>): Observable<T> {
    return new Observable<T>((subscriber) => {
        const completed = new Set<number>();

        const subscriptions = observables.map((observable, index) => observable.subscribe(
            (value) => subscriber.next(value),
            (error) => subscriber.error(error),
            () => {
                completed.add(index);
                if(completed.size === observables.length) {
                    subscriber.complete();
                }
            }
        ));

        return new Subscription(() => {
            subscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
        });
    });
}
