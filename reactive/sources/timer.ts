import { Observable } from '../observable';
import { Subscription } from '../subscription';
import { Scheduler } from '../scheduler';
import { asyncScheduler } from '../schedulers';


export function timer(delay: number = 0, scheduler: Scheduler = asyncScheduler): Observable<number> {
    return new Observable<number>((subscriber) => {
        const job = scheduler.schedule(() => {
            subscriber.next(0);
            subscriber.complete();
        }, delay);

        return new Subscription(() => {
            job.cancel();
        });
    });
}
