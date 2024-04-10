import { ContainerNode, render } from 'preact';
import Widget from './widget';
import { defaultConfiguration } from './configuration';
import { IConfiguration } from "../typings";
import cssContent from '../assets/css/chat-no-iframe.css?raw';

class BotmanWidget {
    private rootElement!: HTMLDivElement;

    constructor(options: IConfiguration) {
        const config = {...defaultConfiguration, ...options};
        config.userId = this.getUserId(config);
        this.initialize(config);
    }

    private initialize(config: IConfiguration) {

        
        // import css files for the vite to bundle them into the dist folder
        if ( import.meta.env.nevermined ) {
            import('../assets/css/chat.css');
            import('../assets/css/chat-no-iframe.css');
        }

        this.rootElement = document.createElement('div');
        this.rootElement.id = 'botmanWidgetRoot';
        document.body.appendChild(this.rootElement);
        
        if (config.useShadowDom) {
            this.initializeCustomElement(config);
        } else {
            this.injectChat(this.rootElement, config);
        }
    }

    private injectChat(container: ContainerNode, config: IConfiguration) {
        if (config.useInAppCss && !config.useChatAsIframe) {
            const styleElem = document.createElement('style');
            styleElem.textContent = cssContent;
            document.head.appendChild(styleElem);
        }

        render(
            <Widget
                isMobile={window.screen.width < 500}
                iFrameSrc={config.frameEndpoint}
                conf={config}
            />,
            container
        );
    }

    private initializeCustomElement(config: IConfiguration) {    // Define the custom element if it hasn't been defined already
        if (!customElements.get('botman-widget')) {
            customElements.define('botman-widget', class extends HTMLElement {
                constructor() {
                    super();
                    const shadowRoot = this.attachShadow({ mode: 'open' });
                    injectCSS(shadowRoot);
                    render(
                        <Widget
                            isMobile={window.screen.width < 500}
                            iFrameSrc={config.frameEndpoint}
                            conf={config}
                        />,
                        shadowRoot
                    );
                }
            });
            function injectCSS(shadowRoot: ShadowRoot) {
                const styleElem = document.createElement('style');
                const customStyles = config?.customStylesInjection?.replace(/;/g, ' !important;');
                styleElem.textContent = `${customStyles}`;
                shadowRoot.appendChild(styleElem);
        
                const importedCss = document.createElement('style');
                importedCss.textContent = cssContent;
                shadowRoot.appendChild(importedCss);
            }
        }
    
        const elementName = 'botman-widget';
        const ElementConstructor = customElements.get(elementName);
        if (ElementConstructor) {
            const widgetElement = new ElementConstructor();
            this.rootElement.appendChild(widgetElement);
        } else {
            console.error(`Failed to retrieve the constructor for the custom element '${elementName}'`);
        }
    }

    private getUserId(config: { userId?: string }): string {
        return config.userId || this.generateRandomId();
    }

    private generateRandomId(): string {
        return Math.random().toString(36).substring(2, 15);
    }
}

function initializeWidgetFromGlobal() {
    const botmanWidgetElement = document.getElementById('botmanWidget');
    let settings = {};

    if (botmanWidgetElement) {
        const botmanWidgetElementSrc = botmanWidgetElement.getAttribute('src') || '';
        settings = JSON.parse(getUrlParameter('settings', botmanWidgetElementSrc, '{}'));
    }

    const dynamicConf = window.botmanWidget || {} as IConfiguration;
    const config = {...dynamicConf, ...settings};
    new BotmanWidget(config);
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initializeWidgetFromGlobal);
} else {
    initializeWidgetFromGlobal();
}

declare global {
    interface Window {
        botmanWidget?: IConfiguration;
        attachEvent: Function;
    }
}

function getUrlParameter(name: string, url: string, defaultValue = ''): string {
    const regex = new RegExp('[\\?&]' + name.replace(/[\[\]]/g, '\\$&') + '=([^&#]*)');
    const results = regex.exec(url);
    return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : defaultValue;
}

export default BotmanWidget;