import { openPopup } from "./lib/utils";

let popupPort: chrome.runtime.Port | null = null;
let contentPort: chrome.runtime.Port | null = null;

const pendingTransactions: unknown[] = []

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === 'content') {
        contentPort = port;
        console.log('Content script connected');

        // Listen for messages from the content script
        contentPort.onMessage.addListener((msg) => {
            console.log('Message from content script:', msg);

            if (msg.data.method == 'eth_sendTransaction') {
                
                pendingTransactions.push(msg.data)

                openPopup(400, 600)
            }

            // if (popupPort) {
            //     popupPort.postMessage(msg); // Relay message to popup
            // }
        });

        contentPort.onDisconnect.addListener(() => {
            contentPort = null;
            console.log('Content script disconnected');
        });
    } else if(port.name === 'popup') {
        popupPort = port;
        console.log('Popup script connected');

        popupPort.onMessage.addListener((msg) => {
            console.log('Message from popup script:', msg);

            if (msg.data.method == 'acc_pendingTransactions') {
                
                popupPort?.postMessage(pendingTransactions)
            }

            // if (popupPort) {
            //     popupPort.postMessage(msg); // Relay message to popup
            // }
        });

        popupPort.onDisconnect.addListener(() => {
            contentPort = null;
            console.log('Content script disconnected');
        });
    }
})