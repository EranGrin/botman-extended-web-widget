import { Component } from 'preact';
import {IConfiguration, IMessage} from '../typings';
import MessageHolder from "./message-holder";
import { useEffect, useState } from 'preact/hooks';
import { botman } from './botman';

export default class MessageArea extends Component<IMessageAreaProps, any> {

    render(props: IMessageAreaProps, {}) {
    	const styleChat = props.conf.wrapperHeight ? 'height:'+(props.conf.wrapperHeight-60)+'px;' : '';

		const [loading, setLoading] = useState(false);

		useEffect(() => {
            const unsubscribe = botman.subscribeLoadingChange(setLoading);
            return unsubscribe;
        }, []);

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
				{
					props.conf.useLoader && loading && (<li class="clearfix">
						<div className="loading-dots">
							<span className="dot"></span>
							<span className="dot"></span>
							<span className="dot"></span>
						</div>
					</li>)
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