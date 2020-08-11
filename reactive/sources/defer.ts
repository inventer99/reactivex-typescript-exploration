import { Observable } from '../observable';


export function defer<T>(factory: () => Observable<T>): Observable<T> {
    return new Observable<T>((subscriber) => {
        try {
            const observable = factory();

            return observable.subscribe(
                subscriber.next.bind(subscriber),
                subscriber.error.bind(subscriber),
                subscriber.complete.bind(subscriber)
            );
        } catch(error) {
            subscriber.error(error);
        }
    });
}
