import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function amb<A>(...observables: Array<Observable<A>>): Observable<A> {
    return new Observable<A>((subscriber) => {
        let latch: number;

        const tryLatch = (key: number, callback: () => void) => {
            if(!latch || latch === key) {
                latch = key;
                callback();
            }
        }

        const subscriptions = observables.map((observable, index) => observable.subscribe(
            (value) => tryLatch(index, () => subscriber.next(value)),
            (error) => tryLatch(index, () => subscriber.error(error)),
            () => tryLatch(index, () => subscriber.complete()),
        ));

        return new Subscription(() => {
            subscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
        });
    });
}
