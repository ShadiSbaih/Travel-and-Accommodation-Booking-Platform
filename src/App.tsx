import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div  className='h-screen'>

        <h1 className='text-4xl font-bold'>Vite + React</h1>
        <div className="card">
          <button className='btn-primary' onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>

      </div>
    </>
  )
}

export default App
