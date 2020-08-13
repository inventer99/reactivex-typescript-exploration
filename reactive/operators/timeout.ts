import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscription } from '../subscription';
import { asyncScheduler } from '../schedulers';
import { PendingJob } from '../scheduler';


export function timeout<A>(delay: number): OperatorFn<A, A> {
    return (source) => new Observable((subscriber) => {
        let currentJob: PendingJob;
        const subscription = source.subscribe(
            (value) => {
                subscriber.next(value);

                if(currentJob) {
                    currentJob.cancel();
                }

                currentJob = asyncScheduler.schedule(() => {
                    if(!subscriber.isClosed()) {
                        subscriber.error('timeout');
                    }
                }, delay);
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );

        return new Subscription(() => {
            subscription.unsubscribe();
            if(currentJob) {
                currentJob.cancel();
            }
        });
    });
}
