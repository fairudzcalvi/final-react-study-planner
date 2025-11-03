import TaskCard from '@/components/TaskCard';
import { Colors } from '@/constants/Colors';
import { useTasks } from '@/hooks/useTasks';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TasksScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { tasks, toggleComplete, deleteTask } = useTasks();

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTaskPress = (taskId: number) => {
    router.push(`/task-detail?id=${taskId}`);
  };

  const handleAddTask = () => {
    router.push('/add-task');
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <Text style={styles.headerSubtitle}>
          {tasks.filter(task => !task.completed).length} pending tasks
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.text.tertiary}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search tasks..."
          placeholderTextColor={Colors.text.light}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        
        {/* Add Task Button */}
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={64} color={Colors.border} />
            <Text style={styles.emptyTitle}>No tasks found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? 'Try a different search' : 'Create your first task!'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity onPress={handleAddTask} style={styles.emptyAddButton}>
                <Text style={styles.emptyAddButtonText}>Add Task</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onPress={() => handleTaskPress(task.id)}
              onToggle={() => toggleComplete(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
            />
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
  searchContainer: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 32,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    paddingLeft: 40,
    paddingRight: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 12,
  },
  addButton: {
    backgroundColor: Colors.background.secondary,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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