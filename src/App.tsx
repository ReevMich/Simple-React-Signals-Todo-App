import { Lightbulb, Moon } from "lucide-react"

import { Button } from './components/ui/button';
import TodoCard from './components/TodoCard';
import { useTheme } from './components/theme-provider';
import { useState } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  created_at: number;
}

// TODO: Replace useState with Signals
// const todos = signal<Array<Todo>>([]);

function App() {
  const {theme, setTheme} = useTheme();
  const [todos, setTodos] = useState<Array<Todo>>([]);

  return (
    <>
      <div className='flex flex-col min-h-screen p-4'>
        <div className='flex justify-center'>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' && <Lightbulb className="w-4 h-4" />}
            {theme === 'light' && <Moon className="w-4 h-4" />}
          </Button>
        </div>
        <div className='flex justify-center mt-48'>
          <TodoCard todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </>
  )
}

export default App
