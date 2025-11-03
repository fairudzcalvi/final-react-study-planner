import { Colors } from '@/constants/Colors';
import { ScheduleSlot, useSchedule } from '@/hooks/useSchedule';
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

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CLASS_TYPES = ['Lecture', 'Lab', 'Tutorial', 'Exam'];

export default function AddScheduleScreen() {
  const { id } = useLocalSearchParams();
  const { getScheduleById, addSchedule, updateSchedule } = useSchedule();
  
  const isEditing = !!id;
  const existingSlot = isEditing ? getScheduleById(Number(id)) : null;

  const [formData, setFormData] = useState({
    subject: '',
    day: 'Monday',
    time: '',
    room: '',
    instructor: '',
    type: 'Lecture' as ScheduleSlot['type'],
  });

  useEffect(() => {
    if (existingSlot) {
      setFormData({
        subject: existingSlot.subject,
        day: existingSlot.day,
        time: existingSlot.time,
        room: existingSlot.room,
        instructor: existingSlot.instructor || '',
        type: existingSlot.type,
      });
    }
  }, [existingSlot]);

  const handleSave = () => {
    if (!formData.subject.trim()) {
      Alert.alert('Error', 'Please enter a subject name');
      return;
    }

    if (!formData.time.trim()) {
      Alert.alert('Error', 'Please enter class time');
      return;
    }

    if (!formData.room.trim()) {
      Alert.alert('Error', 'Please enter room number');
      return;
    }

    if (isEditing && existingSlot) {
      updateSchedule(existingSlot.id, formData);
      Alert.alert('Success', 'Class updated successfully!');
    } else {
      addSchedule(formData);
      Alert.alert('Success', 'Class added successfully!');
    }
    
    router.back();
  };

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
          {isEditing ? 'Edit Class' : 'Add New Class'}
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
        {/* Subject */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject Name *</Text>
          <TextInput
            placeholder="e.g., Mathematics, Physics..."
            placeholderTextColor={Colors.text.light}
            value={formData.subject}
            onChangeText={(text) => setFormData({ ...formData, subject: text })}
            style={styles.textInput}
          />
        </View>

        {/* Day Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Day</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.daysContainer}>
              {DAYS.map((day) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => setFormData({ ...formData, day })}
                  style={[
                    styles.dayButton,
                    formData.day === day && styles.dayButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      formData.day === day && styles.dayTextSelected,
                    ]}
                  >
                    {day.slice(0, 3)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Time */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Time *</Text>
          <TextInput
            placeholder="e.g., 8:00 AM, 2:30 PM..."
            placeholderTextColor={Colors.text.light}
            value={formData.time}
            onChangeText={(text) => setFormData({ ...formData, time: text })}
            style={styles.textInput}
          />
        </View>

        {/* Room */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Room *</Text>
          <TextInput
            placeholder="e.g., Room 201, Lab 3..."
            placeholderTextColor={Colors.text.light}
            value={formData.room}
            onChangeText={(text) => setFormData({ ...formData, room: text })}
            style={styles.textInput}
          />
        </View>

        {/* Instructor */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Instructor (Optional)</Text>
          <TextInput
            placeholder="e.g., Dr. Smith, Prof. Johnson..."
            placeholderTextColor={Colors.text.light}
            value={formData.instructor}
            onChangeText={(text) => setFormData({ ...formData, instructor: text })}
            style={styles.textInput}
          />
        </View>

        {/* Class Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Class Type</Text>
          <View style={styles.typesContainer}>
            {CLASS_TYPES.map((type) => {
              const typeStyle = getTypeStyle(type);
              const isSelected = formData.type === type;
              
              return (
                <TouchableOpacity
                  key={type}
                  onPress={() => setFormData({ ...formData, type: type as ScheduleSlot['type'] })}
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

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} style={styles.bottomSaveButton}>
          <Text style={styles.bottomSaveText}>
            {isEditing ? 'Update Class' : 'Add Class'}
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
  daysContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 60,
    alignItems: 'center',
  },
  dayButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  dayTextSelected: {
    color: '#ffffff',
  },
  typesContainer: {
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