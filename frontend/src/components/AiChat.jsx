import React from 'react'

const AiChat = () => {
  return (
    <div className="h-full w-full bg-white border border-gray-200 rounded-xl flex flex-col">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-800">
        AI Assistant
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-6 space-y-4 text-sm text-gray-700 overflow-y-auto">
       <div className="max-w-[85%] rounded-lg bg-gray-50 border border-gray-200 px-4 py-2">
  Welcome to Note Chat Bot
</div>

<div className="max-w-[85%] rounded-lg bg-gray-50 border border-gray-200 px-4 py-2">
  I provide concise and accurate text summaries
</div>

      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex items-end gap-2">
          <textarea
            rows={2}
            placeholder="Describe your idea…"
            className="flex-1 resize-none rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
          />
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
            Send
          </button>
        </div>
      </div>

    </div>
  )
}

export default AiChat
