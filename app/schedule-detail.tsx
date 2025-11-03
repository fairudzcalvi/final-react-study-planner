import { Colors } from '@/constants/Colors';
import { useSchedule } from '@/hooks/useSchedule';
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

export default function ScheduleDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getScheduleById, deleteSchedule } = useSchedule();
  
  const slot = getScheduleById(Number(id));

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

  const handleDelete = () => {
    Alert.alert(
      'Delete Class',
      `Are you sure you want to delete "${slot?.subject}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            deleteSchedule(Number(id));
            router.back();
          }
        },
      ]
    );
  };

  const handleEdit = () => {
    router.push(`/add-schedule?id=${id}`);
  };

  if (!slot) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Class not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.errorLink}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const typeStyle = getTypeStyle(slot.type);

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
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Class Details</Text>
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Subject Card */}
        <View style={styles.card}>
          <Text style={styles.subject}>{slot.subject}</Text>
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: typeStyle.bg }]}>
              <Text style={[styles.badgeText, { color: typeStyle.text }]}>
                {slot.type}
              </Text>
            </View>
            <View style={[styles.badge, styles.dayBadge]}>
              <Text style={styles.dayBadgeText}>{slot.day}</Text>
            </View>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Class Information</Text>
          
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={20} color={Colors.text.secondary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{slot.time}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="business-outline" size={20} color={Colors.text.secondary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Room</Text>
              <Text style={styles.detailValue}>{slot.room}</Text>
            </View>
          </View>

          {slot.instructor && (
            <View style={styles.detailItem}>
              <Ionicons name="person-outline" size={20} color={Colors.text.secondary} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Instructor</Text>
                <Text style={styles.detailValue}>{slot.instructor}</Text>
              </View>
            </View>
          )}

          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={20} color={Colors.text.secondary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Day</Text>
              <Text style={styles.detailValue}>{slot.day}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleEdit} style={styles.editActionButton}>
            <Ionicons name="create-outline" size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Edit Class</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            style={[styles.actionButton, styles.deleteButton]}
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>Delete Class</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
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
  card: {
    backgroundColor: Colors.background.secondary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  subject: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  badges: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  dayBadge: {
    backgroundColor: Colors.infoLight,
  },
  dayBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  detailsCard: {
    backgroundColor: Colors.background.secondary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.text.tertiary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  actionsContainer: {
    gap: 12,
  },
  editActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
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