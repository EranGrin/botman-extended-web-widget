import { Component } from 'preact';
import {IConfiguration, IMessage} from '../typings';
import MessageHolder from "./message-holder";

export default class MessageArea extends Component<IMessageAreaProps, any> {

    render(props: IMessageAreaProps, {}) {
    	const styleChat = props.conf.wrapperHeight ? 'height:'+(props.conf.wrapperHeight-60)+'px;' : '';

		let calculatedTimeout = 0;
    	return (
    		<ol class="chat" style={styleChat} >
    			{
    				props.messages.map((message) => {
    					const listElement = <MessageHolder
							message={message}
							calculatedTimeout={calculatedTimeout}
							messageHandler={props.messageHandler}
							conf={props.conf}
						/>;

						calculatedTimeout += (message.timeout || 0) * 1000;

						return listElement;
    				})
    			}
    		</ol>
    	);
    }

}

interface IMessageAreaProps {
	conf: IConfiguration,
	messages: IMessage[],
	messageHandler: Function,
};