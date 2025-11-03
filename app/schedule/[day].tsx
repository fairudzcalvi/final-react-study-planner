import { DayOfWeek } from '@/types';
import { COLORS } from '@/utils/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScheduleContext } from '../_layout';

export default function DayScheduleScreen() {
  const { day } = useLocalSearchParams<{ day: string }>();
  const router = useRouter();
  const context = useContext(ScheduleContext);

  if (!context) return null;

  const { schedule, deleteTimeSlot, getTimeSlotsByDay } = context;
  
  const daySchedule = schedule.find(d => d.day === day);
  const timeSlots = getTimeSlotsByDay(day as DayOfWeek);

  const handleDeleteTimeSlot = (timeSlotId: string, subject: string) => {
    Alert.alert(
      'Remove Class',
      `Are you sure you want to remove "${subject}" from your schedule?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            deleteTimeSlot(timeSlotId);
          }
        },
      ]
    );
  };

  const handleEditTimeSlot = (timeSlotId: string) => {
    router.push(`/schedule/create?id=${timeSlotId}`);
  };

  if (!daySchedule && timeSlots.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <MaterialIcons name="event-busy" size={80} color={COLORS.border} />
          <Text style={styles.emptyText}>No classes scheduled</Text>
          <Text style={styles.emptySubtext}>Add classes to {day}'s schedule</Text>
          
          <TouchableOpacity 
            style={styles.addFirstClassButton}
            onPress={() => router.push(`/schedule/create?day=${day}`)}
          >
            <Ionicons name="add-circle" size={22} color="#FFF" />
            <Text style={styles.addFirstClassText}>Add First Class</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MaterialIcons name="event" size={32} color={COLORS.primary} />
            <Text style={styles.dayTitle}>{day}</Text>
            <View style={styles.classCountBadge}>
              <Text style={styles.classCount}>{timeSlots.length}</Text>
              <Text style={styles.classCountLabel}>classes</Text>
            </View>
          </View>
        </View>

        {/* Time Slots */}
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot, index) => (
            <View key={slot.id} style={styles.timeSlotCard}>
              {/* Color Indicator */}
              <View style={[styles.colorIndicator, { backgroundColor: slot.color }]} />
              
              <View style={styles.timeSlotContent}>
                <View style={styles.timeSlotHeader}>
                  <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={18} color={COLORS.primary} />
                    <Text style={styles.timeText}>{slot.time}</Text>
                  </View>
                  
                  <View style={styles.actions}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleEditTimeSlot(slot.id)}
                    >
                      <Ionicons name="create-outline" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleDeleteTimeSlot(slot.id, slot.subject)}
                    >
                      <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.subjectText}>{slot.subject}</Text>
                
                <View style={styles.roomRow}>
                  <Ionicons name="location-outline" size={16} color={COLORS.textLight} />
                  <Text style={styles.roomText}>{slot.room}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Add More Button */}
        <TouchableOpacity 
          style={styles.addMoreButton}
          onPress={() => router.push(`/schedule/create?day=${day}`)}
        >
          <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
          <Text style={styles.addMoreText}>Add Another Class</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  classCountBadge: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight + '20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  classCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  classCountLabel: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 2,
  },
  timeSlotsContainer: {
    padding: 16,
  },
  timeSlotCard: {
    backgroundColor: COLORS.card,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  colorIndicator: {
    width: 6,
  },
  timeSlotContent: {
    flex: 1,
    padding: 16,
  },
  timeSlotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roomText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 32,
  },
  addFirstClassButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addFirstClassText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  addMoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  bottomPadding: {
    height: 32,
  },
});