import { isObject, noop } from './utils';
import { Subscriber } from './subscriber';
import { Observer, OnCompleteFn, OnErrorFn, OnNextFn } from './observer';
import { Subscription } from './subscription';
import { OperatorFn } from './operator';

// type Op<A = any, B = any> = OperatorFn<A, B>;
// type Ops = Array<Op>;
//
//
// type OperatorFnAType<T extends OperatorFn<any, any>> = T extends OperatorFn<infer A, any> ? A : any;
// type OperatorFnBType<T extends OperatorFn<any, any>> = T extends OperatorFn<any, infer B> ? B : any;
//
// type PipeOps1<T extends Ops, A, Z> = [OperatorFn<A, Z>];
// type PipeOps2<T extends Ops, A, B, Z> = [OperatorFn<A, B>, OperatorFn<B, Z>];
// type PipeOpsN<T extends Ops, A, Z> = [OperatorFn<A, any>, ...Ops, OperatorFn<any, Z>];
//
// type OpsTail<T extends Ops> = T extends [Op, ...infer R] ? R : Ops;

// type OperatorFnPre<T extends Ops> = T extends [...Ops, OperatorFn<any, infer A>, OperatorFn<infer A, any>, ...Ops] ? OperatorFn<any, A> : OperatorFn<any, any>;
// type OperatorFnPost<T extends Ops> = T extends [...Ops, OperatorFn<any, infer A>, OperatorFn<infer A, any>, ...Ops] ? OperatorFn<A, any> : OperatorFn<any, any>;

// type PipeOps<T extends Ops, A, Z> =
//     | PipeOps1<T, A, Z>
//     | T extends PipeOps2<T, A, infer B, Z> ? PipeOps2<T, A, B, Z> : PipeOps2<T, A, any, Z>
//     | PipeOpsN<T, A, Z>
//     ;

// type OpsLast<T extends Ops> = T extends [...Ops, infer R] ? R : Op;
//
// type PipeReturnType<T extends Ops> = T extends [...Ops, OperatorFn<any, infer R>] ? R : unknown;
//
// type test = OpsTail<[
//     OperatorFn<number, string>,
//     OperatorFn<string, number[]>,
//     OperatorFn<number[], string[]>
// ]>;

export type CreatorFn<T> = (subscriber: Subscriber<T>) => Subscription | void;

export class Observable<T> {
    constructor(protected creator: CreatorFn<T>) {}

    pipe<B>(
        operator: OperatorFn<T, B>
    ): Observable<B>;
    pipe<B, C>(
        operatorA: OperatorFn<T, B>,
        operatorB: OperatorFn<B, C>
    ): Observable<C>;
    pipe<B, C, D>(
        operatorA: OperatorFn<T, B>,
        operatorB: OperatorFn<B, C>,
        operatorC: OperatorFn<C, D>
    ): Observable<D>;
    pipe<B, C, D, E>(
        operatorA: OperatorFn<T, B>,
        operatorB: OperatorFn<B, C>,
        operatorC: OperatorFn<C, D>,
        operatorD: OperatorFn<D, E>
    ): Observable<E>;
    pipe<B, C, D, E, F>(
        operatorA: OperatorFn<T, B>,
        operatorB: OperatorFn<B, C>,
        operatorC: OperatorFn<C, D>,
        operatorD: OperatorFn<D, E>,
        operatorE: OperatorFn<E, F>
    ): Observable<F>;
    pipe<B, C, D, E, F, G>(
        operatorA: OperatorFn<T, B>,
        operatorB: OperatorFn<B, C>,
        operatorC: OperatorFn<C, D>,
        operatorD: OperatorFn<D, E>,
        operatorE: OperatorFn<E, F>,
        ...operators: Array<OperatorFn<any, any>>
    ): Observable<G>;
    pipe<R>(...operators: Array<OperatorFn<any, any>>): Observable<R> {
        return operators.reduce((source, operator) => operator(source), this);
    }

    // pipe<O extends Ops>(
    //     // ...operators: PipeOps<O, T, PipeReturnType<O>>
    //     ...operators: O
    // ): Observable<PipeReturnType<O>> {
    //     return operators.pop()(this);
    //     // return operators.reduce((source, operator) => operator(source), this);
    // }

    subscribe(next: OnNextFn<T>, error?: OnErrorFn, complete?: OnCompleteFn): Subscription;
    subscribe(observer: Observer<T>): Subscription;
    subscribe(nextOrObserver: OnNextFn<T> | Observer<T>, error?: OnErrorFn, complete?: OnCompleteFn): Subscription {
        const observer: Observer<T> = isObject(nextOrObserver)
            ? nextOrObserver as Observer<T>
            : { next: nextOrObserver, error, complete };

        const subscriber = new Subscriber<T>(observer);

        return (this.creator(subscriber) as any) ?? new Subscription();
    }
}
