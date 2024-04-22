<p align="center">
  <img src="https://camo.githubusercontent.com/cf8dec065ba8fed6fedcbc06fe84e2619e399d86181ad49eb92e930723b46b42/68747470733a2f2f626f746d616e2e696f2f696d672f626f746d616e2e706e67" width="100" />
</p>
<p align="center">
    <h1 align="center">BotMan Extended Web Widget</h1>
</p>
<p align="center">
    <em>Integrate a rich chatbot experience into your website</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/license-MIT-green" alt="License MIT">
	<img src="https://img.shields.io/badge/version-1.2.4-blue" alt="version 1.2.4">
	<img src="https://img.shields.io/badge/maintained-yes-brightgreen" alt="maintained yes">
</p>

<hr>

## Quick Links

> - [Overview](#overview)
> - [Demo](#demo)
> - [Features](#features)
> - [Installation](#installation)
> - [Usage](#usage)
> - [Configuration](#configuration)
> - [Customization](#customization)
> - [Contributing](#contributing)
> - [Acknowledgments](#acknowledgments)
> - [Supporting](#supporting)
> - [License](#license)

---

## Overview

The BotMan Extended Web Widget is an enhanced version of the BotMan Web Widget that allows you to integrate a rich chatbot experience into your website. The widget is built using modern web technologies and provides a seamless integration experience. It offers features such as shadow DOM, custom styles injection, enhanced authentication, and support for single-page application (SPA) frameworks.

---

## Demo

- **HTML Implementation**: Check out this <a href="https://stackblitz.com/~/github.com/EranGrin/botman-extended-web-widget?initialPath=/src/demo.html" target="_blank">HTML Example</a>
- **VUE SPA Implementation**: Check out this <a href="https://stackblitz.com/~/github.com/EranGrin/botman-extended-web-widget?startScript=start-vue-example" target="_blank">Vue SPA Example</a>


## Features

- **No Iframe Required**: Leverage modern web technologies to embed your chatbot.
- **Shadow DOM**: Utilize encapsulated styles and markup for widget isolation.
- **Custom Styles Injection**: Easily apply custom styles to match your website's theme.
- **Enhanced Authentication**: Secure your chatbot with custom headers.
- **Vite and TypeScript**: optimized build process and improved code reliability.
- **SPA Framework Support**: Seamlessly integrate the widget into your React, Angular, or Vue app.


---

## Installation

npm
```bash
npm install botman-extended-web-widget

```
yarn
```bash
yarn add botman-extended-web-widget
```


## Usage
### JavaScript (default configuration)
By default, the widget is rendered as a custom element utilizing Shadow DOM for encapsulation. Defualt styles are injected directly into the Shadow DOM for a seamless integration. To use the widget, simply import the module and initialize it with the URL of your chat server.
```javascript
import BotManWidget from 'botman-extended-web-widget';
new BotManWidget({
    chatServer: 'https://php-uk-conference-2018.marcelpociot.de/botman',
});
```


### HTML
in your HTML file, add the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BotMan Widget</title>
</head>
<body>
<script>
    var botmanWidget = {
        chatServer: 'https://php-uk-conference-2018.marcelpociot.de/botman',
        frameEndpoint: './chat.html',
        useChatAsIframe: true,
        useInAppCss: false,
        useShadowDom: false,
        autoInit: true,
        useLoader: true,
        requestHeaders: {
            'X-Shop-Domain': '1234'
        },
        customStylesInjection:`
            /* with shadow dom and no iframe */
            .botmanWidgetRootInner > div:nth-child(2) {
                background-color: green;
            }

            /* with iframe */
            html, body{
                background-color: red;
            }
        `,
    };
</script>
<script type="module" src="../dist/widget.js"></script>
</body>
</html>
```
### SPA Frameworks (React, Angular, Vue, etc.)
```javascript
import BotManWidget from 'botman-extended-web-widget';

new BotManWidget({
    chatServer: 'https://php-uk-conference-2018.marcelpociot.de/botman',
    frameEndpoint: './chat.html',
    useChatAsIframe: true,
    useInAppCss: false,
    useShadowDom: false,
    useLoader: true,
    requestHeaders: {
        'X-Shop-Domain': '1234'
    },
    customStylesInjection:`
        /* with shadow dom and no iframe */
        .botmanWidgetRootInner > div:nth-child(2) {
            background-color: green;
        }

        /* with iframe */
        html, body{
            background-color: red;
        }
    `,
});
```
## Configuration

The BotMan Extended Web Widget can be configured using the following options:

Orginal options can be found [here](https://botman.io/2.0/web-widget)

Here are the new options:
| Option | Type | Description | default | notes |
| --- | --- | --- | --- | --- |
| useChatAsIframe | boolean | Whether to use the chat as an iframe. | false |
| useInAppCss | boolean | Whether to use in-app inline CSS. | false |
| useShadowDom | boolean | Whether to use shadow DOM. | true | css is always injected |
| requestHeaders | object | Custom headers for authentication. | {} |
| customStylesInjection | string | Custom styles to inject into the widget. | '' | 
| autoInit | boolean | Whether to automatically initialize the widget. use if load in html | false |
| useLoader | boolean |  Whether to use a loader as a type indication until the server responds | false |

## reactiv chat open / close state
```javascript
    var wasChatOpened = false; // Flag to track if the chat was opened
    window.addEventListener('chatOpenStateChange', function(event) {
        // event.detail = {isOpen: true} or {isOpen: false}
        if (event.detail.isOpen && !wasChatOpened) {
            // This block will only execute once, the first time the chat is opened
            window.botmanChatWidget.whisper("start conversation");
            wasChatOpened = true; // Set the flag to true after sending the message
        }
    });
```


## Customization

### styles
The BotMan Extended Web Widget can be customized using the `customStylesInjection` option. This option accepts a string containing CSS rules that will be injected into the widget. The following example demonstrates how to customize the widget's appearance:

```javascript
new BotManWidget({
    chatServer: 'https://php-uk-conference-2018.marcelpociot.de/botman',
    frameEndpoint: './chat.html',
    useChatAsIframe: true,
    useInAppCss: false,
    useShadowDom: false,
    requestHeaders: {
        'X-Custom-Header': '1234'
    },
    customStylesInjection:`
        /* with shadow dom and no iframe */
        .botmanWidgetRootInner > div:nth-child(2) {
            background-color: green;
        }

        /* with iframe */
        html, body{
            background-color: red;
        }
    `,
});
```
### Background Image
To embed a custom background image to the chat window, you can use the `customStylesInjection` option to set the `background-image` property. The following example demonstrates how to add a background image to the chat window with vite speciel syntax:

```javascript
    import svgContent from '../assets/chat-background.svg?raw';
    const encodedSvg = encodeURIComponent(svgContent);
    new BotmanWidget({
      customStylesInjection: `
      .botmanWidgetRootInner > div:nth-child(2) {
        background-image: url("data:image/svg+xml,${encodedSvg}");
      }
        `,
    });
```

```javascript

### Actions
The BotMan Extended Web Widget provides a actions type that allows you to add buttons to the chat window. In some cases, you may want to write the action text in the chat window. To do this, you can use the `additionalParameters` option to set the `isActionRespondVisible` parameter to `true`. The following example demonstrates how to add buttons to the chat window:

```php
    public function startConversation()
        {
            $question = Question::create('Do you need support or help with anything?')
                ->fallback('Unable to ask question')
                ->callbackId('ask_support')
                ->addButtons([
                    Button::create('Yes, I need help')->value('yes')->additionalParameters(['isActionRespondVisible' => true]),
                    Button::create('No, thank you')->value('no')->additionalParameters(['isActionRespondVisible' => true]),
                ]);
        }
```


## Contributing
### Issues
Please open an issue if you have any feature requests, bug fixes, or suggestions.

### Contributing
Contributions are welcome, feel free to submit a PR.

## Acknowledgments

- **[BotMan](https://botman.io)** - The original BotMan Web Widget provided the foundation for the BotMan Extended Web Widget. This project builds upon the original by adding new features and enhancements while maintaining compatibility with existing BotMan infrastructure. Thanks to Marcel Pociot, the creator of BotMan.

## Supporting
If you like this project, please consider supporting it by starring this repository on GitHub.


## License
This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).


