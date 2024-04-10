import axios from 'axios';
import { IAttachment, IMessage } from './../typings';

class BotMan {

	userId!: string;
	chatServer!: string;
	requestHeaders!: string;

    setUserId(userId: string) {
        this.userId = userId;
    }

    setChatServer(chatServer: string) {
        this.chatServer = chatServer;
    }

	setRequestHeaders(requestHeaders: string) {
		this.requestHeaders = requestHeaders;
	}

    callAPI = (text: string, interactive = false, attachment: IAttachment | null = null, perMessageCallback: Function, callback: Function) => {
    	let data = new FormData();
		const headers =  typeof this.requestHeaders === 'string' ? JSON.parse(this.requestHeaders) : this.requestHeaders;
    	const postData: { [index: string] : string|Blob } = {
    		driver: 'web',
    		userId: this.userId,
    		message: text,
    		attachment: attachment as Blob,
    		interactive: interactive ? '1' : '0'
    	};

    	Object.keys(postData).forEach(key => data.append(key, postData[key]));

    	axios.post(
			this.chatServer,
			data,
			{headers}
		).then(response => {
    		const messages = response.data.messages || [];

			if (perMessageCallback) {
				messages.forEach((msg: IMessage) => {
					perMessageCallback(msg);
				});
			}

    		if (callback) {
    			callback(response.data);
    		}
    	});
    };

}

export let botman = new BotMan();
