/// <reference path="../../reference.ts" />

function wlCommonInit() {
    /*
     * Application is started in offline mode as defined by a connectOnStartup property in initOptions.js file.
     * In order to begin communicating with Worklight Server you need to either:
     * 
     * 1. Change connectOnStartup property in initOptions.js to true. 
     *    This will make Worklight framework automatically attempt to connect to Worklight Server as a part of application start-up.
     *    Keep in mind - this may increase application start-up time.
     *    
     * 2. Use WL.Client.connect() API once connectivity to a Worklight Server is required. 
     *    This API needs to be called only once, before any other WL.Client methods that communicate with the Worklight Server.
     *    Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
     *    
     *    WL.Client.connect({
     *          onSuccess: onConnectSuccess,
     *          onFailure: onConnectFailure
     *    });
     *     
     */
    Trasys.Common.Configuration.getInstance().configure("config/config.json");
    Trasys.Common.Router.getInstance().configure("config/routes.json");

    // TODO: This fixed user ID should be replaced with the actual one once login is successful.
    Trasys.Common.DataCache.getInstance().set("userID", 1);

    initializeErrorHandling();
    registerResizeListeners();
    registerConnectivityListeners();

    Trasys.Hipermobile.Service.ServiceFactory.getInstance().initialize().done(() => {
        Trasys.Common.Router.getInstance().home();
    });

    Trasys.Common.DataCache.getInstance().set("isOffline", false);
    Trasys.Common.DataCache.getInstance().set("connected", false);

    function registerResizeListeners(): void {
        // Handle screen resize events (including orientation changes).
        var main:JQuery = $("#Main");
        main.height($(this).height() - parseInt(main.css("padding-top")));
        main.width($(this).width());

        $(window).resize(() => {
            if (!Trasys.Common.DataCache.getInstance().get("resizeInProgress")) {
                Trasys.Common.DataCache.getInstance().set("resizeInProgress", true);
                setTimeout(() => {
                    var containerController = Trasys.Common.Router.getInstance().getCurrentContainerController<Trasys.Common.IResizeListener>();
                    if (containerController.handleResize) {
                        containerController.handleResize();
                    }
                    var contentController = Trasys.Common.Router.getInstance().getCurrentController<any>();
                    if (contentController.handleResize) {
                        contentController.handleResize();
                    }
                    Trasys.Common.DataCache.getInstance().set("resizeInProgress", false);
                    main.height($(this).height() - parseInt(main.css("padding-top")));
                    main.width($(this).width());
                }, Trasys.Common.Configuration.getInstance().get<number>("resize.callbackDelay"));
            }
        });
    }

    function registerConnectivityListeners(): void {
        Trasys.Common.DataCache.getInstance().set("connected", false);
        if (WL.Events.WORKLIGHT_IS_CONNECTED) {
            document.addEventListener(WL.Events.WORKLIGHT_IS_CONNECTED, () => {
                alert("Connected");
                Trasys.Common.DataCache.getInstance().set("connected", true);
            }, false);
        }
        if (WL.Events.WORKLIGHT_IS_DISCONNECTED) {
            document.addEventListener(WL.Events.WORKLIGHT_IS_DISCONNECTED, () => {
                alert("Disconnected");
                Trasys.Common.DataCache.getInstance().set("connected", false);
            }, false);
        }
    }

    /**
     * initializes error handling.
     */
    function initializeErrorHandling(): void {
        // any uncaught JS errors will be treated by the error handler service
        window.onerror = function(eventOrMessage: any, source: string, lineNumber: number, columnNumber?: number): boolean {
            return Trasys.Hipermobile.Service.ServiceFactory.getInstance()
                .getErrorHandlerService()
                .handleWindowOnError(eventOrMessage, source, lineNumber, columnNumber);
        }
    }
}
