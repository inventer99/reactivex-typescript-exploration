import { Observable } from '../observable';
import { Scheduler } from '../scheduler';
import { intervalScheduler } from '../schedulers';
import { Subscription } from '../subscription';


export function repeat<T>(value: T, delay: number = 0, scheduler: Scheduler = intervalScheduler): Observable<T> {
    return new Observable<T>((subscriber) => {
        const job = scheduler.schedule(() => {
            subscriber.next(value);
        }, delay);

        return new Subscription(() => {
            job.cancel();
        });
    });
}
