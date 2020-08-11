import { PendingJob, Scheduler } from '../scheduler';


export class AsapScheduler implements Scheduler {
    schedule(job: (scheduler: this) => void, delay?: number): PendingJob {
        const id = setTimeout(() => {
            job(this);
        }, 0);

        return new PendingJob(() => {
            clearTimeout(id);
        });
    }
}

export const asapScheduler = new AsapScheduler();
