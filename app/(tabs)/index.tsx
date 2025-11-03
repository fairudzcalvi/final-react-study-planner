import TaskCard from '@/components/TaskCard';
import { COLORS } from '@/utils/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TasksContext } from '../_layout';

export default function TasksScreen() {
  const router = useRouter();
  const context = useContext(TasksContext);

  if (!context) return null;

  const { tasks, toggleTaskComplete, deleteTask } = context;
  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  
  const completionPercentage = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100)
    : 0;

  return (
    <View style={styles.container}>
      {/* Enhanced Stats Header */}
      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: COLORS.primaryLight + '20' }]}>
              <Ionicons name="list" size={24} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.statNumber}>{activeTasks.length}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: COLORS.successLight + '20' }]}>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            </View>
            <View>
              <Text style={styles.statNumber}>{completedTasks.length}</Text>
              <Text style={styles.statLabel}>Done</Text>
            </View>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <View style={[styles.statIconContainer, { backgroundColor: COLORS.warningLight + '20' }]}>
              <MaterialCommunityIcons name="progress-clock" size={24} color={COLORS.warning} />
            </View>
            <View>
              <Text style={styles.statNumber}>{completionPercentage}%</Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        {tasks.length > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${completionPercentage}%`,
                    backgroundColor: completionPercentage === 100 ? COLORS.success : COLORS.primary 
                  }
                ]} 
              />
            </View>
            {completionPercentage === 100 && (
              <View style={styles.celebrationBadge}>
                <Ionicons name="trophy" size={16} color={COLORS.warning} />
                <Text style={styles.celebrationText}>All Done!</Text>
              </View>
            )}
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="checkmark-done-circle-outline" size={80} color={COLORS.border} />
            </View>
            <Text style={styles.emptyText}>No tasks yet</Text>
            <Text style={styles.emptySubtext}>Create your first task to get started</Text>
            
            {/* Add First Task Button */}
            <TouchableOpacity 
              style={styles.addFirstTaskButton}
              onPress={() => router.push('/task/create')}
            >
              <Ionicons name="add-circle" size={22} color="#FFF" />
              <Text style={styles.addFirstTaskText}>Create Your First Task</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {activeTasks.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleRow}>
                    <Ionicons name="time" size={20} color={COLORS.primary} />
                    <Text style={styles.sectionTitle}>Active Tasks</Text>
                  </View>
                  <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>{activeTasks.length}</Text>
                  </View>
                </View>
                {activeTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onPress={() => router.push(`/task/${task.id}`)}
                    onToggleComplete={() => toggleTaskComplete(task.id)}
                  />
                ))}
              </View>
            )}

            {completedTasks.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleRow}>
                    <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                    <Text style={styles.sectionTitle}>Completed</Text>
                  </View>
                  <View style={[styles.countBadge, { backgroundColor: COLORS.successLight + '30' }]}>
                    <Text style={[styles.countBadgeText, { color: COLORS.success }]}>
                      {completedTasks.length}
                    </Text>
                  </View>
                </View>
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onPress={() => router.push(`/task/${task.id}`)}
                    onToggleComplete={() => toggleTaskComplete(task.id)}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      {tasks.length > 0 && (
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => router.push('/task/create')}
        >
          <Ionicons name="add" size={28} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  statsContainer: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  celebrationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.warningLight + '30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'center',
  },
  celebrationText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.warning,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  countBadge: {
    backgroundColor: COLORS.primaryLight + '30',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 32,
    alignItems: 'center',
  },
  countBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
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
  addFirstTaskButton: {
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
  addFirstTaskText: {
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