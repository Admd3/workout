import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { WORKOUT_DATA } from "../data/workouts";

export default function DayTabs({ activeDay, onChangeDay, getDayProgress }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {WORKOUT_DATA.map((w, i) => {
        const progress = getDayProgress(i);
        const isActive = i === activeDay;
        return (
          <TouchableOpacity
            key={i}
            onPress={() => onChangeDay(i)}
            activeOpacity={0.7}
            style={[
              styles.tab,
              isActive && {
                borderColor: w.color,
                backgroundColor: w.color + "18",
              },
            ]}
          >
            <Text style={styles.icon}>{w.icon}</Text>
            <Text style={[styles.label, isActive && { color: "#fff" }]}>
              DAY {w.day}
            </Text>
            {progress > 0 && (
              <Text style={[styles.progress, { color: w.color }]}>
                {progress}%
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tab: {
    flex: 1,
    minWidth: 75,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    gap: 4,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: "rgba(255,255,255,0.4)",
  },
  progress: {
    fontSize: 10,
    fontFamily: "monospace",
  },
});
