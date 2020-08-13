import { Observable } from '../observable';
import { OperatorFn } from '../operator';
import { merge } from '../sources';


export function mergeWith<A>(...observables: Array<Observable<A>>): OperatorFn<A, A> {
    return (source) => merge(source, ...observables);
}
