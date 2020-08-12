import { Observable } from '../observable';
import { OperatorFn } from '../operator';
import { concat } from '../sources';


export function concatWith<A>(...observables: Array<Observable<A>>): OperatorFn<A, A> {
    return (source) => concat<A>(source, ...observables);
}
