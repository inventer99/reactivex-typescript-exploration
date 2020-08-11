import { Observable } from '../observable';
import { Subscription } from '../subscription';
import { Scheduler } from '../scheduler';
import { intervalScheduler } from '../schedulers';


export function interval(delay: number = 0, scheduler: Scheduler = intervalScheduler): Observable<number> {
    return new Observable<number>((subscriber) => {
        let index = 0;

        const job = scheduler.schedule(() => {
            subscriber.next(index++);
        }, delay);

        return new Subscription(() => {
            job.cancel();
        });
    });
}
