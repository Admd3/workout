import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WORKOUT_DATA } from "./data/workouts";
import DayTabs from "./components/DayTabs";
import ExerciseCard from "./components/ExerciseCard";

const STORAGE_KEY = "@workout_completed";

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [completed, setCompleted] = useState({});
  const [expandedEx, setExpandedEx] = useState(null);

  // Load saved progress
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((val) => {
      if (val) setCompleted(JSON.parse(val));
    });
  }, []);

  // Save progress
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  const toggleComplete = useCallback((dayIdx, exIdx, setIdx) => {
    const key = `${dayIdx}-${exIdx}-${setIdx}`;
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const getDayProgress = useCallback(
    (dayIdx) => {
      const w = WORKOUT_DATA[dayIdx];
      const totalSets = w.exercises.reduce((a, e) => a + e.sets, 0);
      const done = w.exercises.reduce(
        (a, e, eIdx) =>
          a +
          Array.from({ length: e.sets }).filter(
            (_, sIdx) => completed[`${dayIdx}-${eIdx}-${sIdx}`]
          ).length,
        0
      );
      return totalSets > 0 ? Math.round((done / totalSets) * 100) : 0;
    },
    [completed]
  );

  const workout = WORKOUT_DATA[activeDay];

  const totalSetsToday = workout.exercises.reduce((a, e) => a + e.sets, 0);
  const completedToday = workout.exercises.reduce(
    (a, e, eIdx) =>
      a +
      Array.from({ length: e.sets }).filter(
        (_, sIdx) => completed[`${activeDay}-${eIdx}-${sIdx}`]
      ).length,
    0
  );

  const handleChangeDay = (i) => {
    setActiveDay(i);
    setExpandedEx(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0F" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: workout.color + "10",
              borderBottomColor: workout.color + "33",
            },
          ]}
        >
          <Text style={[styles.subtitle, { color: workout.color }]}>
            4-DAY SPLIT
          </Text>
          <Text style={styles.title}>
            {workout.icon} {workout.title}
          </Text>

          {/* Progress bar */}
          <View style={styles.progressRow}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(completedToday / totalSetsToday) * 100}%`,
                    backgroundColor: workout.color,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {completedToday}/{totalSetsToday}
            </Text>
          </View>
        </View>

        {/* Day tabs */}
        <DayTabs
          activeDay={activeDay}
          onChangeDay={handleChangeDay}
          getDayProgress={getDayProgress}
        />

        {/* Exercise list */}
        <View style={styles.exerciseList}>
          {workout.exercises.map((ex, eIdx) => (
            <ExerciseCard
              key={`${activeDay}-${eIdx}`}
              exercise={ex}
              index={eIdx}
              dayIndex={activeDay}
              color={workout.color}
              expanded={expandedEx === eIdx}
              onToggleExpand={() =>
                setExpandedEx(expandedEx === eIdx ? null : eIdx)
              }
              completed={completed}
              onToggleSet={toggleComplete}
            />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {completedToday === totalSetsToday && totalSetsToday > 0 ? (
            <Text style={[styles.doneText, { color: workout.color }]}>
              🎉 Workout Complete!
            </Text>
          ) : (
            <Text style={styles.hintText}>
              Tap an exercise to expand · Check off sets as you go
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0A0A0F",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 3,
    fontFamily: "monospace",
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    marginTop: 4,
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 13,
    fontFamily: "monospace",
    color: "rgba(255,255,255,0.5)",
  },
  exerciseList: {
    paddingHorizontal: 16,
  },
  footer: {
    paddingTop: 24,
    alignItems: "center",
  },
  doneText: {
    fontSize: 16,
    fontWeight: "700",
  },
  hintText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.2)",
    fontFamily: "monospace",
  },
});
