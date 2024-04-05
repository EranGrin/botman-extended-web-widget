import { Component } from 'preact';
import {IMessageTypeProps, IMessageTypeState} from '../../typings';

export default abstract class MessageType extends Component<IMessageTypeProps, IMessageTypeState> {

    constructor() {
        super();
        this.state = {
            visible: false,
            visibilityChanged: false,
            attachmentsVisible: true
        };
    }

    onVisibilityChange = () => {};

    /**
     * Check if we have a timeout
     */
    componentDidMount() {
        setTimeout(() => {
            console.log('message timeout', this.props);
            this.setState({ 
                visible: true, 
                visibilityChanged: true 
            }, () => {
                // This callback function will be called after the state has been updated
                this.onVisibilityChange();
                this.props.onVisibilityChange(this.props.message, this.state);
            });
        }, this.props.timeout || 0);
    }

}
