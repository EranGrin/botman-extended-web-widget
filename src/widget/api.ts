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
        const iframeElement = document.getElementById('chatBotManFrame') as HTMLIFrameElement | null;
        if (iframeElement && iframeElement.contentWindow) {
            // Only try to post message if the iframe and its contentWindow are available
            if (this.isOpen()) {
                iframeElement.contentWindow.postMessage(payload, '*');
            } else {
                try {
                    this.open();
                    setTimeout(() => {
                        // Re-check to ensure the element is still valid and present
                        const recheckedIframeElement = document.getElementById('chatBotManFrame') as HTMLIFrameElement | null;
                        if (recheckedIframeElement && recheckedIframeElement.contentWindow) {
                            recheckedIframeElement.contentWindow.postMessage(payload, '*');
                        }
                    }, 750);
                } catch (e) {
                    console.error(e);
                }
            }
        } else {
            // Handle the case where the iframe does not exist
            console.error("Iframe 'chatBotManFrame' not found.");
        }
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