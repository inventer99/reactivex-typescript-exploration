import { Observable } from '../observable';


export function never<T>(): Observable<T> {
    return new Observable<T>(() => {});
}
