import { Observable } from '../observable';


export function error<T>(): Observable<T> {
    return new Observable<T>((subscriber) => {
        subscriber.error(new Error());
    });
}
