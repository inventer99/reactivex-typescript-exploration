import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { Notification } from '../utils/notification';


export function materialize<A>(): OperatorFn<A, Notification<A>> {
    return (source) => new Observable<Notification<A>>((subscriber) => {
        return source.subscribe(
            (value) => subscriber.next({ type: 'next', value }),
            (error) => {
                subscriber.next({ type: 'error', error });
                subscriber.error(error);
            },
            () => {
                subscriber.next({ type: 'complete' });
                subscriber.complete();
            },
        );
    });
}
