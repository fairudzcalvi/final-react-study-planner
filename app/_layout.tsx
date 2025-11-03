import { INITIAL_TASKS, SCHEDULE_DATA } from '@/constants/data';
import { DayOfWeek, DaySchedule, Task, TimeSlot } from '@/types';
import { Stack } from 'expo-router';
import React, { createContext, useState } from 'react';

interface TasksContextType {
  tasks: Task[];
  toggleTaskComplete: (id: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

interface ScheduleContextType {
  schedule: DaySchedule[];
  addTimeSlot: (timeSlot: Omit<TimeSlot, 'id'>) => void;
  updateTimeSlot: (id: string, timeSlot: Partial<TimeSlot>) => void;
  deleteTimeSlot: (id: string) => void;
  getTimeSlotsByDay: (day: DayOfWeek) => TimeSlot[];
}

export const TasksContext = createContext<TasksContextType | null>(null);
export const ScheduleContext = createContext<ScheduleContextType | null>(null);

export default function RootLayout() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [schedule, setSchedule] = useState<DaySchedule[]>(SCHEDULE_DATA);

  // Task CRUD Functions
  const toggleTaskComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Schedule CRUD Functions
  const addTimeSlot = (timeSlotData: Omit<TimeSlot, 'id'>) => {
    const newTimeSlot: TimeSlot = {
      ...timeSlotData,
      id: Date.now().toString(),
    };

    setSchedule((prev) => {
      const updatedSchedule = [...prev];
      const dayIndex = updatedSchedule.findIndex(day => day.day === timeSlotData.day);
      
      if (dayIndex !== -1) {
        // Day exists, add to existing day
        updatedSchedule[dayIndex] = {
          ...updatedSchedule[dayIndex],
          slots: [...updatedSchedule[dayIndex].slots, newTimeSlot]
        };
      } else {
        // Day doesn't exist, create new day
        updatedSchedule.push({
          day: timeSlotData.day,
          slots: [newTimeSlot]
        });
      }
      
      return updatedSchedule;
    });
  };

  const updateTimeSlot = (id: string, updatedTimeSlot: Partial<TimeSlot>) => {
    setSchedule((prev) =>
      prev.map((daySchedule) => ({
        ...daySchedule,
        slots: daySchedule.slots.map((slot) =>
          slot.id === id ? { ...slot, ...updatedTimeSlot } : slot
        ),
      }))
    );
  };

  const deleteTimeSlot = (id: string) => {
    setSchedule((prev) =>
      prev.map((daySchedule) => ({
        ...daySchedule,
        slots: daySchedule.slots.filter((slot) => slot.id !== id),
      })).filter(daySchedule => daySchedule.slots.length > 0) // Remove empty days
    );
  };

  const getTimeSlotsByDay = (day: DayOfWeek): TimeSlot[] => {
    const daySchedule = schedule.find(d => d.day === day);
    return daySchedule ? daySchedule.slots : [];
  };

  return (
    <TasksContext.Provider value={{ 
      tasks, 
      toggleTaskComplete, 
      addTask, 
      updateTask, 
      deleteTask 
    }}>
      <ScheduleContext.Provider value={{
        schedule,
        addTimeSlot,
        updateTimeSlot,
        deleteTimeSlot,
        getTimeSlotsByDay
      }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen 
            name="task/[id]" 
            options={{
              headerShown: true,
              headerTitle: 'Task Details',
              headerBackTitle: 'Back',
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
              headerTintColor: '#6366F1',
            }}
          />
          <Stack.Screen 
            name="task/create" 
            options={{
              headerShown: true,
              headerTitle: 'New Task',
              headerBackTitle: 'Back',
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
              headerTintColor: '#6366F1',
            }}
          />
          {/* NEW: Schedule Screens */}
          <Stack.Screen 
            name="schedule/create" 
            options={{
              headerShown: true,
              headerTitle: 'Add Class',
              headerBackTitle: 'Back',
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
              headerTintColor: '#6366F1',
            }}
          />
          <Stack.Screen 
            name="schedule/[day]" 
            options={{
              headerShown: true,
              headerTitle: 'Day Schedule',
              headerBackTitle: 'Back',
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
              headerTintColor: '#6366F1',
            }}
          />
        </Stack>
      </ScheduleContext.Provider>
    </TasksContext.Provider>
  );
}