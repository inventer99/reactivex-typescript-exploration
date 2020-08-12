import { Observable } from '../observable';
import { Subscription } from '../subscription';


export function combineLatest<T>(...observables: Array<Observable<T>>): Observable<Array<T>> {
   return new Observable<Array<T>>((subscriber) => {
       const latest = new Array<T>(observables.length);
       const emitted = new Set<number>();
       const completed = new Set<number>();

       const subscriptions = observables.map((observable, index) => observable.subscribe(
           (value) => {
               emitted.add(index);
               latest[index] = value;
               if(emitted.size === observables.length) {
                   subscriber.next([...latest]);
               }
           },
           (error) => subscriber.error(error),
           () => {
               completed.add(index);
               if(completed.size === observables.length && !subscriber.isClosed()) {
                   subscriber.complete();
               }
           }
       ));

       return new Subscription(() => {
           subscriptions.forEach((subscription) => {
               subscription.unsubscribe();
           });
       });
   });
}
