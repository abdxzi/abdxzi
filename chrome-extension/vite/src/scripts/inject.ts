window.test_global = window.test_global || {};


function _test() {
    alert("test")
}

class Signer {
    test(){
        _test()
    }
}

window.test_global = new Signer();
