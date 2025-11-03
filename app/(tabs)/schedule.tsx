import { ScrollView, StyleSheet, View } from 'react-native';
import { SCHEDULE_DATA } from '@/constants/data';
import ScheduleCard from '@/components/ScheduleCard';

export default function ScheduleScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {SCHEDULE_DATA.map((day, index) => (
          <ScheduleCard key={index} daySchedule={day} />
        ))}
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
    paddingTop: 12,
  },
});