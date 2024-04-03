import { h, render } from 'preact';
import Chat from './chat';
import { IConfiguration } from '../typings';

console.log('test');

if (window.attachEvent) {
    console.log('test');

    window.attachEvent('onload', injectChat);
} else {
    window.addEventListener('load', injectChat, false);
}

let conf = {} as IConfiguration;

const confString = getUrlParameter('conf');
if (confString) {
    console.log('test');
    try {
        conf = JSON.parse(confString);
    } catch (e) {
        console.error('Failed to parse conf', confString, e);
    }
}

function injectChat() {
    let root = document.createElement('div');
    root.id = 'botmanChatRoot';
    document.getElementsByTagName('body')[0].appendChild(root);
    debugger;

    console.log('conf', conf),
    render(
        <Chat
            userId={conf.userId}
            conf={conf}
        />,
        root
    );
}

function getUrlParameter(name: string) {
    name = name.replace(/[[]/, '\\[').replace(/[]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}