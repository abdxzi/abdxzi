function injectScript(file: string) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(file);
    script.onload = function () {
        script.remove();
    };
    (document.head || document.documentElement).appendChild(script);
}

injectScript('js/inject.js');