const actions = Object.freeze({
    GET_USER_VAULT: 0,
    SET_USER_VAULT: 1
});

// MESSAGE LISTERNER
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(sender)
    try {
        processMessage(message, sender, sendResponse);
    } catch (e) {
        sendResponse({ status: 500, msg: "Opearation Failed", error: e.message })
    }
    return true;
});

const processMessage = (message, sender, sendResponse) => {
    if (message.action == actions.SET_USER_VAULT) BackgroundOps.setLocalStorage("USER_VAULT", message.data, sendResponse);
    if (message.action == actions.GET_USER_VAULT) BackgroundOps.getLocalStorage("USER_VAULT", sendResponse);
}

class BackgroundOps {
    static setLocalStorage(key, value, respond) {
        const data = {}
        data[key] = value;
        chrome.storage.local.set(data, function () {
            try {
                if (chrome.runtime.lastError) throw Error("Storage Write Failed !")
                respond({ status: 200, action: "write_storage" });
            } catch (e) {
                respond({ status: 500, error: e.message })
            }
        });
    }

    static getLocalStorage(key, respond) {
        chrome.storage.local.get(key, function (data) {
            try {
                if (chrome.runtime.lastError) throw Error("Storage read Failed !")
                if (!data.hasOwnProperty(key)) throw Error("No Such Key found !")
                respond({ status: 200, action: "read_storage", data: data[key] });
            } catch (e) {
                respond({ status: 500, error: e.message })
            }
        });
    }
}