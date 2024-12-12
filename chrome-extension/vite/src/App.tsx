import { useEffect } from "react"

// Declare the chrome object as a global variable

export default function App() {

  useEffect(() => {
    
    // alert(chrome.runtime.id)
    const port = chrome.runtime.connect({ name: "popup" });

    port.onMessage.addListener((msg: string) => {
      console.log("Received from background:", msg);
    });

    // Optional: Handle port disconnection
    port.onDisconnect.addListener(() => {
      console.log("Popup disconnected");
    });
  })

  return (
    // <div className="h-[400px] w-[300px] bg-[#c3c3c3]">Test View</div>
    <></>
  )
}
