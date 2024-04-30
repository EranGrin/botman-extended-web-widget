import {botman} from './../botman';
import MessageType from "./messagetype";
import { IMessageTypeProps, IAction, IMessage } from '../../typings';

export default class Action extends MessageType {

    render(props: IMessageTypeProps) {
        const { message } = props;

        const buttons = message.actions?.map((action: IAction) => {
            return <div class="btn" onClick={() => this.performAction(action)}>
                {action.text}
            </div>;
        });

        return (
            <div>
                {message.text && <div>{message.text}</div>}
                {this.state.attachmentsVisible ?
                    <div>{buttons}</div>
                    : ''}
            </div>
        );
    }

    performAction(action: IAction) {
        const isActionRespondVisible = action?.additional?.isActionRespondVisible;
        if (isActionRespondVisible) {
            this.props.messageHandler({
                text: action.text,
                type: 'text',
                from: 'visitor'
            });
        }
        botman.callAPI(action.value, true, null, (msg: IMessage) => {
            this.setState({ attachmentsVisible : false});
            this.props.messageHandler({
                text: msg.text,
                type: msg.type,
                timeout: msg.timeout,
                actions: msg.actions,
                attachment: msg.attachment,
                additionalParameters: msg.additionalParameters,
                from: 'chatbot'
            });
        }, () => {});
    }
}
