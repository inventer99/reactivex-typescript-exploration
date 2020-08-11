# ReactiveX TypeScript Exploration

**DO NOT USE IN A PRODUCTION ENVIRONMENT. THIS CODE IS FOR MY OWN
EDUCATION.**

My own TypeScript implementation of the observable pattern following ReactiveX.

http://reactivex.io/

# Example

```typescript
import { range } from './reactive/sources';
import { filter, map } from './reactive/operators';

// Caluclate all odd squares from 1-10 inclusively

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

## Subjects

- Subject / Publish Subject
- Behavior Subject
- Replay Subject
- Async Subject

## Sources

- Defer
- Empty
- Never
- Error
- From
- Interval
- Just
- Range
- Repeat
- Start
- Timer

## Operators

#### Transforming
- Buffer
- Flat Map
- Map
- Scan
- Window

#### Filtering
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
TODO

#### Error Handling
- Catch Error
- Retry

#### Observable Utility
- Tap

#### Conditional and Boolean
- All
- Contains
- Default If Empty
- Skip Until
- Skip While
- Take Until
- Take While

#### Mathematical and Aggregate
- Average
- Count
- Max
- Min
- Reduce
- Sum

#### Backpressure
TODO

#### Connectable Observable
TODO

#### Convert
TODO
