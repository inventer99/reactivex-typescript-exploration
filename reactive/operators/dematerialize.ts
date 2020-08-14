import { OperatorFn } from '../operator';
import { Notification } from '../utils/notification';
import { Observable } from '../observable';


export function dematerialize<A>(): OperatorFn<Notification<A>, A> {
    return (source) => new Observable<A>((subscriber) => {
        return source.subscribe(
            ({ type, value, error }) => {
                switch(type) {
                    case 'next':
                        subscriber.next(value);
                        break;
                    case 'error':
                        subscriber.error(error);
                        break;
                    case 'complete':
                        subscriber.complete();
                        break;
                }
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
        );
    });
}
