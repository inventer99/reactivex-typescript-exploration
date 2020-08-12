import { Observable } from './reactive';
import { flatMap, groupBy, map, retry, sum } from './reactive/operators';
import { from } from './reactive/sources';


const debugObserver = (name) => ({
    next: (value) => console.log(`[${name}] next:`, value),
    error: (error) => console.log(`[${name}] error:`, error),
    complete: () => console.log(`[${name}] complete`)
});

interface Cart {
    items: Array<{
        name: string;
        price: number; // in cents
        quantity: number;
    }>;
}

const myCart = {
    items: [
        {
            name: 'Computer',
            price: 40000, // $400.00
            quantity: 1
        },
        {
            name: 'Mouse',
            price: 1500, // $15.00
            quantity: 1
        },
        {
            name: 'Keyboard',
            price: 2000, // $20.00
            quantity: 1
        },
        {
            name: 'Monitor',
            price: 20000, // $200.00
            quantity: 2
        }
    ]
};

// Simulate a db lookup
function getCart(): Observable<Cart> {
    let errored = false;
    return new Observable((subscriber) => {
        setTimeout(() => {
            if(!errored) {
                subscriber.error(new Error());
                errored = true;
            } else {
                subscriber.next(myCart);
                subscriber.complete();
            }
        }, 500);
    });
}


const cart$ = getCart().pipe(
    retry()
);

const items$ = cart$.pipe(
    map((cart) => cart.items),
    flatMap((items) => from(items))
);

const total$ = items$.pipe(
    map((item) => item.price * item.quantity),
    sum()
);

const byQuantity$ = items$.pipe(
    groupBy((item) => item.quantity),
    flatMap((group) => {
        const rng = Math.random();
        return group.pipe(
            map((item) => `[${rng}] ${item.name}`)
        );
    })
);

total$.subscribe(debugObserver('total$'));
byQuantity$.subscribe(debugObserver('byQuantity$'));
