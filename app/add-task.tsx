import { Colors } from '@/constants/Colors';
import { Task, useTasks } from '@/hooks/useTasks';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AddTaskScreen() {
  const { id } = useLocalSearchParams();
  const { getTaskById, addTask, updateTask } = useTasks();
  
  const isEditing = !!id;
  const existingTask = isEditing ? getTaskById(Number(id)) : null;

  const [formData, setFormData] = useState({
    title: '',
    type: 'Homework' as Task['type'],
    deadline: '',
    notes: '',
  });

  useEffect(() => {
    if (existingTask) {
      setFormData({
        title: existingTask.title,
        type: existingTask.type,
        deadline: existingTask.deadline,
        notes: existingTask.notes,
      });
    }
  }, [existingTask]);

  const handleSave = () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    if (!formData.deadline.trim()) {
      Alert.alert('Error', 'Please enter a deadline');
      return;
    }

    if (isEditing && existingTask) {
      updateTask(existingTask.id, formData);
      Alert.alert('Success', 'Task updated successfully!');
    } else {
      addTask({
        ...formData,
        completed: false,
      });
      Alert.alert('Success', 'Task created successfully!');
    }
    
    router.back();
  };

  const taskTypes: Task['type'][] = ['Homework', 'Project', 'Exam'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
          <Text style={styles.backText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Task' : 'Add New Task'}
        </Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Task Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Task Title *</Text>
          <TextInput
            placeholder="Enter task title..."
            placeholderTextColor={Colors.text.light}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            style={styles.textInput}
            multiline
          />
        </View>

        {/* Task Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Task Type</Text>
          <View style={styles.typeContainer}>
            {taskTypes.map((type) => {
              const typeStyle = Colors.taskTypes[type.toLowerCase() as keyof typeof Colors.taskTypes];
              const isSelected = formData.type === type;
              
              return (
                <TouchableOpacity
                  key={type}
                  onPress={() => setFormData({ ...formData, type })}
                  style={[
                    styles.typeButton,
                    { backgroundColor: typeStyle.bg },
                    isSelected && styles.typeButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.typeText,
                      { color: typeStyle.text },
                      isSelected && styles.typeTextSelected,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Deadline */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Deadline *</Text>
          <TextInput
            placeholder="e.g., Nov 15, 2025"
            placeholderTextColor={Colors.text.light}
            value={formData.deadline}
            onChangeText={(text) => setFormData({ ...formData, deadline: text })}
            style={styles.textInput}
          />
          <Text style={styles.helperText}>
            Enter deadline in any format (e.g., "Tomorrow", "Dec 25", "2025-12-25")
          </Text>
        </View>

        {/* Notes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            placeholder="Add any additional notes or details..."
            placeholderTextColor={Colors.text.light}
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            style={[styles.textInput, styles.notesInput]}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} style={styles.bottomSaveButton}>
          <Text style={styles.bottomSaveText}>
            {isEditing ? 'Update Task' : 'Create Task'}
          </Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  saveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  saveText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: Colors.text.primary,
  },
  notesInput: {
    minHeight: 100,
  },
  helperText: {
    fontSize: 13,
    color: Colors.text.tertiary,
    marginTop: 6,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeButtonSelected: {
    borderColor: Colors.primary,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  typeTextSelected: {
    fontWeight: '700',
  },
  bottomSaveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  bottomSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});