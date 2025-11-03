import { DAYS_OF_WEEK, SUBJECT_COLORS } from '@/constants/data';
import { DayOfWeek, ScheduleFormData, TimeSlot } from '@/types';
import { COLORS } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface ScheduleFormProps {
  initialData?: TimeSlot;
  onSubmit: (data: ScheduleFormData) => void;
  onCancel?: () => void;
  submitButtonText?: string;
}

export default function ScheduleForm({
  initialData,
  onSubmit,
  onCancel,
  submitButtonText = 'Add Class'
}: ScheduleFormProps) {
  const [formData, setFormData] = useState<ScheduleFormData>({
    time: initialData?.time || '',
    subject: initialData?.subject || '',
    room: initialData?.room || '',
    color: initialData?.color || COLORS.primary,
    day: initialData?.day || 'Monday',
  });

  const [errors, setErrors] = useState<Partial<ScheduleFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ScheduleFormData> = {};
    if (!formData.time.trim()) newErrors.time = 'Time is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.room.trim()) newErrors.room = 'Room is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) onSubmit(formData);
  };

  const popularSubjects = Object.keys(SUBJECT_COLORS);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Day Selection */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Day of Week</Text>
        <View style={styles.daysContainer}>
          {DAYS_OF_WEEK.map((day) => (
            <TouchableOpacity
              key={day.value}
              style={[
                styles.dayButton,
                formData.day === day.value && [
                  styles.dayButtonSelected,
                  { backgroundColor: COLORS.primary + '20', borderColor: COLORS.primary }
                ]
              ]}
              onPress={() => setFormData({ ...formData, day: day.value as DayOfWeek })}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  { color: formData.day === day.value ? COLORS.primary : COLORS.textSecondary }
                ]}
              >
                {day.label.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Time Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Class Time *</Text>
        <TextInput
          style={[styles.input, errors.time && styles.inputError]}
          placeholder="e.g., 9:00 AM, 2:30 PM"
          placeholderTextColor={COLORS.textLight}
          value={formData.time}
          onChangeText={(text) => setFormData({ ...formData, time: text })}
        />
        {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
      </View>

      {/* Subject Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Subject *</Text>
        <TextInput
          style={[styles.input, errors.subject && styles.inputError]}
          placeholder="e.g., App Dev, System Integration"
          placeholderTextColor={COLORS.textLight}
          value={formData.subject}
          onChangeText={(text) => setFormData({ ...formData, subject: text })}
        />
        {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}

        {/* Quick Select */}
        <Text style={styles.quickSelectLabel}>Quick Select:</Text>
        <View style={styles.quickSelectContainer}>
          {popularSubjects.slice(0, 6).map((subject) => (
            <TouchableOpacity
              key={subject}
              style={[
                styles.subjectChip,
                {
                  backgroundColor:
                    formData.subject === subject
                      ? SUBJECT_COLORS[subject as keyof typeof SUBJECT_COLORS] + '20'
                      : COLORS.card,
                  borderColor: SUBJECT_COLORS[subject as keyof typeof SUBJECT_COLORS],
                }
              ]}
              onPress={() =>
                setFormData({
                  ...formData,
                  subject,
                  color: SUBJECT_COLORS[subject as keyof typeof SUBJECT_COLORS] || COLORS.primary,
                })
              }
            >
              <Text
                style={[
                  styles.subjectChipText,
                  { color: SUBJECT_COLORS[subject as keyof typeof SUBJECT_COLORS] || COLORS.text },
                ]}
              >
                {subject}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Room Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Room/Location *</Text>
        <TextInput
          style={[styles.input, errors.room && styles.inputError]}
          placeholder="e.g., LR 1, LAB 3, LR 6"
          placeholderTextColor={COLORS.textLight}
          value={formData.room}
          onChangeText={(text) => setFormData({ ...formData, room: text })}
        />
        {errors.room && <Text style={styles.errorText}>{errors.room}</Text>}
      </View>

      {/* Color Selection */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Color Theme</Text>
        <View style={styles.colorsContainer}>
          {Object.entries(SUBJECT_COLORS).slice(0, 8).map(([subject, color]) => (
            <TouchableOpacity
              key={subject}
              style={[
                styles.colorButton,
                { backgroundColor: color },
                formData.color === color && styles.colorButtonSelected,
              ]}
              onPress={() => setFormData({ ...formData, color })}
            >
              {formData.color === color && (
                <Ionicons name="checkmark" size={16} color="#FFF" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        {onCancel && (
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
          <Ionicons name="add-circle" size={22} color="#FFF" />
          <Text style={styles.submitButtonText}>{submitButtonText}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 14,
    marginTop: 4,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayButton: {
    flexBasis: '30%',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    alignItems: 'center',
  },
  dayButtonSelected: {
    borderWidth: 2,
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickSelectLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 12,
    marginBottom: 8,
  },
  quickSelectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  subjectChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  colorButtonSelected: {
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
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
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});
