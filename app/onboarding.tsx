import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Clock, Compass, Camera, ChevronRight } from "lucide-react-native";
import { colors } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const onboardingSteps = [
  {
    icon: Clock,
    title: "Travel Through Time",
    description: "Explore how cities and landmarks looked hundreds of years ago",
    gradient: [colors.gradientStart, colors.gradientMiddle],
  },
  {
    icon: Compass,
    title: "Glimpse the Future",
    description: "See AI-powered visions of how places might evolve in coming centuries",
    gradient: [colors.futureDark, colors.futureMid],
  },
  {
    icon: Camera,
    title: "AR Time Machine",
    description: "Point your camera at landmarks to see their past and future instantly",
    gradient: [colors.primary, colors.accent],
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    router.replace("/");
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={step.gradient}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity onPress={completeOnboarding} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.iconContainer}>
            <Icon color="white" size={80} />
          </View>
          
          <Text style={styles.title}>{step.title}</Text>
          <Text style={styles.description}>{step.description}</Text>
        </Animated.View>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {onboardingSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentStep && styles.activeDot,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <LinearGradient
              colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
              style={styles.nextGradient}
            >
              <Text style={styles.nextText}>
                {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
              </Text>
              <ChevronRight color="white" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  skipButton: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 160,
    height: 160,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold" as const,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 26,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  activeDot: {
    width: 24,
    backgroundColor: "white",
  },
  nextButton: {
    borderRadius: 15,
    overflow: "hidden",
  },
  nextGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    gap: 8,
  },
  nextText: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: "white",
  },
});