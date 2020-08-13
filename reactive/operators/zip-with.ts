import { Observable } from '../observable';
import { OperatorFn } from '../operator';
import { zip } from '../sources';


export function zipWith<A>(...observables: Array<Observable<A>>): OperatorFn<A, Array<A>> {
    return (source) => zip<A>(source, ...observables);
}
