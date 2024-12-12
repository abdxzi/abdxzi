export default function Approvalview() {
  return (
    <div className="h-[400px] w-[300px] bg-slate-300">
    <div className="w-full text-[2em] text-center py-5">Transaction</div>
    <div className="fixed bottom-0 w-full">
      <div className="flex">
        <div className="w-1/2 p-2">
          <div className="text-center bg-[#333] text-white rounded-lg px-4 py-2 cursor-pointer">Reject</div>
        </div>
        <div className="w-1/2 p-2">
          <div className="text-center bg-[#333] text-white rounded-lg px-4 py-2 cursor-pointer">Accept</div>
        </div>
      </div>
    </div>
  </div>
  )
}
