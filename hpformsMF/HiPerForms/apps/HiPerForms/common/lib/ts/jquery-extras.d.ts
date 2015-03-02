/// <reference path="jquery.d.ts"/>


// FULL CALENDAR
interface JQueryStatic {
    fullCalendar: any;
}

interface JQuery {
    fullCalendar: any;
}

// SIGNATURE PAD
interface SignaturePadAPI {
    getSignatureImage: any;
    clearCanvas: any;
    getSignature(): any[];
}

interface JQuery {
    signaturePad: any;
} 

interface JQuery {
    scrollTo: any;
} 

interface JQueryStatic {
    i18n: JQueryI18N.StaticInstance;
}

declare module JQueryI18N {

    export interface StaticInstance {
        prop(...key: string[]): string;
        properties(properties?: Properties): void;
    }
    
    export interface Properties {
        name?: string;
        language?: string;
        path?: string;
        mode?: string;
        cache?: boolean;
        encoding?: string;
        callback?: () => any;        
    }

}
