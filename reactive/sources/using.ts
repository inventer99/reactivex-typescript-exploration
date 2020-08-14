import { Observable } from '../observable';
import { Disposable } from '../utils/disposable';


export function using<T, D extends Disposable>(resourceFactory: () => D, observableFactory: (resource: D) => Observable<T>): Observable<T> {
    return new Observable<T>((subscriber) => {
        try {
            const resource = resourceFactory();

            const observable = observableFactory(resource);

            return observable.subscribe(
                subscriber.next.bind(subscriber),
                (error) => {
                    resource.dispose();
                    subscriber.error(error);
                },
                () => {
                    resource.dispose();
                    subscriber.complete();
                }
            );
        } catch(error) {
            subscriber.error(error);
        }
    });
}
