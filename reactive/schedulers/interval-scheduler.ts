import { PendingJob, Scheduler } from '../scheduler';


export class IntervalScheduler implements Scheduler {
    schedule(job: (scheduler: this) => void, delay?: number): PendingJob {
        const id = setInterval(() => {
            job(this);
        }, delay);

        return new PendingJob(() => {
            clearInterval(id);
        });
    }
}

export const intervalScheduler = new IntervalScheduler();
