import { noop } from './utils';


export class PendingJob {
    constructor(private onCancel: () => void = noop) {}

    cancel(): void {
        this.onCancel();
    }
}

export interface Scheduler {
    schedule(job: (scheduler: this) => void, delay?: number): PendingJob;
}
