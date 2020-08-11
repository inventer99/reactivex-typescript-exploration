import { Observable } from '../observable';


export function empty<T>(): Observable<T> {
    return new Observable<T>((subscriber) => {
        subscriber.complete();
    });
}
