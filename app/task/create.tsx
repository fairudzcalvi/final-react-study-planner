import TaskForm from '@/components/TaskForm';
import { TaskFormData } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Alert, View } from 'react-native';
import { TasksContext } from '../_layout';

export default function CreateTaskScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const context = useContext(TasksContext);

  if (!context) return null;

  const { addTask, updateTask, tasks } = context;

  // Check if we're editing an existing task
  const isEdit = params.id && params.id !== 'create';
  const existingTask = isEdit ? tasks.find(t => t.id === params.id) : undefined;

  const handleSubmit = (formData: TaskFormData) => {
    if (isEdit && existingTask) {
      // Update existing task
      updateTask(existingTask.id, formData);
      Alert.alert('Success', 'Task updated successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } else {
      // Create new task
      addTask({
        ...formData,
        completed: false,
      });
      Alert.alert('Success', 'Task created successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <TaskForm
        initialData={existingTask}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitButtonText={isEdit ? 'Update Task' : 'Create Task'}
      />
    </View>
  );
}