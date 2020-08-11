import { Observable } from '../observable';
import { noop } from '../utils';


export function never<T>(): Observable<T> {
    return new Observable<T>(noop);
}
