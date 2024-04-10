import { Component } from 'preact';
import { IConfiguration } from '../typings';
import Chat from '../chat/chat';

export default class ChatFrame extends Component<any, any> {

    shouldComponentUpdate() {
        // do not re-render via diff:
        return false;
    }

    render({iFrameSrc, isMobile, conf}: IChatFrameProps,{}) {
        let dynamicConf = window.botmanWidget || {} as IConfiguration; // these configuration are loaded when the chat frame is opened

        const config = {...conf, ...dynamicConf}
        let encodedConf = encodeURIComponent(JSON.stringify(config));
        
        if(config.useChatAsIframe) {
            return (
                <iframe id="chatBotManFrame" src={iFrameSrc + '?conf=' + encodedConf}
                    width='100%'
                    height={isMobile ? '94%' : '100%'}
                    frameBorder='0'
                    allowTransparency
                     />
            );
        }
        
        return (
            <div id="botmanChatRoot">
                <Chat
                    userId={conf.userId}
                    conf={config}
                />
            </div>
        );
    }
}

interface IChatFrameProps {
    iFrameSrc: string,
    conf: IConfiguration,
    isMobile: boolean,
}