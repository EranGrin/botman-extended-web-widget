interface Configuration {
    /**
     * The URL of the BotMan route / server to use.
     */
    chatServer?: string,
    /**
     * The location of your chat frame URL / route.
     */
    frameEndpoint?: string,
    /**
     * Date and time format to use
     */
    timeFormat?: string;
    dateTimeFormat?: string,
    /**
     * The title to use in the widget header.
     */
    title?: string,
    /**
     * How many days is the cookie valid?
     */
    cookieValidInDays?: number,
    /*
     * This is a welcome message that every new user sees
     * when the widget is opened for the first time.
     */
    introMessage?: string,
    /*
     * Input placeholder text
     */
    placeholderText?: string,
    /*
     * Toggle display of message times
     */
    displayMessageTime?: boolean,
    /*
     * Send a widget opened event
     */
    sendWidgetOpenedEvent?: boolean,
    widgetOpenedEventData?: string,
    mainColor?: string,
    headerTextColor?: string,
    bubbleBackground?: string,
    bubbleAvatarUrl?: string,
    desktopHeight?: number,
    desktopWidth?: number,
    mobileHeight?: string,
    mobileWidth?: string,
    videoHeight?: number,
    aboutLink?: string,
    aboutText?: string,
    chatId?: string,
    userId?: string,
    wrapperHeight?: number,
    alwaysUseFloatingButton?: boolean,
    useEcho?: boolean,
    echoChannel?: string | any,
    echoChannelType?: string,
    echoConfiguration?: any,
    echoEventName?: string,
    init?: Function,
    requestHeaders?: object | string,
    useChatAsIframe?: boolean,
    useInAppCss?: boolean,
    useShadowDom?: boolean,
    customStylesInjection?: string,
  }
declare global {
  interface Window {
    BotmanWidget: typeof BotmanWidget;
  }
}

declare class BotmanWidget {
  constructor(config: Configuration);
}

export as namespace BotmanWidget;
export = BotmanWidget;