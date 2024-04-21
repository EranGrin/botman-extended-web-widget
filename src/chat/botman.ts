import axios from 'axios';
import { IAttachment, IMessage } from './../typings';

class BotMan {

	private static instance: BotMan;

	public static getInstance(): BotMan {
        if (!BotMan.instance) {
            BotMan.instance = new BotMan();
        }
        return BotMan.instance;
    }

    userId!: string;
    chatServer!: string;
    requestHeaders!: string | object;
    private loading: boolean = false;
    private listeners: ((loading: boolean) => void)[] = [];

    setLoading(loading: boolean) {
        if (this.loading !== loading) {
            this.loading = loading;
            this.listeners.forEach(listener => listener(loading));
        }
    }

    subscribeLoadingChange(listener: (loading: boolean) => void) {
        this.listeners.push(listener);
        listener(this.loading); 

        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    setUserId(userId: string) {
        this.userId = userId;
    }

    setChatServer(chatServer: string) {
        this.chatServer = chatServer;
    }

    setRequestHeaders(requestHeaders: string | object) {
        this.requestHeaders = requestHeaders;
    }

    callAPI = (text: string, interactive = false, attachment: IAttachment | null = null, perMessageCallback: Function, callback?: Function) => {
        this.setLoading(true);
        let data = new FormData();
        const headers = typeof this.requestHeaders === 'string' ? JSON.parse(this.requestHeaders) : this.requestHeaders;
    	const postData: { [index: string] : string|Blob } = {
    		driver: 'web',
    		userId: this.userId,
    		message: text,
    		attachment: attachment as Blob,
    		interactive: interactive ? '1' : '0'
    	};

        Object.keys(postData).forEach(key => data.append(key, postData[key]));

        axios.post(this.chatServer, data, { headers })
            .then(response => {
                const messages = response.data.messages || [];
                perMessageCallback && messages.forEach((msg: IMessage) => perMessageCallback(msg));
                callback && callback(response.data);
                this.setLoading(false);
            })
            .catch(error => {
                console.error("API call failed: ", error);
                this.setLoading(false);
            });
    };
}

export const botman = BotMan.getInstance();
