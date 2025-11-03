import { PRIORITY_COLORS, TYPE_COLORS, TYPE_COLORS_LIGHT } from '@/constants/data';
import { COLORS } from '@/utils/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TasksContext } from '../_layout';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const context = useContext(TasksContext);

  if (!context) return null;

  const { tasks, toggleTaskComplete, deleteTask } = context;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={COLORS.textLight} />
          <Text style={styles.errorText}>Task not found</Text>
        </View>
      </View>
    );
  }

  const priorityLabels = {
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority',
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            deleteTask(task.id);
            router.back();
          }
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push(`/task/create?id=${task.id}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, task.completed && styles.titleCompleted]}>
              {task.title}
            </Text>
            {task.completed && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={28} color={COLORS.success} />
              </View>
            )}
          </View>

          <View style={styles.badgesRow}>
            <View style={[
              styles.typeBadge, 
              { 
                backgroundColor: TYPE_COLORS_LIGHT[task.type],
                borderWidth: 1.5,
                borderColor: TYPE_COLORS[task.type],
              }
            ]}>
              <MaterialCommunityIcons 
                name={task.type === 'Exam' ? 'file-document' : task.type === 'Project' ? 'briefcase' : 'pencil'} 
                size={16} 
                color={TYPE_COLORS[task.type]}
              />
              <Text style={[styles.badgeText, { color: TYPE_COLORS[task.type] }]}>
                {task.type}
              </Text>
            </View>

            {task.priority && !task.completed && (
              <View style={[
                styles.priorityBadge,
                { borderColor: PRIORITY_COLORS[task.priority] }
              ]}>
                <Ionicons 
                  name="flag" 
                  size={14} 
                  color={PRIORITY_COLORS[task.priority]} 
                />
                <Text style={[styles.priorityText, { color: PRIORITY_COLORS[task.priority] }]}>
                  {priorityLabels[task.priority]}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={[styles.infoIcon, { backgroundColor: COLORS.primaryLight + '20' }]}>
              <Ionicons name="calendar" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Deadline</Text>
              <Text style={styles.infoValue}>{task.deadline}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={[styles.infoIcon, { backgroundColor: COLORS.successLight + '20' }]}>
              <Ionicons name="checkmark-done" size={22} color={COLORS.success} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={[
                styles.infoValue,
                { color: task.completed ? COLORS.success : COLORS.warning }
              ]}>
                {task.completed ? 'Completed' : 'In Progress'}
              </Text>
            </View>
          </View>
        </View>

        {/* Notes Card */}
        <View style={styles.notesCard}>
          <View style={styles.notesHeader}>
            <MaterialCommunityIcons name="text-box" size={22} color={COLORS.text} />
            <Text style={styles.notesTitle}>Notes</Text>
          </View>
          <Text style={styles.notesText}>{task.notes}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={handleEdit}
            activeOpacity={0.8}
          >
            <Ionicons name="create-outline" size={22} color={COLORS.primary} />
            <Text style={[styles.actionButtonText, { color: COLORS.primary }]}>
              Edit Task
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={22} color={COLORS.danger} />
            <Text style={[styles.actionButtonText, { color: COLORS.danger }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>

        {/* Complete Button */}
        <TouchableOpacity
          style={[styles.button, task.completed && styles.buttonCompleted]}
          onPress={() => {
            toggleTaskComplete(task.id);
            router.back();
          }}
          activeOpacity={0.8}
        >
          <Ionicons
            name={task.completed ? 'close-circle' : 'checkmark-circle'}
            size={26}
            color="#FFF"
          />
          <Text style={styles.buttonText}>
            {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          </Text>
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
  heroCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
    lineHeight: 34,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
  completedBadge: {
    marginLeft: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: COLORS.card,
  },
  priorityText: {
    fontSize: 13,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  infoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  notesCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  notesText: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
  },
  editButton: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.card,
  },
  deleteButton: {
    borderColor: COLORS.danger,
    backgroundColor: COLORS.card,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.success,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonCompleted: {
    backgroundColor: COLORS.warning,
    shadowColor: COLORS.warning,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginTop: 16,
  },
  bottomPadding: {
    height: 32,
  },
});