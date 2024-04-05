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

        let encodedConf = encodeURIComponent(JSON.stringify({...conf, ...dynamicConf}));
        // add option to call the chat frame directly as a child component
        const config = {...conf, ...dynamicConf}
        const conditionTest = true;
        if(conditionTest) {
            return (
                    <div id="botmanChatRoot">
                        <Chat
                            userId={conf.userId}
                            conf={config}
                        />
                    </div>
            );
        }

        return (
            <iframe id="chatBotManFrame" src={iFrameSrc + '?conf=' + encodedConf}
                width='100%'
                height={isMobile ? '94%' : '100%'}
                frameBorder='0'
                allowTransparency
                style='background-color:transparent' />
        );
    }
}

interface IChatFrameProps {
    iFrameSrc: string,
    conf: IConfiguration,
    isMobile: boolean,
}