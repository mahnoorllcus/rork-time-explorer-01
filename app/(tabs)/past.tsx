import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Clock, Calendar, Info, Sparkles } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { TimeSlider } from "@/components/TimeSlider";
import { useTimeExplorer } from "@/providers/TimeExplorerProvider";
import { landmarks } from "@/data/landmarks";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function PastViewScreen() {
  const { selectedYear, setSelectedYear, addToHistory } = useTimeExplorer();
  const [selectedLandmark, setSelectedLandmark] = useState(landmarks[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    setGeneratedImage(null);
    
    try {
      const yearDiff = 2025 - selectedYear;
      const eraDescription = yearDiff > 500 ? "ancient" : yearDiff > 200 ? "historical" : yearDiff > 100 ? "vintage" : "recent past";
      
      const prompt = `${selectedLandmark.name} in the year ${selectedYear}, ${eraDescription} period, historically accurate architecture and environment, photorealistic style`;
      
      const response = await fetch("https://toolkit.rork.com/images/generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          size: "1024x1024",
        }),
      });

      if (!response.ok) throw new Error("Failed to generate image");
      
      const data = await response.json();
      const imageUri = `data:${data.image.mimeType};base64,${data.image.base64Data}`;
      setGeneratedImage(imageUri);
      
      addToHistory({
        id: Date.now().toString(),
        landmarkId: selectedLandmark.id,
        landmarkName: selectedLandmark.name,
        year: selectedYear,
        type: "past",
        imageUri,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getEraInfo = () => {
    const yearDiff = 2025 - selectedYear;
    if (yearDiff > 1000) return { era: "Ancient Times", description: "Dawn of civilizations" };
    if (yearDiff > 500) return { era: "Medieval Period", description: "Age of kingdoms and empires" };
    if (yearDiff > 200) return { era: "Early Modern", description: "Renaissance and exploration" };
    if (yearDiff > 100) return { era: "Industrial Age", description: "Steam, steel, and progress" };
    if (yearDiff > 50) return { era: "Modern Era", description: "Technology revolution begins" };
    return { era: "Recent Past", description: "Digital age emergence" };
  };

  const eraInfo = getEraInfo();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Travel to the Past</Text>
          <Text style={styles.subtitle}>Explore history through time</Text>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.yearDisplay}>
            <Clock color={colors.primary} size={24} />
            <Text style={styles.yearText}>{selectedYear}</Text>
            <View style={styles.eraBadge}>
              <Text style={styles.eraText}>{eraInfo.era}</Text>
            </View>
          </View>

          <Text style={styles.eraDescription}>{eraInfo.description}</Text>

          <TimeSlider
            minYear={1000}
            maxYear={2024}
            currentYear={selectedYear}
            onYearChange={setSelectedYear}
            isPast={true}
          />

          <View style={styles.landmarkSection}>
            <Text style={styles.sectionTitle}>Select Location</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.landmarkScroll}
            >
              {landmarks.map((landmark) => (
                <TouchableOpacity
                  key={landmark.id}
                  style={[
                    styles.landmarkCard,
                    selectedLandmark.id === landmark.id && styles.selectedLandmark,
                  ]}
                  onPress={() => setSelectedLandmark(landmark)}
                >
                  <Image source={{ uri: landmark.imageUrl }} style={styles.landmarkImage} />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    style={styles.landmarkGradient}
                  />
                  <Text style={styles.landmarkName}>{landmark.name}</Text>
                  <Text style={styles.landmarkLocation}>{landmark.location}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity 
            style={styles.generateButton}
            onPress={handleGenerateImage}
            disabled={isGenerating}
          >
            <LinearGradient
              colors={[colors.primary, colors.accent]}
              style={styles.generateGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {isGenerating ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Sparkles color="white" size={20} />
                  <Text style={styles.generateText}>Generate Time View</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {generatedImage && (
            <View style={styles.resultSection}>
              <Text style={styles.resultTitle}>
                {selectedLandmark.name} in {selectedYear}
              </Text>
              <Image source={{ uri: generatedImage }} style={styles.generatedImage} />
              <View style={styles.infoCard}>
                <Info color={colors.primary} size={16} />
                <Text style={styles.infoText}>
                  This AI-generated visualization shows how {selectedLandmark.name} might have appeared in {selectedYear}.
                </Text>
              </View>
            </View>
          )}

          <View style={styles.historicalFacts}>
            <Text style={styles.factsTitle}>Historical Context</Text>
            {selectedLandmark.historicalFacts.map((fact, index) => (
              <View key={index} style={styles.factCard}>
                <Calendar color={colors.accent} size={16} />
                <Text style={styles.factText}>{fact}</Text>
              </View>
            ))}
          </View>
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
  scrollContent: {
    paddingBottom: 30,
  },
  yearDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    gap: 12,
  },
  yearText: {
    fontSize: 48,
    fontWeight: "bold" as const,
    color: colors.primary,
  },
  eraBadge: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eraText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: "600" as const,
  },
  eraDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  landmarkSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: colors.text,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  landmarkScroll: {
    paddingLeft: 20,
  },
  landmarkCard: {
    width: 150,
    height: 200,
    marginRight: 15,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedLandmark: {
    borderColor: colors.primary,
  },
  landmarkImage: {
    width: "100%",
    height: "100%",
  },
  landmarkGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  landmarkName: {
    position: "absolute",
    bottom: 25,
    left: 10,
    right: 10,
    fontSize: 14,
    fontWeight: "bold" as const,
    color: "white",
  },
  landmarkLocation: {
    position: "absolute",
    bottom: 8,
    left: 10,
    right: 10,
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
  },
  generateButton: {
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  generateGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    gap: 10,
  },
  generateText: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: "white",
  },
  resultSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: colors.text,
    marginBottom: 15,
    textAlign: "center",
  },
  generatedImage: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    marginBottom: 15,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 12,
    gap: 10,
    alignItems: "flex-start",
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  historicalFacts: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  factsTitle: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: colors.text,
    marginBottom: 15,
  },
  factCard: {
    flexDirection: "row",
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
    alignItems: "flex-start",
  },
  factText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});