import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import { colors } from "@/constants/colors";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 40;

interface TimeSliderProps {
  minYear: number;
  maxYear: number;
  currentYear: number;
  onYearChange: (year: number) => void;
  isPast: boolean;
}

export function TimeSlider({ minYear, maxYear, currentYear, onYearChange, isPast }: TimeSliderProps) {
  const pan = useRef(new Animated.Value(0)).current;
  const yearRange = maxYear - minYear;

  useEffect(() => {
    const position = ((currentYear - minYear) / yearRange) * SLIDER_WIDTH;
    pan.setValue(position);
  }, [currentYear, minYear, yearRange]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset(pan._value);
      },
      onPanResponderMove: (_, gestureState) => {
        const newValue = Math.max(0, Math.min(SLIDER_WIDTH, pan._offset + gestureState.dx));
        pan.setValue(newValue - pan._offset);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        const percentage = pan._value / SLIDER_WIDTH;
        const year = Math.round(minYear + percentage * yearRange);
        onYearChange(year);
      },
    })
  ).current;

  const getMarkers = () => {
    const markers = [];
    const step = yearRange > 1000 ? 500 : yearRange > 500 ? 100 : 50;
    
    for (let year = minYear; year <= maxYear; year += step) {
      const position = ((year - minYear) / yearRange) * SLIDER_WIDTH;
      markers.push(
        <View key={year} style={[styles.marker, { left: position }]}>
          <Text style={styles.markerText}>{year}</Text>
        </View>
      );
    }
    return markers;
  };

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View style={[styles.fill, { 
          backgroundColor: isPast ? colors.primary : colors.accent,
          width: `${((currentYear - minYear) / yearRange) * 100}%` 
        }]} />
        {getMarkers()}
      </View>
      
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX: pan }],
            backgroundColor: isPast ? colors.primary : colors.accent,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.thumbInner} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  track: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    position: "relative",
  },
  fill: {
    height: "100%",
    borderRadius: 2,
  },
  marker: {
    position: "absolute",
    top: 10,
    alignItems: "center",
  },
  markerText: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  thumb: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  thumbInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "white",
  },
});