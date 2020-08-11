import { Observable } from './reactive';
import { flatMap, map, sum } from './reactive/operators';
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
    return new Observable((subscriber) => {
        setTimeout(() => {
            subscriber.next(myCart);
            subscriber.complete();
        }, 500);
    });
}


const cart$ = getCart();

const total$ = cart$.pipe(
    map((cart) => cart.items),
    flatMap((items) => from(items)),
    map((item) => item.price * item.quantity),
    sum()
);

total$.subscribe(debugObserver('total$'));
