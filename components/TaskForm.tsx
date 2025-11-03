import { PRIORITY_COLORS, TYPE_COLORS } from '@/constants/data';
import { Priority, Task, TaskFormData, TaskType } from '@/types';
import { COLORS } from '@/utils/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskFormData) => void;
  onCancel?: () => void;
  submitButtonText?: string;
}

export default function TaskForm({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText = 'Create Task',
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || '',
    type: initialData?.type || 'Homework',
    deadline: initialData?.deadline || '',
    notes: initialData?.notes || '',
    priority: initialData?.priority || 'medium',
  });

  const [errors, setErrors] = useState<Partial<TaskFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<TaskFormData> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.deadline.trim()) newErrors.deadline = 'Deadline is required';
    if (!formData.notes.trim()) newErrors.notes = 'Notes are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const taskTypes: TaskType[] = ['Homework', 'Exam', 'Project'];
  const priorities: Priority[] = ['high', 'medium', 'low'];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Task Title *</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Enter task title..."
            placeholderTextColor={COLORS.textLight}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        {/* Task Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Task Type</Text>
          <View style={styles.rowContainer}>
            {taskTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  formData.type === type && {
                    backgroundColor: TYPE_COLORS[type] + '20',
                    borderColor: TYPE_COLORS[type],
                  },
                ]}
                onPress={() => setFormData({ ...formData, type })}
              >
                <MaterialCommunityIcons
                  name={
                    type === 'Exam'
                      ? 'file-document'
                      : type === 'Project'
                      ? 'briefcase'
                      : 'pencil'
                  }
                  size={20}
                  color={
                    formData.type === type
                      ? TYPE_COLORS[type]
                      : COLORS.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    {
                      color:
                        formData.type === type
                          ? TYPE_COLORS[type]
                          : COLORS.textSecondary,
                    },
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Priority */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.rowContainer}>
            {priorities.map((priority) => (
              <TouchableOpacity
                key={priority}
                style={[
                  styles.priorityButton,
                  formData.priority === priority && {
                    borderColor: PRIORITY_COLORS[priority],
                    backgroundColor: COLORS.background,
                  },
                ]}
                onPress={() => setFormData({ ...formData, priority })}
              >
                <Ionicons
                  name="flag"
                  size={16}
                  color={
                    formData.priority === priority
                      ? PRIORITY_COLORS[priority]
                      : COLORS.textLight
                  }
                />
                <Text
                  style={[
                    styles.priorityButtonText,
                    {
                      color:
                        formData.priority === priority
                          ? PRIORITY_COLORS[priority]
                          : COLORS.textLight,
                      textTransform: 'capitalize',
                    },
                  ]}
                >
                  {priority}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Deadline */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Deadline *</Text>
          <TextInput
            style={[styles.input, errors.deadline && styles.inputError]}
            placeholder="e.g., Nov 15, 2025"
            placeholderTextColor={COLORS.textLight}
            value={formData.deadline}
            onChangeText={(text) =>
              setFormData({ ...formData, deadline: text })
            }
          />
          {errors.deadline && (
            <Text style={styles.errorText}>{errors.deadline}</Text>
          )}
        </View>

        {/* Notes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes *</Text>
          <TextInput
            style={[styles.textArea, errors.notes && styles.inputError]}
            placeholder="Enter task details or notes..."
            placeholderTextColor={COLORS.textLight}
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          {errors.notes && <Text style={styles.errorText}>{errors.notes}</Text>}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {onCancel && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Ionicons name="checkmark-circle" size={22} color="#FFF" />
            <Text style={styles.submitButtonText}>{submitButtonText}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  inputGroup: {
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  textArea: {
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
    minHeight: 120,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 14,
    marginTop: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
    marginBottom: 50,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
  },
  cancelButton: {
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});
