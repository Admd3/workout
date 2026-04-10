import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import RestTimer from "./RestTimer";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ExerciseCard({
  exercise,
  index,
  dayIndex,
  color,
  expanded,
  onToggleExpand,
  completed,
  onToggleSet,
}) {
  const setsCompleted = Array.from({ length: exercise.sets }).filter(
    (_, sIdx) => completed[`${dayIndex}-${index}-${sIdx}`]
  ).length;
  const allDone = setsCompleted === exercise.sets;

  const handleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggleExpand();
  };

  return (
    <View
      style={[
        styles.card,
        allDone && { backgroundColor: color + "12", borderColor: color + "44" },
      ]}
    >
      {/* Header */}
      <TouchableOpacity
        onPress={handleExpand}
        activeOpacity={0.7}
        style={styles.header}
      >
        <View
          style={[
            styles.numberBadge,
            allDone && { backgroundColor: color },
          ]}
        >
          <Text style={[styles.numberText, allDone && { color: "#fff" }]}>
            {allDone ? "✓" : index + 1}
          </Text>
        </View>

        <View style={styles.info}>
          <Text
            style={[
              styles.exerciseName,
              allDone && { textDecorationLine: "line-through", opacity: 0.5 },
            ]}
          >
            {exercise.name}
          </Text>
          <Text style={styles.meta}>
            {exercise.muscle} · {exercise.sets}×{exercise.reps}
          </Text>
        </View>

        <Text style={styles.setCount}>
          {setsCompleted}/{exercise.sets}
        </Text>

        <Text
          style={[
            styles.chevron,
            expanded && { transform: [{ rotate: "180deg" }] },
          ]}
        >
          ▼
        </Text>
      </TouchableOpacity>

      {/* Expanded sets */}
      {expanded && (
        <View style={styles.setsContainer}>
          <View style={styles.divider} />
          {Array.from({ length: exercise.sets }).map((_, sIdx) => {
            const key = `${dayIndex}-${index}-${sIdx}`;
            const done = completed[key];
            return (
              <View key={sIdx} style={styles.setRow}>
                <TouchableOpacity
                  onPress={() => onToggleSet(dayIndex, index, sIdx)}
                  activeOpacity={0.6}
                >
                  <View
                    style={[
                      styles.checkbox,
                      done && { backgroundColor: color, borderWidth: 0 },
                    ]}
                  >
                    {done && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>

                <Text
                  style={[
                    styles.setLabel,
                    done && {
                      color: "rgba(255,255,255,0.3)",
                      textDecorationLine: "line-through",
                    },
                  ]}
                >
                  Set {sIdx + 1} — {exercise.reps} reps
                </Text>

                {done && <RestTimer seconds={exercise.rest} color={color} />}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  numberBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255,255,255,0.3)",
  },
  info: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  meta: {
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    fontFamily: "monospace",
    marginTop: 2,
  },
  setCount: {
    fontSize: 12,
    color: "rgba(255,255,255,0.25)",
    fontFamily: "monospace",
  },
  chevron: {
    fontSize: 12,
    color: "rgba(255,255,255,0.2)",
  },
  setsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginBottom: 8,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  setLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: "monospace",
    color: "rgba(255,255,255,0.7)",
  },
});
