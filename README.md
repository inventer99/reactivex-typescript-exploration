# ReactiveX TypeScript Exploration

**DO NOT USE IN A PRODUCTION ENVIRONMENT. THIS CODE IS FOR MY OWN
EDUCATION.**

My own TypeScript implementation of the observable pattern following ReactiveX.

http://reactivex.io/

# Example

```typescript
import { range } from './reactive/sources';
import { filter, map } from './reactive/operators';

// Caluclate the square of all odd numbers from 1-10 inclusively

range(1, 11).pipe(
    filter(x => (x & 1) === 1),
    map(x => x * x),
).subscribe(console.log);

/* Outputs:
1
9
25
49
81
*/
```

# Running

```bash
yarn ts-node main.ts
```

# Features

Currently implemented features

## Core

- Observable
- Observer
- Subscriber
- Subscription
- Sink (SubSink)

## Subjects

- Subject / Publish Subject
- Behavior Subject
- Replay Subject
- Async Subject

## Schedulers

- Sync Scheduler (`fn();`)
- Async Scheduler (`setTimeout(fn, delay);`)
- Interval Scheduler (`setInterval(fn, delay);`)
- Asap Scheduler (`setTimeout(fn, 0);`)

## Sources

- Defer
- Empty
- Never
- Error (Throw)
- From
- Interval
- Just
- Range
- Repeat
- Start
- Timer

#### Combining
- Combine Latest
- Merge

#### Conditional
- Amb

#### Aggregate
- Concat

## Operators

#### Transforming
- Buffer
- Flat Map
- Group By
- Map
- Scan
- Window

#### Filtering
- Debounce
- Distinct
- Element At
- Filter
- First
- Ignore Elements
- Last
- Sample
- Skip
- Skip Last
- Take
- Take Last

#### Combining
- And (TODO)
- Then (TODO)
- When (TODO)
- With Latest From (TODO)
- Join (TODO)
- Merge
- Start With
- Switch (TODO)
- Zip (TODO)

#### Error Handling
- Catch Error (Catch)
- Retry

#### Observable Utility
- Delay
- Tap
- Materialize
- Dematerialize
- Observe On (TODO)
- Serialize (TODO)
- Subscribe On
- Time Interval
- Timeout
- Timestamp
- Using

#### Conditional and Boolean
- All
- Amb With (Amb) 
- Contains
- Default If Empty
- Sequence Equal (TODO)
- Skip Until
- Skip While
- Take Until
- Take While

#### Mathematical and Aggregate
- Average
- Concat With (Concat)
- Count
- Max
- Min
- Reduce
- Sum

#### Backpressure
TODO

#### Connectable Observable
- Connect (TODO)
- Publish (TODO)
- Ref Count (TODO)
- Replay (TODO)

#### Convert
- To Array
- To Set
