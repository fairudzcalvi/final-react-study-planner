import { Colors } from '@/constants/Colors';
import { Task } from '@/hooks/useTasks';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onPress, onToggle, onDelete }: TaskCardProps) {
  const typeStyle = Colors.taskTypes[task.type.toLowerCase() as keyof typeof Colors.taskTypes];

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete },
      ]
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, task.completed && styles.cardCompleted]}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Checkbox */}
        <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
          <Ionicons
            name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={28}
            color={task.completed ? Colors.success : Colors.border}
          />
        </TouchableOpacity>

        {/* Task Info */}
        <View style={styles.info}>
          <Text
            style={[styles.title, task.completed && styles.titleCompleted]}
            numberOfLines={2}
          >
            {task.title}
          </Text>

          <View style={styles.tags}>
            <View style={[styles.tag, { backgroundColor: typeStyle.bg }]}>
              <Text style={[styles.tagText, { color: typeStyle.text }]}>
                {task.type}
              </Text>
            </View>

            <View style={styles.deadline}>
              <Ionicons name="time-outline" size={14} color={Colors.text.tertiary} />
              <Text style={styles.deadlineText}>{task.deadline}</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={18} color={Colors.danger} />
          </TouchableOpacity>
          <Ionicons name="chevron-forward" size={20} color={Colors.border} />
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
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardCompleted: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.text.tertiary,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deadline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deadlineText: {
    fontSize: 13,
    color: Colors.text.tertiary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteButton: {
    padding: 4,
  },
});