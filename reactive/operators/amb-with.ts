import { OperatorFn } from '../operator';
import { Observable } from '../observable';
import { amb } from '../sources';


export function ambWith<A>(...observables: Array<Observable<A>>): OperatorFn<A, A> {
    return (source) => amb<A>(source, ...observables);
}
