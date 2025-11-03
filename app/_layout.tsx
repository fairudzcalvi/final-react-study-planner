import { Stack } from 'expo-router';
import React, { useState, createContext } from 'react';
import { Task } from '@/types';
import { INITIAL_TASKS } from '@/constants/data';

interface TasksContextType {
  tasks: Task[];
  toggleTaskComplete: (id: string) => void;
}

export const TasksContext = createContext<TasksContextType | null>(null);

export default function RootLayout() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, toggleTaskComplete }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen 
          name="task/[id]" 
          options={{
            headerShown: true,
            headerTitle: 'Task Details',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </TasksContext.Provider>
  );
}