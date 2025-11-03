import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <View style={styles.appIcon}>
              <MaterialIcons name="school" size={48} color="#FFF" />
            </View>
            <Text style={styles.appName}>Study Planner</Text>
            <Text style={styles.appVersion}>Version 1.0</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Purpose</Text>
            <Text style={styles.text}>
              Study Planner helps students organize their assignments, track deadlines, and
              manage their weekly class schedule. Stay on top of your studies with color-coded
              task types and completion tracking.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Track homework, exams, and projects</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Color-coded task categories</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Weekly class schedule overview</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.featureText}>Mark tasks as complete/incomplete</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Group 5 Team</Text>
            <View style={styles.teamMember}>
              <Ionicons name="person-circle-outline" size={24} color="#5C6BC0" />
              <Text style={styles.memberName}>Alex Johnson - Project Lead</Text>
            </View>
            <View style={styles.teamMember}>
              <Ionicons name="person-circle-outline" size={24} color="#5C6BC0" />
              <Text style={styles.memberName}>Maria Garcia - UI Designer</Text>
            </View>
            <View style={styles.teamMember}>
              <Ionicons name="person-circle-outline" size={24} color="#5C6BC0" />
              <Text style={styles.memberName}>James Chen - Developer</Text>
            </View>
            <View style={styles.teamMember}>
              <Ionicons name="person-circle-outline" size={24} color="#5C6BC0" />
              <Text style={styles.memberName}>Sarah Williams - Tester</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Future Improvements</Text>
            <Text style={styles.text}>
              • Push notifications for upcoming deadlines{'\n'}
              • Add custom tasks and schedule items{'\n'}
              • Calendar integration{'\n'}
              • Study statistics and insights
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#5C6BC0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  memberName: {
    fontSize: 15,
    color: '#666',
  },
});