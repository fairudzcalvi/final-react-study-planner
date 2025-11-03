import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DaySchedule } from '@/types';

interface ScheduleCardProps {
  daySchedule: DaySchedule;
}

export default function ScheduleCard({ daySchedule }: ScheduleCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialIcons name="event" size={22} color="#5C6BC0" />
        <Text style={styles.dayTitle}>{daySchedule.day}</Text>
        <Text style={styles.slotCount}>{daySchedule.slots.length} classes</Text>
      </View>

      {daySchedule.slots.map((slot, index) => (
        <View key={index} style={styles.slot}>
          <View style={styles.slotLeft}>
            <Text style={styles.timeText}>{slot.time}</Text>
          </View>
          <View style={styles.slotRight}>
            <Text style={styles.subjectText}>{slot.subject}</Text>
            <Text style={styles.roomText}>{slot.room}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  slotCount: {
    fontSize: 13,
    color: '#999',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  slot: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  slotLeft: {
    width: 90,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5C6BC0',
  },
  slotRight: {
    flex: 1,
  },
  subjectText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  roomText: {
    fontSize: 13,
    color: '#999',
  },
});