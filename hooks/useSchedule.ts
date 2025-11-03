import { useState } from 'react';

export interface ScheduleSlot {
  id: number;
  day: string;
  time: string;
  subject: string;
  room: string;
  instructor?: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Exam';
}

const initialSchedule: ScheduleSlot[] = [
  {
    id: 1,
    day: 'Monday',
    time: '8:00 AM',
    subject: 'Mathematics',
    room: 'Room 201',
    instructor: 'Dr. Smith',
    type: 'Lecture',
  },
  {
    id: 2,
    day: 'Monday',
    time: '10:00 AM',
    subject: 'English',
    room: 'Room 105',
    instructor: 'Prof. Johnson',
    type: 'Lecture',
  },
  {
    id: 3,
    day: 'Tuesday',
    time: '9:00 AM',
    subject: 'History',
    room: 'Room 302',
    instructor: 'Dr. Brown',
    type: 'Lecture',
  },
  {
    id: 4,
    day: 'Wednesday',
    time: '1:00 PM',
    subject: 'Physics Lab',
    room: 'Lab 3',
    instructor: 'Dr. Wilson',
    type: 'Lab',
  },
  {
    id: 5,
    day: 'Thursday',
    time: '2:00 PM',
    subject: 'Art',
    room: 'Studio A',
    instructor: 'Ms. Davis',
    type: 'Tutorial',
  },
];

export function useSchedule() {
  const [schedule, setSchedule] = useState<ScheduleSlot[]>(initialSchedule);

  // CREATE
  const addSchedule = (slot: Omit<ScheduleSlot, 'id'>) => {
    const newSlot: ScheduleSlot = {
      ...slot,
      id: Math.max(0, ...schedule.map(s => s.id)) + 1,
    };
    setSchedule([...schedule, newSlot]);
    return newSlot.id;
  };

  // READ
  const getScheduleById = (id: number) => {
    return schedule.find((slot) => slot.id === id);
  };

  const getScheduleByDay = (day: string) => {
    return schedule.filter((slot) => slot.day === day);
  };

  // UPDATE
  const updateSchedule = (id: number, updatedSlot: Partial<ScheduleSlot>) => {
    setSchedule(
      schedule.map((slot) =>
        slot.id === id ? { ...slot, ...updatedSlot } : slot
      )
    );
  };

  // DELETE
  const deleteSchedule = (id: number) => {
    setSchedule(schedule.filter((slot) => slot.id !== id));
  };

  // Get all unique days
  const getDays = () => {
    return Array.from(new Set(schedule.map(slot => slot.day)));
  };

  // Get schedule grouped by day
  const getGroupedSchedule = () => {
    const days = getDays();
    return days.map(day => ({
      day,
      slots: getScheduleByDay(day),
    }));
  };

  return {
    schedule,
    addSchedule,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
    getGroupedSchedule,
    getDays,
  };
}