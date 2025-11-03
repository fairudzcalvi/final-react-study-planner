import ScheduleCard from '@/components/ScheduleCard';
import { Colors } from '@/constants/Colors';
import { useSchedule } from '@/hooks/useSchedule';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ScheduleScreen() {
  const { getGroupedSchedule, deleteSchedule } = useSchedule();
  const [expandedDays, setExpandedDays] = useState<Set<string>>(
    new Set(['Monday', 'Tuesday', 'Wednesday'])
  );

  const groupedSchedule = getGroupedSchedule();

  const toggleDay = (day: string) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(day)) {
      newExpanded.delete(day);
    } else {
      newExpanded.add(day);
    }
    setExpandedDays(newExpanded);
  };

  const handleAddSchedule = () => {
    router.push('/add-schedule');
  };

  const handleSchedulePress = (slotId: number) => {
    router.push(`/schedule-detail?id=${slotId}`);
  };

  const handleEditSchedule = (slotId: number) => {
    router.push(`/add-schedule?id=${slotId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weekly Schedule</Text>
        <Text style={styles.headerSubtitle}>Your class timetable</Text>
      </View>

      {/* Add Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handleAddSchedule} style={styles.addButton}>
          <Ionicons name="add" size={24} color={Colors.primary} />
          <Text style={styles.addButtonText}>Add Class</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {groupedSchedule.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={Colors.border} />
            <Text style={styles.emptyTitle}>No classes scheduled</Text>
            <Text style={styles.emptySubtitle}>Add your first class to get started</Text>
            <TouchableOpacity onPress={handleAddSchedule} style={styles.emptyAddButton}>
              <Text style={styles.emptyAddButtonText}>Add Class</Text>
            </TouchableOpacity>
          </View>
        ) : (
          groupedSchedule.map(({ day, slots }) => (
            <View key={day} style={styles.daySection}>
              <TouchableOpacity 
                onPress={() => toggleDay(day)}
                style={styles.dayHeader}
                activeOpacity={0.7}
              >
                <Text style={styles.dayTitle}>{day}</Text>
                <Ionicons
                  name={expandedDays.has(day) ? 'chevron-down' : 'chevron-forward'}
                  size={20}
                  color={Colors.text.tertiary}
                />
              </TouchableOpacity>

              {expandedDays.has(day) && (
                <View style={styles.slotsContainer}>
                  {slots.map((slot) => (
                    <ScheduleCard
                      key={slot.id}
                      slot={slot}
                      onPress={() => handleSchedulePress(slot.id)}
                      onEdit={() => handleEditSchedule(slot.id)}
                      onDelete={() => deleteSchedule(slot.id)}
                    />
                  ))}
                  
                  {slots.length === 0 && (
                    <View style={styles.noClasses}>
                      <Text style={styles.noClassesText}>No classes scheduled</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.primaryLight,
  },
  addButtonContainer: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.secondary,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  daySection: {
    marginBottom: 20,
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  slotsContainer: {
    gap: 8,
  },
  noClasses: {
    alignItems: 'center',
    padding: 20,
  },
  noClassesText: {
    fontSize: 14,
    color: Colors.text.tertiary,
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    color: Colors.text.tertiary,
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.text.light,
    marginTop: 8,
    marginBottom: 20,
  },
  emptyAddButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyAddButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});