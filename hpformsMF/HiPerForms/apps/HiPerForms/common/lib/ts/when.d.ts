declare var when:When.WhenStatic;

declare module When {

    /**
     * 1. Core
     */
    interface WhenStatic {
        <T>(x:any, onFulfilled?:(value:any) => Promise<T>):Promise<T>;
        <T>(x:any, onFulfilled?:(value:any) => T):Promise<T>;

        try<T>(onFulfilled:(value:any) => Promise<T>, ...args:any[]):Promise<T>;
        try<T>(onFulfilled:(value:any) => T, ...args:any[]):Promise<T>;

        //lift
        //promise
        //reject
        //isPromiseLike

        /**
         * Creates a {promise, resolver} pair, either or both of which may be given out safely to consumers.
         * The resolver has resolve, reject, and progress. The promise has then plus extended promise API.
         */
        defer<T>():Deferred<T>;

        /**
         * Joins multiple promises into a single returned promise.
         *
         * @param promises
         * @returns A promise that will fulfill when *all* the input promises have fulfilled, or will reject when
         * *any one* of the input promises rejects.
         */
        join<T>(...promises:Promise<T>[]):Promise<T[]>;

        /**
         * Joins multiple promises into a single returned promise.
         *
         * @param promises
         * @returns A promise that will fulfill when *all* the input promises have fulfilled, or will reject when
         * *any one* of the input promises rejects.
         */
        join<T>(...promises:any[]):Promise<T[]>;

        /**
         * Returns a resolved promise. The returned promise will be
         *  - fulfilled with promise's value after it is fulfilled
         *  - rejected with promise's reason after it is rejected
         *
         *  @param promise
         *  @return The resolved promise.
         */
        resolve<T>(promise:Promise<T>):Promise<T>;

        /**
         * Returns a resolved promise. The returned promise will be fulfilled with value.
         *
         *  @param value
         *  @return The resolved promise.
         */
        resolve<T>(value?:T):Promise<T>;
    }

    /**
     * 2. Promise
     */
    interface Promise<T> {
        catch<U>(onRejected?:(reason:any) => Promise<U>):Promise<U>;
        catch<U>(onRejected?:(reason:any) => U):Promise<U>;

        done<U>(onFulfilled:(value:T) => void, onRejected?:(reason:any) => void):void;

        ensure(onFulfilledOrRejected:Function):Promise<T>;

        inspect():Snapshot<T>;

        otherwise<U>(onRejected?:(reason:any) => Promise<U>):Promise<U>;
        otherwise<U>(onRejected?:(reason:any) => U):Promise<U>;

        then<U>(onFulfilled:(value:T) => Promise<U>, onRejected?:(reason:any) => Promise<U>):Promise<U>;
        then<U>(onFulfilled:(value:T) => Promise<U>, onRejected?:(reason:any) => U):Promise<U>;
        then<U>(onFulfilled:(value:T) => U, onRejected?:(reason:any) => Promise<U>):Promise<U>;
        then<U>(onFulfilled:(value:T) => U, onRejected?:(reason:any) => U):Promise<U>;
    }

    /**
     * 3. Arrays
     */
    interface WhenStatic {
        /**
         * Return a promise that will resolve only once all the supplied promisesOrValues have resolved. The resolution
         * value of the returned promise will be an array containing the resolution values of each of the
         * promisesOrValues.
         *
         * @param promisesOrValues array of anything, may contain a mix of {@link Promise}s and values
         */
        all<T>(promisesOrValues:any[]):Promise<T>;

//        settle(array)
//        map(array, mapper)
//        filter(array, predicate)
//        reduce(array, reducer)
//        reduceRight(array, reducer)
    }

    /**
     * 4. Array races
     */
    interface WhenStatic {
        //any
        //some
    }

    /**
     * 5. Infinite Promise Sequences
     */
    interface WhenStatic {
        //iterate
        //unfold
    }

    /**
     * 9. Task execution
     */
    interface WhenStatic {
        sequence<T>(tasks:Function[], ...args:any[]):Promise<T>;
        pipeline<T>(tasks:Function[], ...args:any[]):Promise<T>;
        parallel<T>(tasks:Function[], ...args:any[]):Promise<T>;
        poll(task:Function, interval:number, condition:()=>boolean, initialDelay?:number);
        poll(task:Function, interval:()=>Promise<number>, condition:()=>boolean, initialDelay?:number);
    }

    interface Deferred<T> {
        notify(update:any): void;
        promise: Promise<T>;
        reject(reason:any): void;
        resolve(value?:T): void;
        resolve(value?:Promise<T>): void;
    }

    interface Snapshot<T> {
        state: string;
        value?: T;
        reason?: any;
    }
}

declare module "when" {
    export = when;
}
