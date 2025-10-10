import { useState } from 'react'
import Button from '@/components/common/Button'
import { ThemeToggle } from '@/components/common/ThemeToggle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Theme Toggle in top-right corner */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Travel App
        </h1>
        
        <Button 
          variant='solid' 
          colorScheme='warning' 
          size='lg' 
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>

        <p className="text-gray-600 dark:text-gray-400">
          Click the {count === 0 ? '🌙/🌞' : 'button'} to test dark mode
        </p>
      </div>
    </div>
  )
}
  

export default App