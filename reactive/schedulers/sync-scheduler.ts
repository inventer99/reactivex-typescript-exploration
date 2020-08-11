import { PendingJob, Scheduler } from '../scheduler';


export class SyncScheduler implements Scheduler {
    schedule(job: (scheduler: this) => void, delay?: number): PendingJob {
        job(this);
        return new PendingJob();
    }
}

export const syncScheduler = new SyncScheduler();
