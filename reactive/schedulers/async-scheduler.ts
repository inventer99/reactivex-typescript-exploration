import { PendingJob, Scheduler } from '../scheduler';


export class AsyncScheduler implements Scheduler {
    schedule(job: (scheduler: this) => void, delay?: number): PendingJob {
        const id = setTimeout(() => {
            job(this);
        }, delay);

        return new PendingJob(() => {
            clearTimeout(id);
        });
    }
}

export const asyncScheduler = new AsyncScheduler();
