export type TaskType = 'Exam' | 'Project' | 'Homework';

export type Priority = 'high' | 'medium' | 'low';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  deadline: string;
  completed: boolean;
  notes: string;
  priority: Priority;
}

export interface TimeSlot {
  id: string;
  time: string;
  subject: string;
  room: string;
  color: string;
  day: DayOfWeek;
}

export interface DaySchedule {
  day: DayOfWeek;
  slots: TimeSlot[];
}

// Task form data without id and completed
export type TaskFormData = Omit<Task, 'id' | 'completed'>;

// Schedule form data
export interface ScheduleFormData {
  time: string;
  subject: string;
  room: string;
  color: string;
  day: DayOfWeek;
}