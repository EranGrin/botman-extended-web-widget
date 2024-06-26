import { Component } from 'preact';
import {botman} from './botman';
import { IAction, IMessage } from '../typings';


export default class ChatAction extends Component<IChatActionProps, any> {

    render(props: IChatActionProps) {
        return (
            <div class="btn" onClick={() => this.performAction(props.action)}>
                {props.action.text}
            </div>
        );
    }

    performAction(action: IAction) {
        botman.callAPI(action.value, true, null, (msg: IMessage) => {
            this.props.messageHandler({
                text: msg.text,
                type: msg.type,
                actions: msg.actions,
                attachment: msg.attachment,
                additionalParameters: msg.additionalParameters,
                from: 'chatbot'
            });
        }, () => {});
    }
}

interface IChatActionProps {
    messageHandler: Function,
    action: IAction,
}