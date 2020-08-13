import { Observable } from '../observable';
import { OperatorFn } from '../operator';
import { combineLatest } from '../sources';

/** @deprecated @todo finish implementation */
export function withLatestFrom<A>(...observables: Array<Observable<A>>): OperatorFn<A, Array<A>> {
    return (source) => combineLatest(source, ...observables);
    // return (source) => new Observable<Array<A>>((subscriber) => {
    //     const latest = new Array<A>(observables.length + 1);
    //     const emitted = new Set<number>();
    //     const completed = new Set<number>();
    //
    //     const subscriptions = observables.map((observable, index) => observable.subscribe(
    //         (value) => {
    //             emitted.add(index);
    //             latest[index] = value;
    //             if(emitted.size === observables.length) {
    //                 subscriber.next([...latest]);
    //             }
    //         },
    //         (error) => subscriber.error(error)
    //     ));
    //
    //     return new Subscription(() => {
    //         subscriptions.forEach((subscription) => {
    //             subscription.unsubscribe();
    //         });
    //     });
    // });
}

