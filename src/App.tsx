import { ThemeToggle } from '@/components/common/ThemeToggle'

function App() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Theme Toggle in top-right corner */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

    </div>
  )
}


export default App