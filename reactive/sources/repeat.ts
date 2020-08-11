import { Observable } from '../observable';


export function repeat<T>(value: T): Observable<T> {
    return new Observable<T>((subscriber) => {
        while(true) {
            subscriber.next(value);
        }
    });
}
