import { useEffect, useState } from "react"

// Declare the chrome object as a global variable

export default function App() {

  const [transactions, setTransactions] = useState<any[]>([])
  const [isFetched, setIsFetched] = useState(false)

  console.log("Popup script loaded");

  useEffect(() => {
    if (!isFetched) {
      const port = chrome.runtime.connect({ name: "popup" });

      port.postMessage({
        data: {
          method: "acc_pendingTransactions"
        }
      })

      port.onMessage.addListener((msg: unknown) => {
        console.log("Received from background:", msg);
        setTransactions(msg as any[])
      });

      // Optional: Handle port disconnection
      port.onDisconnect.addListener(() => {
        console.log("Popup disconnected");
      });

      setIsFetched(true)
    }
  }, [isFetched])

  console.log(transactions)

  return (
    <>
      {
        transactions.length > 0 ?
          <div className="h-[600px] w-[300px]">
            <div className="">Transactions Pending ({transactions.length})</div>
            <div className="">
              {
                transactions.map((msg, i) => {
                  return (
                    <div key={i}>
                      {
                        JSON.stringify(msg.params,null,2)
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
          : <div className="h-[600px] w-[300px]">No transactions</div>
      }
    </>
  )
}
