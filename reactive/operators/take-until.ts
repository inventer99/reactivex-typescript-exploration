import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function takeUntil<A>(signal: Observable<any>): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let taking = true;

        const signalSubscription = signal.subscribe(() => {
            taking = false;
            subscription.unsubscribe();
        });

        const subscription = source.subscribe(
            (value) => subscriber.next(value),
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );

        return new Subscription(() => {
            signalSubscription.unsubscribe();
            if(taking) {
                subscription.unsubscribe();
            }
        });
    });
}
