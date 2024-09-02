import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { styled } from "nativewind";

const PulsatingDot = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000, // Slow down the animation to 1 second
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Return to original size
          duration: 1000, // Slow down the animation to 1 second
          useNativeDriver: true,
        }),
      ]).start(() => pulse()); // Repeat the animation
    };

    pulse();
  }, [scaleAnim]);

  return (
    <View className="flex justify-center items-center">
      <Animated.View
        style={{ transform: [{ scale: scaleAnim }] }}
        className="w-4 h-4 rounded-xl bg-red-500 mr-2"
      />
    </View>
  );
};

export default PulsatingDot;
