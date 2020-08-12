import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { PendingJob } from '../scheduler';
import { Subscription } from '../subscription';
import { asyncScheduler } from '../schedulers';


export function delay<A>(delay: number): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        const jobs = new Set<PendingJob>();
        let completed = false;

        const cancelJobs = () => {
            jobs.forEach((job) => {
                job.cancel();
            });
        };

        const subscription = source.subscribe(
            (value) => {
                const job = asyncScheduler.schedule(() => {
                    subscriber.next(value);
                    jobs.delete(job);
                    if(completed && jobs.size === 0) {
                        subscriber.complete();
                    }
                }, delay);
                jobs.add(job);
            },
            (error) => {
                cancelJobs();
                subscriber.error(error)
            },
            () => {
                completed = true;
                if(jobs.size === 0) {
                    subscriber.complete();
                }
            }
        );

        return new Subscription(() => {
            cancelJobs();
            subscription.unsubscribe();
        });
    });
}
