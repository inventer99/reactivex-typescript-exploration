import { OperatorFn } from '../operator';
import { Observable } from '../observable';


export function min(): OperatorFn<number, number> {
    return (source) => new Observable<number>((subscriber) => {
        let min = null;
        return source.subscribe(
            (value) => {
                if(!min || min > value) {
                    min = value;
                }
            },
            (error) => subscriber.error(error),
            () => {
                subscriber.next(min);
                subscriber.complete();
            }
        );
    });
}
