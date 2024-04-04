
import MessageType from "./messagetype";

export default class TypingIndicator extends MessageType {

    render() {
        return (
            <div class="loading-dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        );
    }

    onVisibilityChange = () => {
        setTimeout(() => {
            this.setState({ visible : false});
            this.props.onVisibilityChange(this.props.message, this.state);
        }, this?.props?.message?.timeout ? this.props.message.timeout * 1000 : 0);
    };
}
