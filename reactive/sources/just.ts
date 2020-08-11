import { Observable } from '../observable';


export function just<T>(value: T): Observable<T> {
    return new Observable<T>((subscriber) => {
       subscriber.next(value);
       subscriber.complete();
    });
}
