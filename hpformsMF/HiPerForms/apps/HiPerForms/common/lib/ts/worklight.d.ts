/// <reference path="jquery.d.ts"/>

declare var WL: WL.WLStatic;

declare module WL {

    interface WLStatic {
        Logger: Logger;
        Client: Client;
        EncryptedCache: EncryptedCache;
        JSONStore: JSONStore;
        BusyIndicator: any;
        SimpleDialog: SimpleDialog;
        Events: Events;
    }
    
    interface Events {
        WORKLIGHT_IS_CONNECTED: string;
        WORKLIGHT_IS_DISCONNECTED: string;
    }
    
    interface JSONStoreInstanceBaseOptions {
        push?: boolean;
    }
    
    interface JSONStoreInstanceOptions extends JSONStoreInstanceBaseOptions {
        additionalSearchFields?: any; 
    }

    interface JSONStoreInstanceFindOptions {
        exact?: boolean;
        limit?: number;
        offset?: number;
    }

    interface JSONStoreInstanceFindAllOptions {
        limit?: number;
        offset?: number;
    }

//    interface NoResultPromise {
//        then(callback: () => any);
//        fail(callback: (failureObject: any) => any);
//    }
    
    interface JSONStoreInstance {
        add(data: any, options?: JSONStoreInstanceOptions): JQueryPromise<number>;
        count(query?: any, options?: JSONStoreInstanceOptions): JQueryPromise<number>;
        enhance(name: string, fn: () => any): JQueryPromise<any>;
        find(query: any, options?: JSONStoreInstanceFindOptions): JQueryPromise<any[]>;
        findAll(options?: JSONStoreInstanceFindAllOptions): JQueryPromise<any[]>;
        findById(id: number): JQueryPromise<any[]>;
        findById(id: number[]): JQueryPromise<any[]>;
        getPushRequired(): JQueryPromise<number>;
        isPushRequired(doc: any): JQueryPromise<boolean>;
        load(): JQueryPromise<number>;
        push(): JQueryPromise<any[]>;
        pushRequiredCount(): JQueryPromise<number>;
        remove(doc: any, options?: JSONStoreInstanceBaseOptions): JQueryPromise<number>;
        removeCollection(): JQueryPromise<any>;
        replace(doc: any, options?: JSONStoreInstanceBaseOptions): JQueryPromise<number>;
        toString(limit?: number, offset?: number): JQueryPromise<number>;
    }
    
    interface JSONStoreAdapterLoadInformation {
        procedure: string;
        params: any[];
        key: string;
    }    
    
    interface JSONStoreAdapter {
        name: string;
        add?: string;
        remove?: string;
        load?: JSONStoreAdapterLoadInformation;
        accept?: (adapterResponse: any) => boolean;
        timeout?: number;
    }    
    
    interface JSONStoreCollection {
        searchFields: any;
        additionalSearchFields?: any;
        adapter?: JSONStoreAdapter;
    }
    
    interface JSONStoreInitOptions {
        username?: string;
        password?: string;
        clear?: boolean;
        localKeyGen?: boolean; 
    }

    interface JSONStoreError {
        msg:string;
        col:string;
    }
    
    interface JSONStore {
        changePassword(oldPassword: string, newPassword: string, username?: string): JQueryPromise<any>;
        closeAll(): JQueryPromise<any>;
        destroy(): JQueryPromise<any>;
        documentify(id: number, data: any): any;
        get(collectionName: string): JSONStoreInstance;
        getErrorMessage(errorCode: number): string;
        init(collections: {[name: string]: JSONStoreCollection}, options?: JSONStoreInitOptions): JQueryPromise<any>;
    }
    
    interface EncryptedCache {
        ERROR_NO_EOC: number;
        ERROR_CREDENTIALS_MISMATCH: number;
        ERROR_EOC_TO_BE_DELETED: number;
        ERROR_EOC_DELETED: number;
        ERROR_UNSAFE_CREDENTIALS: number;
        ERROR_EOC_CLOSED: number;
        ERROR_NO_SUCH_KEY: number;
        ERROR_LOCAL_STORAGE_NOT_SUPPORTED: number;
        ERROR_KEY_CREATION_IN_PROGRESS: number;
        close(onCompleteHandler: (status: number) => any, onFailureHandler: (status: number) => any):void;
        destroy(successCallback: (status: number) => any, failureCallback: (status: number) => any):number; 
        open(credentials: string, create_if_none: boolean, onCompleteHandler: (status: number) => any, onErrorHandler: (status: number) => any):void;
        read(key: string, successCallback: (value: string) => any, onFailureHandler: (status: number) => any):string;
        remove(Key: string, successCallback: (status: number) => any, failureCallback: (status: number) => any):void;
        write(key: string, value: string, successCallback: (status: number) => any, failureCallback: (status: number) => any):void;
    }
    
    interface Client {
        invokeProcedure<T extends InvocationResult>(invocationData: InvocationData, options?: InvocationOptions<T>): void;
        logout(realm: string, options?: Options): void;
        createChallengeHandler<T extends AbstractChallengeHandler>(realm: string): T;
        connect(options?: ConnectOptions);
    }
    
    interface ConnectOptions {
        onSuccess?: () => any;
        onFailure?: () => any; 
        timeout: number
    }
    
    interface InvocationData {
        adapter: string;
        procedure: string;
        parameters?: any[];
        compressResponse?: boolean;
    }

    interface InvocationOptions<T extends InvocationResult> extends Options {
        timeout?: number;
        onSuccess?: (response: InvocationResponse<T>) => any; 
        onFailure?: (response: InvocationFailureResponse<T>) => any;
    }

    interface InvocationResponse<T extends InvocationResult> extends Response {
        invocationResult: T;
        parameters?: any[];
    }

    interface InvocationFailureResponse<T extends InvocationResult> extends FailureResponse {
        invocationResult?: T;
    }
    
    interface InvocationResult {
        isSuccessful: boolean;
        errors?: string[];
    }
    
    interface SqlInvocationResult<T> extends InvocationResult {
        resultSet?: any[];
    }
    
    interface Logger extends LogInstance {
        create(options?: LoggerOptions): LogInstance;
        ctx(options?: LoggerOptions): Logger;
        log(...message: any[]): void;
        off(): Logger;
        on(options?: LoggerOptions): Logger;
        status(): LoggerOptions;
    }
    
    interface LogInstance {
        debug(...message: any[]): void;
        error(...message: any[]): void;
        info(...message: any[]): void;
        warn(...message: any[]): void;
    }
    
    interface LoggerOptions {
        enabled?: boolean;
        stringify?: boolean;
        android?:boolean;
        callback?: (message: any, priority:string, package:string) => any;
        pkg?: string;
        tag?: LoggerTagOptions;
        whitelist?: string[];
        blacklist?: string[];
        level?: LoggerLevel;
        
    }
    
    interface LoggerLevel {
        levels: string[];
        name: string;
        priority: number;
    }
    
    interface LoggerTagOptions {
        level?: string;
        pkg?: string;
    }
    
    interface Options {
        onSuccess?: (response: Response) => any;
        onFailure?: (response: FailureResponse) => any;
        invocationContext?: any;
    }
    
    interface Response {
        invocationContext?: any;
        status: number;
    }
    
    interface FailureResponse extends Response {
        errorCode: string;
        errorMsg: string;
    }
    
    interface AbstractChallengeHandler {
        handleChallenge(challenge: any);
        submitAdapterAuthentication<T extends InvocationResult>(invocationData: WL.InvocationData, options?: InvocationOptions<T>);
        submitLoginForm(reqURL: string, submitLoginFormCallback: () => any, options?: any);
        submitSuccess();
        submitFailure();
        isCustomResponse(transport: any);       
    }
    
    interface SimpleDialog {
        show(title: string, text: string, buttons: any[], options?:any);
    }
}
