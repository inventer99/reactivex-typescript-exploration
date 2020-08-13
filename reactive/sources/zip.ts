import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function zip<T>(...observables: Array<Observable<T>>): Observable<Array<T>> {
    return new Observable<Array<T>>((subscriber) => {
        const queues = new Array<Array<T>>();

        observables.forEach((obserable, index) => {
            queues[index] = [];
        });

        const subscriptions = observables.map((observable, index) => observable.subscribe(
            (value) => {
                queues[index].push(value);

                const canNext = queues.reduce((acc, queue) => acc && queue.length > 0, true);
                if(canNext) {
                    const zipped = queues.reduce((acc, queue) => {
                        acc.push(queue.shift());
                        return acc;
                    }, []);
                    subscriber.next(zipped);
                }
            },
            (error) => subscriber.error(error),
            //WHY
            // () => subscriber.complete()
        ));

        return new Subscription(() => {
            subscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
        });
    });
}
