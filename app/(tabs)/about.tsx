import { COLORS } from '@/utils/colors';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <View style={styles.appIconContainer}>
            <View style={styles.appIcon}>
              <MaterialIcons name="school" size={56} color="#FFF" />
            </View>
            <View style={styles.iconGlow} />
          </View>
          <Text style={styles.appName}>Study Planner</Text>
          <Text style={styles.appTagline}>Your Academic Success Companion</Text>
  
        </View>

        {/* Purpose Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: COLORS.primaryLight + '20' }]}>
              <Ionicons name="bulb" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.sectionTitle}>Purpose</Text>
          </View>
          <Text style={styles.text}>
            Study Planner is designed to help students stay organized and achieve academic success. 
            Track your assignments with color-coded categories, manage weekly class schedules, and 
            never miss a deadline again. Built with students in mind, for students by students.
          </Text>
        </View>

        {/* Features Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: COLORS.successLight + '20' }]}>
              <Ionicons name="star" size={24} color={COLORS.success} />
            </View>
            <Text style={styles.sectionTitle}>Key Features</Text>
          </View>
          
          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: COLORS.examLight }]}>
              <MaterialCommunityIcons name="clipboard-check" size={20} color={COLORS.exam} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Smart Task Management</Text>
              <Text style={styles.featureText}>Track homework, exams, and projects with ease</Text>
            </View>
          </View>

          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: COLORS.projectLight }]}>
              <MaterialCommunityIcons name="palette" size={20} color={COLORS.project} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Color-Coded Organization</Text>
              <Text style={styles.featureText}>Instantly identify task types at a glance</Text>
            </View>
          </View>

          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: COLORS.homeworkLight }]}>
              <MaterialCommunityIcons name="calendar-clock" size={20} color={COLORS.homework} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Weekly Schedule View</Text>
              <Text style={styles.featureText}>See your entire week's classes in one place</Text>
            </View>
          </View>

          <View style={styles.feature}>
            <View style={[styles.featureIcon, { backgroundColor: COLORS.successLight }]}>
              <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.success} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Progress Tracking</Text>
              <Text style={styles.featureText}>Mark tasks complete and track your progress</Text>
            </View>
          </View>
        </View>

        {/* Team Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.cardIcon, { backgroundColor: COLORS.secondaryLight + '20' }]}>
              <Ionicons name="people" size={24} color={COLORS.secondary} />
            </View>
            <Text style={styles.sectionTitle}>Group 5 Team</Text>
          </View>

          <View style={styles.teamMember}>
            <View style={[styles.memberAvatar, { backgroundColor: COLORS.primaryLight + '30' }]}>
              <Text style={styles.memberInitial}>AU</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Al-Asraff Usman</Text>
              <Text style={styles.memberRole}>Developer</Text>
            </View>
          </View>

          <View style={styles.teamMember}>
            <View style={[styles.memberAvatar, { backgroundColor: COLORS.successLight + '30' }]}>
              <Text style={styles.memberInitial}>SA</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Salman Alih</Text>
              <Text style={styles.memberRole}>Developer</Text>
            </View>
          </View>

          <View style={styles.teamMember}>
            <View style={[styles.memberAvatar, { backgroundColor: COLORS.warningLight + '30' }]}>
              <Text style={styles.memberInitial}>FC</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Fairudz Calvi</Text>
              <Text style={styles.memberRole}>Developer</Text>
            </View>
          </View>

          <View style={styles.teamMember}>
            <View style={[styles.memberAvatar, { backgroundColor: COLORS.dangerLight + '30' }]}>
              <Text style={styles.memberInitial}>RS</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Ridzwan Sampang</Text>
              <Text style={styles.memberRole}>Developer</Text>
            </View>
          </View>
          <View style={styles.teamMember}>
            <View style={[styles.memberAvatar, { backgroundColor: COLORS.successLight + '30' }]}>
              <Text style={styles.memberInitial}>MZ</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>Maria Victoria Jean Zambales</Text>
              <Text style={styles.memberRole}>UI Designer</Text>
            </View>
          </View>
        </View>

        

          

      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  heroCard: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  appIconContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  appIcon: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  iconGlow: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    opacity: 0.2,
    transform: [{ scale: 1.1 }],
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
  },
  appTagline: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  versionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  card: {
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  roadmapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  roadmapDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  roadmapText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});