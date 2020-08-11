import { Observable } from './observable';


export interface OperatorFn<A, B> {
    (source: Observable<A>): Observable<B>;
}
