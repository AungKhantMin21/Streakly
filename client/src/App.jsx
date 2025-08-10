import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
      <h1>Streakly</h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
