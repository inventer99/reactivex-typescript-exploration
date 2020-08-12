import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { PendingJob } from '../scheduler';
import { Subscription } from '../subscription';
import { asyncScheduler } from '../schedulers';


export function delay<A>(delay: number): OperatorFn<A, A> {
    return (source) => new Observable<A>((subscriber) => {
        const jobs: Array<PendingJob> = [];
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
                    jobs.splice(jobs.indexOf(job), 1);
                    if(completed) {
                        subscriber.complete();
                    }
                }, delay);
                jobs.push(job);
            },
            (error) => {
                cancelJobs();
                subscriber.error(error)
            },
            () => {
                completed = true;
                if(jobs.length === 0) {
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
