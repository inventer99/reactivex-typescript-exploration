import { Observable } from '../observable';


export function start<T>(fn: () => T): Observable<T> {
    return new Observable<T>((subscriber) => {
        try {
            const value = fn();
            subscriber.next(value);
            subscriber.complete();
        } catch(error) {
            subscriber.error(error);
        }
    });
}
