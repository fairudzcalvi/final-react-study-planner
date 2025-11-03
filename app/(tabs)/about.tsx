import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const members = [
  'Maria Santos',
  'Juan Dela Cruz',
  'Sofia Rodriguez',
  'Carlos Gomez',
];

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>About</Text>
        <Text style={styles.headerSubtitle}>Study Planner v1.0</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Purpose */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="book" size={24} color={Colors.primary} />
            <Text style={styles.cardTitle}>What is Study Planner?</Text>
          </View>
          <Text style={styles.cardText}>
            Study Planner helps students organize their assignments, track
            deadlines, and manage their weekly class schedule. Keep all your
            tasks in one place and never miss a deadline again!
          </Text>
        </View>

        {/* Features */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
            <Text style={styles.cardTitle}>Features</Text>
          </View>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>
              • Track homework, projects, and exams
            </Text>
            <Text style={styles.featureItem}>• Mark tasks as complete</Text>
            <Text style={styles.featureItem}>
              • Color-coded task categories
            </Text>
            <Text style={styles.featureItem}>
              • View your weekly class schedule
            </Text>
            <Text style={styles.featureItem}>• Search and filter tasks</Text>
          </View>
        </View>

        {/* Group Members */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="people" size={24} color={Colors.primary} />
            <Text style={styles.cardTitle}>Group 5 Members</Text>
          </View>
          {members.map((member, index) => (
            <View key={index} style={styles.memberCard}>
              <Ionicons
                name="person-circle-outline"
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.memberName}>{member}</Text>
            </View>
          ))}
        </View>

        {/* Version Info */}
        <View style={styles.versionCard}>
          <Text style={styles.versionText}>
            Version 1.0 • Built with React Native & Expo
          </Text>
          <Text style={styles.versionDate}>November 2025</Text>
        </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginLeft: 10,
  },
  cardText: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
    marginLeft: 10,
  },
  versionCard: {
    backgroundColor: Colors.infoLight,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  versionDate: {
    fontSize: 13,
    color: '#748ffc',
    marginTop: 4,
  },
});