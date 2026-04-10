import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

export default function RestTimer({ seconds, color }) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const animValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    if (running) return;
    setTimeLeft(seconds);
    setRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          // Pulse animation when done
          Animated.sequence([
            Animated.timing(animValue, { toValue: 1.15, duration: 150, useNativeDriver: true }),
            Animated.timing(animValue, { toValue: 1, duration: 150, useNativeDriver: true }),
          ]).start();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const pct = running ? (timeLeft / seconds) * 100 : 100;

  return (
    <Animated.View style={{ transform: [{ scale: animValue }] }}>
      <TouchableOpacity onPress={startTimer} activeOpacity={0.7}>
        <View style={[styles.container, running && { borderColor: color + "44" }]}>
          {running && (
            <View
              style={[
                styles.progress,
                { width: `${pct}%`, backgroundColor: color + "33" },
              ]}
            />
          )}
          <Text style={[styles.text, running && { color: "#fff" }]}>
            {running ? `${timeLeft}s` : `⏱ ${seconds}s`}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    minWidth: 75,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  progress: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 8,
  },
  text: {
    fontSize: 13,
    fontFamily: "monospace",
    color: "rgba(255,255,255,0.5)",
  },
});
