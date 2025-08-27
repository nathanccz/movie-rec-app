import { Icon } from '@iconify/react/dist/iconify.js'
import ResultsWindow from './ResultsWindow'

export default function ChatMain({
  results,
  handleInputChange,
  userMessages,
  handleGetRecommendations,
  message,
  introMessage,
  endMessage,
  loading,
}) {
  console.log(message)
  console.log(results)
  return (
    <main className="p-10 bg-black w-full h-screen bg-main-background bg-cover rounded-tl-lg border-r-[1px] border-gray-400 overflow-y-scroll relative">
      <div className="flex items-center justify-center h-full flex-col gap-5 relative">
        <div className="max-h-[70vh] overflow-y-scroll absolute top-0 left-0 w-full">
          {loading && (
            <div className="border rounded-md p-3 bg-slate-700 mb-10 max-w-[30rem]">
              {message}
            </div>
          )}

          {!loading ? (
            <div>
              {userMessages?.map((msg) => (
                <div className="border rounded-md p-3 bg-slate-700 mb-10 max-w-[30rem]">
                  {msg}
                </div>
              ))}
              <div className="border rounded-md p-3 bg-slate-600 mb-3 max-w-[30rem] ml-96">
                {introMessage}
              </div>
              <ResultsWindow results={results} />
              <div className="border rounded-md p-3 bg-slate-600 mb-3 max-w-[30rem] ml-96">
                {endMessage}
              </div>
            </div>
          ) : (
            <div className="flex gap-1 relative">
              <span className="block font-bold">Searching</span>
              <span className="block loading loading-dots loading-sm absolute top-3 left-20"></span>
            </div>
          )}
        </div>
        <div className="p-2 border rounded bg-gray-800 w-[80%] absolute bottom-0">
          <div className="mb-1">
            <textarea
              className="textarea textarea-secondary w-full resize-none border-none focus:outline-none overflow-visible bg-transparent"
              placeholder="Ask me anything..."
              onChange={handleInputChange}
              value={message}
            ></textarea>
          </div>
          <div className="flex justify-between">
            <div className="h-[2rem] over">
              <button className="btn btn-outline text-xs mr-3 px-3 h-[2.1rem] rounded">
                Any
              </button>
              <button className="btn btn-outline text-xs mr-3 px-3 h-[2.1rem] rounded">
                Movie
              </button>
              <button className="btn btn-outline text-xs px-3 h-[2.1rem] rounded">
                TV
              </button>
            </div>
            <Icon
              icon="mdi:send-circle"
              className="text-3xl cursor-pointer"
              onClick={handleGetRecommendations}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
