import { Colors } from '@/constants/Colors';
import { useTasks } from '@/hooks/useTasks';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getTaskById, toggleComplete, deleteTask } = useTasks();
  
  const task = getTaskById(Number(id));

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task?.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            deleteTask(Number(id));
            router.back();
          }
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push(`/add-task?id=${id}`);
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Task not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.errorLink}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const typeStyle = Colors.taskTypes[task.type.toLowerCase() as keyof typeof Colors.taskTypes];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        
        {/* Edit Button */}
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Task Title Card */}
        <View style={styles.titleCard}>
          <Text style={styles.taskTitle}>{task.title}</Text>

          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: typeStyle.bg }]}>
              <Text style={[styles.badgeText, { color: typeStyle.text }]}>
                {task.type}
              </Text>
            </View>

            <View
              style={[
                styles.badge,
                {
                  backgroundColor: task.completed ? Colors.infoLight : Colors.dangerLight,
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: task.completed ? Colors.info : Colors.danger },
                ]}
              >
                {task.completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
          </View>

          <View style={styles.deadline}>
            <Ionicons name="time-outline" size={20} color={Colors.text.secondary} />
            <Text style={styles.deadlineText}>Due: {task.deadline}</Text>
          </View>
        </View>

        {/* Notes Section */}
        <View style={styles.notesCard}>
          <View style={styles.notesHeader}>
            <Ionicons
              name="document-text-outline"
              size={22}
              color={Colors.text.secondary}
            />
            <Text style={styles.notesTitle}>Notes</Text>
          </View>
          <Text style={styles.notesText}>{task.notes}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => {
              toggleComplete(task.id);
              router.back();
            }}
            style={[
              styles.actionButton,
              { backgroundColor: task.completed ? Colors.text.tertiary : Colors.success },
            ]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={
                task.completed ? 'close-circle-outline' : 'checkmark-circle-outline'
              }
              size={22}
              color="#ffffff"
            />
            <Text style={styles.actionButtonText}>
              {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            style={[styles.actionButton, styles.deleteButton]}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={22} color="#ffffff" />
            <Text style={styles.actionButtonText}>Delete Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  editButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  titleCard: {
    backgroundColor: Colors.background.secondary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  badges: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  deadline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineText: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginLeft: 8,
    fontWeight: '500',
  },
  notesCard: {
    marginBottom: 20,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginLeft: 8,
  },
  notesText: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  deleteButton: {
    backgroundColor: Colors.danger,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  errorLink: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
});