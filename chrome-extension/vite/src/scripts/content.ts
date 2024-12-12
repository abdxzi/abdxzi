import { MessageTarget } from "./lib/utils";

function injectScript(file: string) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(file);
    script.onload = function () {
        script.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}

injectScript('js/inject.js');

let port = chrome.runtime.connect({ name: 'content' });

// Message from background script
port.onMessage.addListener((msg) => {
    console.log('Received message in popup:', msg);
});

// Reconnect to port
port.onDisconnect.addListener(() => {
    console.log('port disconnected in content, reconnecting ...')
    port = chrome.runtime.connect({ name: 'content' });
})

// Message from injected script/webpage
window.addEventListener('message', (event) => {

    if(event.data.target == MessageTarget.EXSTENSTION) {
        console.log('Received message from:', event);
        
        port.postMessage(event.data.data)
    }

});