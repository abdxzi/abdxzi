import { postMessage, MessageTarget } from "./lib/utils";

window.test_global = window.test_global || {};

type RequestProps = {
    method: string;
    params: unknown;
}

class Signer {
    request({ method, params }: RequestProps) {
        console.log(method, params);
    }

    test() {
        const message = {
            data: {
                name: "acc_provider",
                data: {
                    method: "eth_sendTransaction",
                    params: {
                        from: '0xYourAddress',
                        to: '0xRecipientAddress',
                        value: '0xAmountInHex', // Amount in Wei, in hexadecimal format
                        gas: '0xGasLimitInHex', // Optional, in hexadecimal format
                        gasPrice: '0xGasPriceInHex', // Optional, in hexadecimal format
                        data: '0xOptionalData', // Optional, for contract interactions
                    },
                }
            },
            target: MessageTarget.EXSTENSTION
        }

        postMessage(message, '*');
    }
}

window.test_global = new Signer();
