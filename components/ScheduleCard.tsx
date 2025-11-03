import { DaySchedule } from '@/types';
import { COLORS } from '@/utils/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ScheduleCardProps {
  daySchedule: DaySchedule;
  onPress?: () => void;
}

export default function ScheduleCard({ daySchedule, onPress }: ScheduleCardProps) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const isToday = daySchedule.day === today;

  const CardContent = () => (
    <View style={[styles.card, isToday && styles.cardToday]}>
      <View style={[styles.header, isToday && styles.headerToday]}>
        <View style={styles.headerLeft}>
          <MaterialIcons 
            name="event" 
            size={24} 
            color={isToday ? COLORS.primary : COLORS.textSecondary} 
          />
          <Text style={[styles.dayTitle, isToday && styles.dayTitleToday]}>
            {daySchedule.day}
          </Text>
          {isToday && (
            <View style={styles.todayBadge}>
              <Text style={styles.todayText}>Today</Text>
            </View>
          )}
        </View>
        <View style={styles.slotCountBadge}>
          <Text style={styles.slotCount}>{daySchedule.slots.length}</Text>
        </View>
      </View>

      {daySchedule.slots.map((slot, index) => (
        <View key={slot.id} style={[
          styles.slot,
          index === daySchedule.slots.length - 1 && styles.slotLast
        ]}>
          <View style={[styles.colorIndicator, { backgroundColor: slot.color || COLORS.primary }]} />
          
          <View style={styles.slotLeft}>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={16} color={COLORS.primary} />
              <Text style={styles.timeText}>{slot.time}</Text>
            </View>
          </View>
          
          <View style={styles.slotRight}>
            <Text style={styles.subjectText}>{slot.subject}</Text>
            <View style={styles.roomRow}>
              <Ionicons name="location-outline" size={14} color={COLORS.textLight} />
              <Text style={styles.roomText}>{slot.room}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
}

// ... (keep the same styles as before)
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  cardToday: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.backgroundDark,
  },
  headerToday: {
    backgroundColor: COLORS.primaryLight + '15',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  dayTitleToday: {
    color: COLORS.primary,
  },
  todayBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  todayText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
  },
  slotCountBadge: {
    backgroundColor: COLORS.background,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  slot: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  slotLast: {
    borderBottomWidth: 0,
  },
  colorIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  slotLeft: {
    width: 100,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  slotRight: {
    flex: 1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roomText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});