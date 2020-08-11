import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function defer<T>(factory: () => Observable<T>): Observable<T> {
    return new Observable<T>((subscriber) => {
        const observable = factory();

        const subscription = observable.subscribe(
            subscriber.next.bind(subscriber),
            subscriber.error.bind(subscriber),
            subscriber.complete.bind(subscriber)
        );

        return new Subscription(subscription.unsubscribe.bind(subscription));
    });
}
