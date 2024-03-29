import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { X } from "lucide-react"
import { cn } from "@/lib/utils";
import { useState } from "react";

type Todo = {
    id: string;
    text: string;
    completed: boolean;
    created_at: number;
}

type TodoCardProps = {
    todos: Array<Todo>;
    setTodos: (todos: Array<Todo>) => void;
}

function TodoCard({ todos, setTodos }: TodoCardProps) {
    const [todoText, setTodoText] = useState<string>("");
    // const todoText = useSignal('');

    const addTodo = (text: string) => {
        setTodos([
            ...todos,
            { id: crypto.randomUUID(), text, completed: false, created_at: Date.now() }
        ])

    }

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const toggleTodo = (id: string) => {
        setTodos(todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		}));
    }

    const addTodoAndClear = () => {
        if (!todoText) return;

        addTodo(todoText);
        setTodoText('')
    }

    const renderTodoRow = (todo: Todo, index: number) => {
        return (
            <div key={index} className="flex items-center space-x-2 group">
                <Checkbox id={todo.id} checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
                <Label className={cn("flex-grow", todo.completed && ("line-through text-black/40 dark:text-white/40"))} htmlFor={todo.id}>{todo.text}</Label>
                <Button
                    className="transition-opacity duration-200 opacity-0 group-hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteTodo(todo.id)}
                >
                    <X className="w-4 h-4 text-black/40 dark:text-white/40" />
                    <span className="sr-only">Delete todo</span>
                </Button>
            </div>
        )
    }

    return (
        <>
            <Card className='w-[700px] h-[5000px]'>
                <CardHeader className="relative bg-white/30 dark:bg-black/30">
                    <CardTitle className="pt-4 pb-6 text-3xl text-center">Todos</CardTitle>
                    <div className='flex space-x-2'>
                        <Input
                            type='text'
                            placeholder='What needs to be done?'
                            value={todoText}
                            onChange={e => setTodoText(e.currentTarget.value)}
                            onKeyDown={e => e.key === 'Enter' && addTodoAndClear()}
                        />
                        <Button variant="outline" type="submit" onClick={addTodoAndClear}>Add</Button>
                    </div>
                    <Separator className="absolute bottom-0 left-0 right-0 dark:bg-white/10 bg-black/10" />
                </CardHeader>
                <CardContent className="mt-4">
                    {todos.length
                        ? (
                            <ScrollArea className="h-96" scrollHideDelay={600} type="auto">
                                <ul className='pr-4 space-y-4'>
                                    {todos.map(renderTodoRow)}
                                </ul>
                            </ScrollArea>
                            )
                        : (
                            <div className='flex items-center justify-center h-96'>
                                <p className='text-black/50 dark:text-white/50'>No todos yet.</p>
                            </div>
                        )
                    }
                </CardContent>
                <CardFooter>
                    <div className="flex justify-center flex-1 font-bold text-black/60 dark:text-white/60">
                        Tasks Completed: {todos.filter(todo => todo.completed).length}
                    </div>
                </CardFooter>
            </Card>
        </>
    )
} 

export default TodoCard;