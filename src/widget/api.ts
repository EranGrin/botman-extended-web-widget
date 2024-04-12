import Widget from './widget';
import {IMessage} from "../typings";

export default class Api {

    widget: Widget;

    constructor(widget: Widget) {
        this.widget = widget;
    }

    open() {
        this.widget.open();
    }

    close() {
        this.widget.close();
    }

    toggle() {
        this.widget.toggle();
    }

    isOpen() {
        return this.widget.state.isChatOpen === true;
    }

    callChatWidget(payload: Object) {

        const sendPayload = (targetWindow: Window) => {
            if (this.isOpen()) {
                targetWindow.postMessage(payload, '*');
            } else {
                this.open();
                setTimeout(() => {
                    targetWindow.postMessage(payload, '*');
                }, 750);  // Ensures the widget is open before sending the message
            }
        };
    
        // Try to find an iframe, whether in shadow DOM or not
        const iframeElement = document.querySelector('#chatBotManFrame') as HTMLIFrameElement | null || 
                              document.querySelector('botman-widget')?.shadowRoot?.querySelector('#chatBotManFrame') as HTMLIFrameElement | null;
    
        if (iframeElement && iframeElement.contentWindow) {
            sendPayload(iframeElement.contentWindow);
        } else {
            // No iframe, check for direct access scenarios
            const chatWidget = document.querySelector('botman-widget')?.shadowRoot || 
                               document.getElementById('botmanWidgetRoot'); // Assuming 'botmanWidgetRoot' is the ID for direct DOM integrations
            if (chatWidget) {  
                chatWidget.dispatchEvent(new CustomEvent('message', { detail: payload }));
            } else {
                console.error("No chat interface found.");
            }
        }
    }

    checkIfShadowDom() {
        this.widget.props.useShadowDom;
    }

    writeToMessages(message: IMessage) {
        this.callChatWidget({
            method: 'writeToMessages',
            params: [
                message
            ]
        })
    }

    sayAsBot(text: string) {
        this.callChatWidget({
            method: 'sayAsBot',
            params: [
                text
            ]
        });
    }

    say(text: string) {
        this.callChatWidget({
            method: 'say',
            params: [
                text
            ]
        });
    }

    whisper(text: string) {
        this.callChatWidget({
            method: 'whisper',
            params: [
                text
            ]
        });
    }

}