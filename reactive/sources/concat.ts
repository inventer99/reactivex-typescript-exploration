import { Observable } from '../observable';
import { concatWith } from '../operators';


export function concat<T>(...observables: Array<Observable<T>>): Observable<T> {
    const [first, ...rest] = observables;
    return concatWith<T>(...rest)(first);
}
