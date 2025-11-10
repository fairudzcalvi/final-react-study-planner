import ScheduleCard from '@/components/ScheduleCard';
import { COLORS } from '@/utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { ScheduleContext } from '../_layout';

export default function ScheduleScreen() {
  const router = useRouter();
  const context = useContext(ScheduleContext);

  if (!context) return null;

  const { schedule } = context;
  
  const totalClasses = schedule.reduce((sum, day) => sum + day.slots.length, 0);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = schedule.find(day => day.day === today);
  const todayClassesCount = todaySchedule ? todaySchedule.slots.length : 0;

  return (
    <View style={styles.container}>
      {/* Overview Section */}
      <View style={styles.overviewContainer}>
        <View style={styles.overviewCard}>
          <View style={[styles.overviewIcon, { backgroundColor: COLORS.primary + '20' }]}>
            <Ionicons name="calendar" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.overviewTextContainer}>
            <Text style={styles.overviewNumber}>{schedule.length}</Text>
            <Text style={styles.overviewLabel}>School Days</Text>
          </View>
        </View>

        <View style={styles.overviewCard}>
          <View style={[styles.overviewIcon, { backgroundColor: COLORS.success + '20' }]}>
            <Ionicons name="book" size={20} color={COLORS.success} />
          </View>
          <View style={styles.overviewTextContainer}>
            <Text style={styles.overviewNumber}>{totalClasses}</Text>
            <Text style={styles.overviewLabel}>Total Classes</Text>
          </View>
        </View>

        <View style={styles.overviewCard}>
          <View style={[styles.overviewIcon, { backgroundColor: COLORS.warning + '20' }]}>
            <Ionicons name="today" size={20} color={COLORS.warning} />
          </View>
          <View style={styles.overviewTextContainer}>
            <Text style={styles.overviewNumber}>{todayClassesCount}</Text>
            <Text style={styles.overviewLabel}>Classes Today</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.weekLabel}>
            <Ionicons name="time" size={18} color={COLORS.textSecondary} />
            <Text style={styles.weekText}>Week Schedule</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/schedule/create')}
          >
            <Ionicons name="add" size={18} color={COLORS.primary} />
            <Text style={styles.addButtonText}>Add Class</Text>
          </TouchableOpacity>
        </View>
        
        {schedule.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="calendar-outline" size={80} color={COLORS.border} />
            </View>
            <Text style={styles.emptyText}>No schedule yet</Text>
            <Text style={styles.emptySubtext}>Add classes to create your weekly schedule</Text>
            
            <TouchableOpacity 
              style={styles.addFirstScheduleButton}
              onPress={() => router.push('/schedule/create')}
            >
              <Ionicons name="add-circle" size={22} color="#FFF" />
              <Text style={styles.addFirstScheduleText}>Create Your First Schedule</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {schedule.map((day, index) => (
              <ScheduleCard 
                key={index} 
                daySchedule={day} 
                onPress={() => router.push(`/schedule/${day.day}` as any)}
              />
            ))}
          </>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      {schedule.length > 0 && (
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => router.push('/schedule/create')}
        >
          <Ionicons name="add" size={28} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  overviewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  overviewCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: isSmallScreen ? 8 : 12,
    borderRadius: 12,
    minHeight: 80,
    justifyContent: 'center',
  },
  overviewIcon: {
    width: isSmallScreen ? 36 : 44,
    height: isSmallScreen ? 36 : 44,
    borderRadius: isSmallScreen ? 18 : 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  overviewTextContainer: {
    alignItems: 'center',
  },
  overviewNumber: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  overviewLabel: {
    fontSize: isSmallScreen ? 10 : 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  weekLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  weekText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primaryLight + '20',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 32,
  },
  addFirstScheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addFirstScheduleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});