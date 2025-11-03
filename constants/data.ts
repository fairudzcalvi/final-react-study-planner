import { Task, DaySchedule } from '@/types';

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Math Assignment',
    type: 'Homework',
    deadline: 'Nov 5, 2025',
    completed: false,
    notes: 'Complete exercises 1-15 from Chapter 3. Focus on algebraic expressions and equations.',
  },
  {
    id: '2',
    title: 'Physics Midterm',
    type: 'Exam',
    deadline: 'Nov 8, 2025',
    completed: false,
    notes: "Study chapters 4-7. Review Newton's laws and energy conservation principles.",
  },
  {
    id: '3',
    title: 'History Essay',
    type: 'Project',
    deadline: 'Nov 12, 2025',
    completed: false,
    notes: 'Write 1500 words on World War II causes. Include at least 5 scholarly sources.',
  },
  {
    id: '4',
    title: 'Chemistry Lab Report',
    type: 'Homework',
    deadline: 'Nov 6, 2025',
    completed: false,
    notes: 'Document the acid-base titration experiment. Include data tables and analysis.',
  },
  {
    id: '5',
    title: 'English Reading',
    type: 'Homework',
    deadline: 'Nov 4, 2025',
    completed: true,
    notes: 'Read chapters 5-8 of "To Kill a Mockingbird" and prepare discussion notes.',
  },
];

export const SCHEDULE_DATA: DaySchedule[] = [
  {
    day: 'Monday',
    slots: [
      { time: '9:00 AM', subject: 'Mathematics', room: 'Room 201' },
      { time: '11:00 AM', subject: 'Physics', room: 'Lab 3' },
      { time: '2:00 PM', subject: 'English', room: 'Room 105' },
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '10:00 AM', subject: 'Chemistry', room: 'Lab 1' },
      { time: '1:00 PM', subject: 'History', room: 'Room 302' },
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '9:00 AM', subject: 'Mathematics', room: 'Room 201' },
      { time: '2:00 PM', subject: 'Physical Education', room: 'Gym' },
    ],
  },
  {
    day: 'Thursday',
    slots: [
      { time: '11:00 AM', subject: 'Physics', room: 'Lab 3' },
      { time: '1:00 PM', subject: 'English', room: 'Room 105' },
    ],
  },
  {
    day: 'Friday',
    slots: [
      { time: '10:00 AM', subject: 'Chemistry', room: 'Lab 1' },
      { time: '12:00 PM', subject: 'History', room: 'Room 302' },
    ],
  },
];

export const TYPE_COLORS = {
  Exam: '#FF6B6B',
  Project: '#4ECDC4',
  Homework: '#FFE66D',
};