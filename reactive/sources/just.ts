import { Observable } from '../observable';
import { Scheduler } from '../scheduler';
import { syncScheduler } from '../schedulers';
import { Subscription } from '../subscription';


export function just<T>(value: T, scheduler: Scheduler = syncScheduler): Observable<T> {
    return new Observable<T>((subscriber) => {
        const job = scheduler.schedule(() => {
            subscriber.next(value);
            subscriber.complete();
        });

        return new Subscription(() => {
            job.cancel();
        });
    });
}
