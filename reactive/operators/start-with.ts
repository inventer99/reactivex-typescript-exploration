import { Observable } from '../observable';
import { OperatorFn } from '../operator';
import { concat } from '../sources';


export function startWith<A>(...observables: Array<Observable<A>>): OperatorFn<A, A> {
    return (source) => concat<A>(...observables, source);
}
