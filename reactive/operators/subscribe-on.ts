import { Scheduler } from '../scheduler';
import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function subscribeOn<A>(scheduler: Scheduler): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        let subscription: Subscription;

        const job = scheduler.schedule(() => {
            subscription = source.subscribe(
                (value) => subscriber.next(value),
                (error) => subscriber.error(error),
                () => subscriber.complete(),
            );
        });

        return new Subscription(() => {
            if(job) {
                job.cancel();
            }
            if(subscription) {
                subscription.unsubscribe();
            }
        });
    });
}
