export type TaskType = 'Exam' | 'Project' | 'Homework';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  deadline: string;
  completed: boolean;
  notes: string;
}

export interface TimeSlot {
  time: string;
  subject: string;
  room: string;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}