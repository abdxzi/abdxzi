function injectScript(file) {
    var script = document.createElement('script');
    script.src = chrome.runtime.getURL(file);
    script.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}

injectScript("js/signer.js")


console.log("Content js Loaded.")
console.log("[i] injected Signer")


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

console.log("current site: location", window.location.origin);
console.log("current site: location.href", window.location.href);


window.addEventListener('message', function (event) {
    // process only message from accumulate signer
    if (event.source !== window || event.data.type !== "ACCUMULATE_MSG") {
        return;
    }

    chrome.runtime.sendMessage({
        type: "fromContentScript",
        message: "Hello from content script"
    });

    console.log("CONTENT SCRIPT: MESSAGE RECIEVED")
    console.log("event.origin:", event.origin)
    console.log("Data recieved", event.data)
});




const actions = Object.freeze({
    GET_USER_VAULT: 0,
    SET_USER_VAULT: 1
});

// chrome.runtime.sendMessage({ action: actions.SET_USER_VAULT, data: 'This is Azeez' }, function (response) {
//     console.log('Data received from background script:', response);
// });

setTimeout(() => {
    // chrome.runtime.sendMessage({ action: actions.GET_USER_VAULT }, function (response) {
    //     console.log('Data received from background script:', response);
    // });

    // chrome.runtime.sendMessage({
    //     type: "fromContentScript",
    //     message: "Hello from content script"
    // });
}, 10000)