import { Component } from 'preact';
import { desktopClosedMessageAvatarStyle, closedChatAvatarImageStyle} from './style';

export default class ChatTitleMsg extends Component<any, any> {

    render({conf}: IChatTitleMsgProps,{}) {
        return (
            <div 
                style={{
                    position: 'relative', 
                    cursor: 'pointer', 
                }}
                onClick={this.props.onClick}
            >               
            <div
                    className="desktop-closed-message-avatar"
                    style={{
                        transition: 'all .2s ease-in-out',
                        transformOrigin: 'center',
                        background: conf.bubbleBackground,
                        ...desktopClosedMessageAvatarStyle
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {(conf.bubbleAvatarUrl === '') ?
                        <svg style={{
                            width: '60%',
                            height: 'auto'
                        }} xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 39 37" class="conversations-visitor-open-icon"><g fill="none" fill-rule="evenodd"><path fill="#fff" d="M37.65 4.303c-.314-1.943-1.486-3.113-3.374-3.38C34.23.912 29.632.03 22.416.03c-7.214 0-11.812.882-11.843.889-1.477.21-2.507.967-3.042 2.192a83.103 83.103 0 0 1 9.312-.503c6.994 0 11.647.804 12.33.93 3.079.462 5.22 2.598 5.738 5.728.224 1.02.932 4.606.932 8.887 0 2.292-.206 4.395-.428 6.002 1.22-.516 1.988-1.55 2.23-3.044.008-.037.893-3.814.893-8.415 0-4.6-.885-8.377-.89-8.394"/><path d="M32.077 9.76c-.314-1.944-1.487-3.114-3.374-3.382-.046-.01-4.644-.89-11.859-.89-7.214 0-11.813.88-11.843.888-1.903.27-3.075 1.44-3.384 3.363-.01.037-.894 3.814-.894 8.415 0 4.6.884 8.377.889 8.393.314 1.944 1.486 3.114 3.374 3.382.037.007 3.02.578 7.933.801l2.928 5.072a1.151 1.151 0 0 0 1.994 0l2.929-5.071c4.913-.224 7.893-.794 7.918-.8 1.902-.27 3.075-1.44 3.384-3.363.01-.037.893-3.814.893-8.414 0-4.601-.884-8.378-.888-8.394" fill="#fff"/></g></svg>
                        :
                        ((conf.bubbleAvatarUrl.indexOf('/')!==-1) ?
                            <img
                                src={conf.bubbleAvatarUrl}
                                style={{...closedChatAvatarImageStyle}}
                                alt="chat-bubble-avatar"
                            />: <div style={{ display: 'flex', alignItems: 'center' }}><br/>{conf.bubbleAvatarUrl}</div>)
                    }
                </div>
            </div>
        );
    }
}

interface IChatTitleMsgProps {
    conf: { 
        bubbleAvatarUrl: string,
        bubbleBackground: string
    }
}