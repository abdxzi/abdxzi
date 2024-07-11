window.accumulate = window.accumulate || {};

const MSG_STATUS = Object.freeze({
    FAILED: 0,
    SUCCESS: 1
})

function _sendi() {
    window.postMessage({ type: 'ACCUMULATE_MSG', target:"ui", data: 'Hello from webpage!' }, '*');
}

class AccumulateSigner {
    setUser(){
        
    }

    sendi(){
        _sendi()
    }
}

window.accumulate = new AccumulateSigner();
