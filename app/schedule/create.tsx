import ScheduleForm from '@/components/ScheduleForm';
import { ScheduleFormData } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Alert, View } from 'react-native';
import { ScheduleContext } from '../_layout';

export default function CreateScheduleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const context = useContext(ScheduleContext);

  if (!context) return null;

  const { addTimeSlot, updateTimeSlot, schedule } = context;

  // Check if we're editing an existing time slot
  const isEdit = params.id && params.id !== 'create';
  
  // Find existing time slot across all days
  let existingTimeSlot = undefined;
  if (isEdit) {
    for (const day of schedule) {
      const slot = day.slots.find(s => s.id === params.id);
      if (slot) {
        existingTimeSlot = slot;
        break;
      }
    }
  }

  const handleSubmit = (formData: ScheduleFormData) => {
    if (isEdit && existingTimeSlot) {
      // Update existing time slot
      updateTimeSlot(existingTimeSlot.id, formData);
      Alert.alert('Success', 'Class updated successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } else {
      // Create new time slot
      addTimeSlot(formData);
      Alert.alert('Success', 'Class added to schedule!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScheduleForm
        initialData={existingTimeSlot}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitButtonText={isEdit ? 'Update Class' : 'Add to Schedule'}
      />
    </View>
  );
}