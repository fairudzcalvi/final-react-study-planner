import { useState } from 'react';

export interface Task {
  id: number;
  title: string;
  type: 'Exam' | 'Project' | 'Homework';
  deadline: string;
  completed: boolean;
  notes: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Math Homework Chapter 5',
    type: 'Homework',
    deadline: 'Nov 5, 2025',
    completed: false,
    notes: 'Complete exercises 1-20 on page 145. Focus on quadratic equations and show all work.',
  },
  {
    id: 2,
    title: 'History Essay: WWII',
    type: 'Project',
    deadline: 'Nov 8, 2025',
    completed: false,
    notes: 'Write 1500 words about the impact of WWII on global politics. Include at least 5 sources and proper citations.',
  },
  {
    id: 3,
    title: 'Physics Midterm Exam',
    type: 'Exam',
    deadline: 'Nov 10, 2025',
    completed: false,
    notes: 'Study chapters 1-6. Review formulas for motion, energy, and momentum. Practice problems from textbook.',
  },
  {
    id: 4,
    title: 'English Reading',
    type: 'Homework',
    deadline: 'Nov 4, 2025',
    completed: true,
    notes: 'Read chapters 3-5 of To Kill a Mockingbird. Take notes on themes and character development.',
  },
  {
    id: 5,
    title: 'Biology Lab Report',
    type: 'Project',
    deadline: 'Nov 12, 2025',
    completed: false,
    notes: 'Write up the cell structure lab results. Include diagrams, observations, and conclusions.',
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // CREATE
  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Math.max(0, ...tasks.map(t => t.id)) + 1, // Generate new ID
    };
    setTasks([...tasks, newTask]);
    return newTask.id;
  };

  // READ
  const getTaskById = (id: number) => {
    return tasks.find((task) => task.id === id);
  };

  // UPDATE
  const updateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const toggleComplete = (id: number) => {
    updateTask(id, { completed: !getTaskById(id)?.completed });
  };

  // DELETE
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getPendingCount = () => {
    return tasks.filter((task) => !task.completed).length;
  };

  return {
    tasks,
    addTask,
    getTaskById,
    updateTask,
    toggleComplete,
    deleteTask,
    getPendingCount,
  };
}