const postMessage = (message: unknown, targetOrigin: string) => {
    window.postMessage(message, targetOrigin);
}

enum MessageTarget {
    EXSTENSTION = "acc_extension",
    CONTENT_SCRIPT = "acc_contentscript",
    BACKGROUND_SCRIPT = "acc_backgroundscript",
    POPUP_SCRIPT = "acc_popupscript"
}

function openPopup(width: number, height: number) {
    chrome.system.display.getInfo(function(displays) {
        const display = displays[0]; // Assuming the first display is the primary one
        const left = display.workArea.width - width; // Position at the right edge
        const top = 0; // Position at the top edge

        chrome.windows.create({
            url: 'index.html',
            type: 'popup',
            width: width,
            height: height,
            left: left,
            top: top
        });
    });
}

export {
    postMessage,
    MessageTarget,
    openPopup
}