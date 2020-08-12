import { Observable } from '../observable';
import { OperatorFn } from '../operator';
import { Subscription } from '../subscription';


export function concatWith<A>(...observables: Array<Observable<A>>): OperatorFn<A, A> {
    return (source) => new Observable((subscriber) => {
        let currentSubscription: Subscription;

        const concat = (currentObservable?: Observable<A>, ...remainingObservables: Array<Observable<A>>) => {
            if(!currentObservable) {
                return;
            }

            currentSubscription = currentObservable.subscribe(
                (value) => subscriber.next(value),
                (error) => subscriber.error(error),
                () => {
                    concat(...remainingObservables);
                    subscriber.complete();
                }
            );
        };

        concat(source, ...observables);

        return new Subscription(() => {
            currentSubscription.unsubscribe();
        });
    });
}
