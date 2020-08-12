import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Subscription } from '../subscription';
import { asyncScheduler } from '../schedulers';
import { PendingJob } from '../scheduler';


export function debounce<A>(delay: number): OperatorFn<A, A> {
    return (source) => new Observable((subscriber) => {
        let currentJob: PendingJob;
        const subscription = source.subscribe(
            (value) => {
                if(currentJob) {
                    currentJob.cancel();
                }

                currentJob = asyncScheduler.schedule(() => {
                    subscriber.next(value);
                }, delay);
            }
        );

        return new Subscription(() => {
            subscription.unsubscribe();
            if(currentJob) {
                currentJob.cancel();
            }
        });
    });
}
