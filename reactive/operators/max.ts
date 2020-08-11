import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function max(): OperatorFn<number, number> {
    return (source) => new Observable<number>((subscriber) => {
        let max = null;
        return source.subscribe(
            (value) => {
                if(!max || max < value) {
                    max = value;
                }
            },
            (error) => subscriber.error(error),
            () => {
                subscriber.next(max);
                subscriber.complete();
            }
        );
    });
}
