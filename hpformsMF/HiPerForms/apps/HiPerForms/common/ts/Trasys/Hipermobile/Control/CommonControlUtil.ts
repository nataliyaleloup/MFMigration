/// <reference path="../../../reference.ts" />

module Trasys.Hipermobile.Control {

    /**
     * Class containing utilities for easy manipulation of the common controls.
     * 
     * The methods in this utility class can be safely called. If no common controls are present they will not fail.
     */
    export class CommonControlUtil {
        private static genericPopupOpen: boolean;
        
      
        
        /**
         * Enable the back button.
         */
        public static enableBack(): void {
            var provider: any = Trasys.Common.Router.getInstance().getCurrentContainerController();
            if (provider.enableBack) {
                provider.enableBack();
            }
        }
        
        /**
         * Disable the back button.
         */
        public static disableBack(): void {
            var provider: any = Trasys.Common.Router.getInstance().getCurrentContainerController();
            if (provider.disableBack) {
                provider.disableBack();
            }
        }
        
         /**
         * Shows a generic popup. When no buttons and no header is passed, a simple message is shown.
         * Multiple buttons can be passed.
         * 
         * @param popupHeader the header for the popup message, this is optional.
         * @param buttons a list of buttonText, callbackfunction pairs.
         */
       
        public static showGenericPopup(popupHeader: string, popupContent:JQuery, buttons: {buttonText: string; callback: () => void}[]): void {
            // IF a header was provided THEN buttons are mandatory
            if(popupHeader && popupHeader !== "") {
                if(!buttons || buttons.length == 0) {
                    throw Error("A popup must have some buttons if it has a header.");
                }
            }
            
            var popupContainer: JQuery = $("#Main-generic-popup");
            popupContainer.empty();
            
            if(popupHeader && popupHeader != "") {
                // advanced dialog, with header and buttons.
                var headerString: string = "";
                headerString += "<h3>" + popupHeader + "</h3>";
                popupContainer.append($(headerString));
                popupContainer.append(popupContent);
             
                for (var i=0; i<buttons.length; i++) {
                    var button: JQuery = $("<a href='#' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b'>" + buttons[i].buttonText + "</a>");
                    var selectItem = (button: {buttonText: string; callback: () => void}) => {
                        return (event: JQueryEventObject) => {
                            button.callback();
                        }
                    };
                    Trasys.Common.Util.bind(button, "click", selectItem(buttons[i]));
                    popupContainer.append(button);
                }                
            } else { 
                // simpleDialog
                popupContainer.append(popupContent);
                var button: JQuery = $("<a href='#' data-rel='back' class='ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right'>Close</a>");
                popupContainer.append(button);  
            }
            
            popupContainer.on("popupafteropen", function() {
                CommonControlUtil.genericPopupOpen = true;
            } );
            popupContainer.on("popupafterclose", function() {
                CommonControlUtil.genericPopupOpen = false;
            } );
            
            popupContainer.enhanceWithin();
            popupContainer.popup().popup("open");            
        }
        
        /**
         * repositions the generic popup, to be called after a content change.
         */
        public static repositionGenericPopup(): void {
            $("#Main-generic-popup").popup("reposition", {positionTo: 'window'});
        }
        
        /**
         * Closes the generic popup.
         */
        public static closeGenericPopup(): void {
            $("#Main-generic-popup").popup().popup("close");
        }
        
        /**
         * Checks whether the generic popup is in the DOM.
         * 
         * @return true if the generic popup is in the dom.
         */
        public static isGenericPopupAvailable(): boolean {
            var popupAvailable: boolean = false;
            if($("#Main-generic-popup").length) {
                popupAvailable = true;
            }
            return popupAvailable;
        }
        
        /**
         * return the header of the generic popup.
         * 
         * @return empty string if generic popup is closed.
         */
        public static getGenericPopupHeader(): string {
            var header = "";
            if(CommonControlUtil.genericPopupOpen) {
                header =  $("#Main-generic-popup h3").text();
            }
            return header;
        }

      
    }
    
}
