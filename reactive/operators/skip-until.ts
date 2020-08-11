import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function skipUntil<A>(signal: Observable<any>): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let skipping = true;

        const signalSubscription = signal.subscribe(() => {
           skipping = false;
        });

        const subscription = source.subscribe(
            (value) => {
                if(!skipping) {
                    subscriber.next(value);
                }
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );

        return new Subscription(() => {
           signalSubscription.unsubscribe();
           subscription.unsubscribe();
        });
    });
}
