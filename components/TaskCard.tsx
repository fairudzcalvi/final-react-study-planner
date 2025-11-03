import { PRIORITY_COLORS, TYPE_COLORS, TYPE_COLORS_LIGHT } from '@/constants/data';
import { Task } from '@/types';
import { COLORS } from '@/utils/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggleComplete: () => void;
}

export default function TaskCard({ task, onPress, onToggleComplete }: TaskCardProps) {
  const priorityIcon = {
    high: 'flag',
    medium: 'flag-outline',
    low: 'flag-outline',
  };

  return (
    <TouchableOpacity 
      style={[
        styles.card,
        task.completed && styles.cardCompleted,
      ]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      {/* Priority Indicator Strip */}
      {task.priority && !task.completed && (
        <View style={[styles.priorityStrip, { backgroundColor: PRIORITY_COLORS[task.priority] }]} />
      )}

      <View style={styles.cardContent}>
        <View style={styles.left}>
          <TouchableOpacity
            style={[styles.checkbox, task.completed && styles.checkboxChecked]}
            onPress={(e) => {
              e.stopPropagation();
              onToggleComplete();
            }}
          >
            {task.completed && <Ionicons name="checkmark" size={20} color="#FFF" />}
          </TouchableOpacity>

          <View style={styles.info}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, task.completed && styles.titleCompleted]} numberOfLines={2}>
                {task.title}
              </Text>
              {task.priority && !task.completed && (
                <Ionicons 
                  name={priorityIcon[task.priority] as any} 
                  size={16} 
                  color={PRIORITY_COLORS[task.priority]} 
                  style={styles.priorityIcon}
                />
              )}
            </View>
            
            <View style={styles.meta}>
              <View style={[
                styles.badge, 
                { 
                  backgroundColor: TYPE_COLORS_LIGHT[task.type],
                  borderWidth: 1,
                  borderColor: TYPE_COLORS[task.type],
                }
              ]}>
                <MaterialCommunityIcons 
                  name={task.type === 'Exam' ? 'file-document' : task.type === 'Project' ? 'briefcase' : 'pencil'} 
                  size={12} 
                  color={TYPE_COLORS[task.type]}
                />
                <Text style={[styles.badgeText, { color: TYPE_COLORS[task.type] }]}>
                  {task.type}
                </Text>
              </View>
              
              <View style={styles.deadlineRow}>
                <Ionicons name="calendar-outline" size={14} color={COLORS.textLight} />
                <Text style={styles.deadline}>{task.deadline}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.chevronContainer}>
          <Ionicons name="chevron-forward" size={22} color={COLORS.border} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  cardCompleted: {
    backgroundColor: COLORS.backgroundDark,
    opacity: 0.7,
  },
  priorityStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingLeft: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 14,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
  },
  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    lineHeight: 22,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
  priorityIcon: {
    marginTop: 2,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deadline: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  chevronContainer: {
    paddingLeft: 8,
  },
});