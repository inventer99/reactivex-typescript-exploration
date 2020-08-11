import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function contains<A>(containsValue: A): OperatorFn<A, boolean> {
    return (source) => new Observable<boolean>((subscriber) => {
        return source.subscribe(
            (value) => {
                if(value === containsValue) {
                    subscriber.next(true);
                    subscriber.complete();
                }
            },
            (error) => subscriber.error(error),
            () => {
                subscriber.next(false);
                subscriber.complete()
            }
        );
    });
}
