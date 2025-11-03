import { DaySchedule, Task } from '@/types';
import { COLORS } from '@/utils/colors';

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'App Dev',
    type: 'Homework',
    deadline: 'Nov 10, 2025',
    completed: false,
    priority: 'high',
    notes: 'React Native Mini Project',
  }
];

export const SCHEDULE_DATA: DaySchedule[] = [
  {
    day: 'Monday',
    slots: [
      { id: '1', time: '9:00 AM', subject: 'App Dev', room: 'LR 5', color: COLORS.primary, day: 'Monday'},
      { id: '2', time: '11:00 AM', subject: 'DSA', room: 'LR 1', color: COLORS.danger, day: 'Monday'},
      { id: '3', time: '2:00 PM', subject: 'Networking 2', room: 'Room 105', color: COLORS.success, day: 'Monday'},
    ],
  },
  {
    day: 'Tuesday',
    slots: [
      { id: '4', time: '10:00 AM', subject: 'Contemporary World', room: 'CLA 5', color: COLORS.warning, day: 'Tuesday'},
      { id: '5', time: '1:00 PM', subject: 'System Integration', room: 'LR 3', color: COLORS.project, day: 'Tuesday'},
    ],
  },
  {
    day: 'Wednesday',
    slots: [
      { id: '6', time: '9:00 AM', subject: 'App Dev', room: 'LAB 1', color: COLORS.primary, day: 'Wednesday'},
      { id: '7', time: '2:00 PM', subject: 'Networking 2', room: 'LR 4', color: COLORS.success, day: 'Wednesday'},
    ],
  },
  {
    day: 'Thursday',
    slots: [
      { id: '8', time: '11:00 AM', subject: 'DSA', room: 'LR 2', color: COLORS.danger, day: 'Thursday'},
      { id: '9', time: '1:00 PM', subject: 'Networking 2', room: 'LAB 1', color: COLORS.success, day: 'Thursday'},
    ],
  },
  {
    day: 'Friday',
    slots: [
      { id: '10', time: '10:00 AM', subject: 'Contemporary World', room: 'CLA 5', color: COLORS.warning, day: 'Friday'},
      { id: '11', time: '12:00 PM', subject: 'System Integration', room: 'LR 3', color: COLORS.project, day: 'Friday'},
    ],
  },
];

export const TYPE_COLORS = {
  Exam: COLORS.exam,
  Project: COLORS.project,
  Homework: COLORS.homework,
};

export const TYPE_COLORS_LIGHT = {
  Exam: COLORS.examLight,
  Project: COLORS.projectLight,
  Homework: COLORS.homeworkLight,
};

export const PRIORITY_COLORS = {
  high: COLORS.danger,
  medium: COLORS.warning,
  low: COLORS.textLight,
};


export const SUBJECT_COLORS = {
  'App Dev': COLORS.primary,
  'DSA': COLORS.danger,
  'Networking 2': COLORS.success,
  'Contemporary World': COLORS.warning,
  'System Integration': COLORS.project,
  'Data Analytics': COLORS.secondary,
  'EPIC Accelerate': COLORS.success,
  'Computer Sciencee': COLORS.primaryDark,
  'Introduction to Computing': COLORS.secondary,
  'Com Prog': COLORS.warningLight,
};

export const DAYS_OF_WEEK: Array<{ label: string; value: string }> = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' },
];