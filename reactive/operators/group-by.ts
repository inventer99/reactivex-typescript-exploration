import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscriber } from '../subscriber';


export function groupBy<A, K>(keyExtractor: (value: A) => K): OperatorFn<A, Observable<A>> {
    return (source) => new Observable<Observable<A>>((subscriber) => {
        const groups = new Map<K, Subscriber<A>>();

        return source.subscribe(
            (value: A) => {
                try {
                    const key = keyExtractor(value);

                    if(!groups.has(key)) {
                        subscriber.next(new Observable<A>((groupSubscriber) => {
                            groups.set(key, groupSubscriber);
                        }));
                    }

                    const groupSubscriber = groups.get(key);
                    groupSubscriber.next(value);
                } catch(error) {
                    subscriber.error(error);
                }
            },
            (error) => subscriber.error(error),
            () => {
                groups.forEach((groupSubscriber) => {
                    groupSubscriber.complete();
                });
                subscriber.complete();
            }
        );
    });
}
