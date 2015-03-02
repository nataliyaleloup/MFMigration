/// <reference path="../../reference.ts" />

module Trasys.Hipermobile {

    export class MainController implements Trasys.Common.IContainerController {
        actionMenuClosedDefer: JQueryDeferred<any>;
        
        initialize(){
        
        }
        
         /**
         * Hide the panel with the application menu.
         */
        private closeMenuPanel(): void {
            $("#Main-left-panel").panel().panel("close");
        }
                
        
        
        
         private initializeSwitchLanguageMenu(): void {
            Trasys.Common.Util.bind($("#Main-menu-language"), "click", () => {
                Trasys.Common.Router.getInstance().getCurrentContainerController<MainController>().closeMenuPanel();
                var router = Common.Router.getInstance();
                var localeToSet: string;
                if (router.getCurrentLocale() === 'en') {
                    localeToSet = 'fr';
                } else {
                    localeToSet = 'en';
                }
                router.setCurrentLocale(localeToSet);
            });
        }

        /**
         * Initialize the text translations.
         */
        initializeTexts(): void {
        }

		contentUpdated(): void {
             this.initializeBackButton();
		}
        
        
           /**
         * Initialize the back button.
         */
        private initializeBackButton(): void {
            var handler: any = Trasys.Common.Router.getInstance().getCurrentController();
            if (handler.isBackApplicable && handler.isBackApplicable()) {
                this.enableBack();
                Trasys.Common.Util.bind($("#Main-back"), "click", () => { 
                    var handler: any = Trasys.Common.Router.getInstance().getCurrentController();
                    handler.backSelected();
                });
            } else {
                this.disableBack();
            }
        }
        
         /**
         * Enable the back button.
         */
        enableBack(): void {
            var backButton = $("#Main-back");
            backButton.removeClass("ui-state-disabled");
        }

        /**
         * Disable the back button.
         */
        disableBack(): void {
            var backButton = $("#Main-back");
            backButton.addClass("ui-state-disabled");
        }
        
		

    }    
}
