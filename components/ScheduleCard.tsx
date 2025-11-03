import { Colors } from '@/constants/Colors';
import { ScheduleSlot } from '@/hooks/useSchedule';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ScheduleCardProps {
  slot: ScheduleSlot;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ScheduleCard({ slot, onPress, onEdit, onDelete }: ScheduleCardProps) {
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'Lecture':
        return { bg: Colors.taskTypes.homework.bg, text: Colors.taskTypes.homework.text };
      case 'Lab':
        return { bg: Colors.taskTypes.project.bg, text: Colors.taskTypes.project.text };
      case 'Exam':
        return { bg: Colors.taskTypes.exam.bg, text: Colors.taskTypes.exam.text };
      case 'Tutorial':
        return { bg: '#f3e8ff', text: '#8b5cf6' };
      default:
        return { bg: Colors.background.secondary, text: Colors.text.primary };
    }
  };

  const typeStyle = getTypeStyle(slot.type);

  const handleDelete = () => {
    Alert.alert(
      'Delete Class',
      `Are you sure you want to delete "${slot.subject}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.info}>
          <View style={styles.header}>
            <Text style={styles.subject}>{slot.subject}</Text>
            <View style={[styles.typeBadge, { backgroundColor: typeStyle.bg }]}>
              <Text style={[styles.typeText, { color: typeStyle.text }]}>
                {slot.type}
              </Text>
            </View>
          </View>
          
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Ionicons name="business-outline" size={14} color={Colors.text.tertiary} />
              <Text style={styles.detailText}>{slot.room}</Text>
            </View>
            
            {slot.instructor && (
              <View style={styles.detailItem}>
                <Ionicons name="person-outline" size={14} color={Colors.text.tertiary} />
                <Text style={styles.detailText}>{slot.instructor}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>{slot.time}</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <Ionicons name="create-outline" size={18} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
              <Ionicons name="trash-outline" size={18} color={Colors.danger} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  subject: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  details: {
    gap: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: Colors.text.tertiary,
  },
  actions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  timeBadge: {
    backgroundColor: Colors.infoLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: Colors.background.secondary,
  },
});