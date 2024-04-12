
import MessageType from "./messagetype";

export default class TypingIndicator extends MessageType {

    render() {
        return this.state.visible ? (
            <div className="loading-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        ) : null;
    }

    onVisibilityChange = () => {
        this.setState({ visible: true })
        setTimeout(() => {
            this.setState({ visible : false, visibilityChanged: true});
            this.props.onVisibilityChange(this.props.message, this.state);
        }, this?.props?.message?.timeout ? this.props.message.timeout * 1000 : 0);
    };
}
