import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function all<A>(predicate: (value: A) => boolean): OperatorFn<A, boolean> {
    return (source) => new Observable<boolean>((subscriber) => {
        let result = true;
        return source.subscribe(
            (value) => {
                try {
                    result = result && predicate(value);
                } catch(error) {
                    subscriber.error(error);
                }
            },
            (error) => subscriber.error(error),
            () => {
                subscriber.next(result);
                subscriber.complete();
            }
        );
    });
}
