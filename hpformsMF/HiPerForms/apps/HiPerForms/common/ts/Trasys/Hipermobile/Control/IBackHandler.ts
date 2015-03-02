/// <reference path="../../../reference.ts" />

module Trasys.Hipermobile.Control {

    /**
     * Interface defining the behavior expected by a controller that handles the back button.
     */
    export interface IBackHandler {
    
        /**
         * Check to see if the back button should be enabled.
         * 
         * @return The check result.
         */
        isBackApplicable(): boolean;
        
        /**
         * Called when the back button has been clicked.
         */
        backSelected(): void;
        
        
        
    }
    
}
