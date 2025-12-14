import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookOpen, Award, Brain, Lightbulb, ChevronRight, Lock } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { lessons, quizzes } from "@/data/educational";

const { width } = Dimensions.get("window");

export default function LearnScreen() {
  const [selectedTab, setSelectedTab] = useState<"lessons" | "quizzes">("lessons");
  const [userPoints, setUserPoints] = useState(250);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.background]}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Time Academy</Text>
            <Text style={styles.subtitle}>Learn about past & future</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Award color={colors.accent} size={20} />
            <Text style={styles.points}>{userPoints}</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "lessons" && styles.activeTab]}
            onPress={() => setSelectedTab("lessons")}
          >
            <BookOpen color={selectedTab === "lessons" ? "white" : colors.textSecondary} size={18} />
            <Text style={[styles.tabText, selectedTab === "lessons" && styles.activeTabText]}>
              Lessons
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === "quizzes" && styles.activeTab]}
            onPress={() => setSelectedTab("quizzes")}
          >
            <Brain color={selectedTab === "quizzes" ? "white" : colors.textSecondary} size={18} />
            <Text style={[styles.tabText, selectedTab === "quizzes" && styles.activeTabText]}>
              Quizzes
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {selectedTab === "lessons" ? (
            <>
              <View style={styles.featuredCard}>
                <LinearGradient
                  colors={[colors.primary, colors.accent]}
                  style={styles.featuredGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Lightbulb color="white" size={32} />
                  <View style={styles.featuredContent}>
                    <Text style={styles.featuredTitle}>Today's Discovery</Text>
                    <Text style={styles.featuredText}>
                      How climate change will reshape coastal cities by 2100
                    </Text>
                  </View>
                </LinearGradient>
              </View>

              {lessons.map((lesson) => (
                <TouchableOpacity key={lesson.id} style={styles.lessonCard}>
                  <View style={styles.lessonIcon}>
                    <BookOpen color={colors.primary} size={24} />
                  </View>
                  <View style={styles.lessonContent}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDescription}>{lesson.description}</Text>
                    <View style={styles.lessonMeta}>
                      <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                      <View style={styles.lessonDifficulty}>
                        <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
                      </View>
                    </View>
                  </View>
                  <ChevronRight color={colors.textSecondary} size={20} />
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              <View style={styles.quizHeader}>
                <Text style={styles.quizHeaderTitle}>Test Your Knowledge</Text>
                <Text style={styles.quizHeaderText}>
                  Complete quizzes to earn points and unlock premium content
                </Text>
              </View>

              {quizzes.map((quiz) => (
                <TouchableOpacity 
                  key={quiz.id} 
                  style={[styles.quizCard, quiz.locked && styles.lockedCard]}
                  disabled={quiz.locked}
                >
                  <View style={styles.quizIcon}>
                    {quiz.locked ? (
                      <Lock color={colors.textSecondary} size={24} />
                    ) : (
                      <Brain color={colors.accent} size={24} />
                    )}
                  </View>
                  <View style={styles.quizContent}>
                    <Text style={styles.quizTitle}>{quiz.title}</Text>
                    <Text style={styles.quizQuestions}>{quiz.questions} questions</Text>
                    <View style={styles.quizReward}>
                      <Award color={colors.accent} size={14} />
                      <Text style={styles.rewardText}>+{quiz.points} points</Text>
                    </View>
                  </View>
                  {quiz.locked ? (
                    <Text style={styles.unlockText}>Unlock at {quiz.requiredPoints} pts</Text>
                  ) : (
                    <View style={styles.startButton}>
                      <Text style={styles.startText}>Start</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold" as const,
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  points: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: colors.accent,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: "white",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  featuredCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  featuredGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 15,
  },
  featuredContent: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "white",
    marginBottom: 6,
  },
  featuredText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 20,
  },
  lessonCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lessonIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.background,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.text,
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 18,
  },
  lessonMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  lessonDuration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  lessonDifficulty: {
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  difficultyText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: "500" as const,
  },
  quizHeader: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  quizHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: colors.text,
    marginBottom: 6,
  },
  quizHeaderText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  quizCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lockedCard: {
    opacity: 0.6,
  },
  quizIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.background,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  quizContent: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.text,
    marginBottom: 4,
  },
  quizQuestions: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  quizReward: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rewardText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: "500" as const,
  },
  unlockText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  startButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "white",
  },
});