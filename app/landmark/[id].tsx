import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { X, Clock, Compass, Camera, Info } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { landmarks } from "@/data/landmarks";
import { TimeSlider } from "@/components/TimeSlider";
import { useTimeExplorer } from "@/providers/TimeExplorerProvider";

const { width, height } = Dimensions.get("window");

export default function LandmarkDetailScreen() {
  const { id } = useLocalSearchParams();
  const landmark = landmarks.find(l => l.id === id);
  const { addToHistory } = useTimeExplorer();
  
  const [selectedYear, setSelectedYear] = useState(2025);
  const [viewMode, setViewMode] = useState<"past" | "future">("past");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  if (!landmark) {
    return (
      <View style={styles.container}>
        <Text>Landmark not found</Text>
      </View>
    );
  }

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    setGeneratedImage(null);
    
    try {
      const isPast = viewMode === "past";
      const yearDiff = isPast ? 2025 - selectedYear : selectedYear - 2025;
      
      let prompt = "";
      if (isPast) {
        const eraDescription = yearDiff > 500 ? "ancient" : yearDiff > 200 ? "historical" : yearDiff > 100 ? "vintage" : "recent past";
        prompt = `${landmark.name} in the year ${selectedYear}, ${eraDescription} period, historically accurate architecture and environment, photorealistic style`;
      } else {
        const futureDescription = yearDiff > 100 ? "far future" : yearDiff > 50 ? "advanced future" : "near future";
        prompt = `${landmark.name} in the year ${selectedYear}, ${futureDescription}, futuristic architecture, advanced technology, sustainable design, flying vehicles, holographic displays, photorealistic sci-fi style`;
      }
      
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
        landmarkId: landmark.id,
        landmarkName: landmark.name,
        year: selectedYear,
        type: viewMode,
        imageUri,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={viewMode === "past" 
          ? [colors.gradientStart, colors.gradientMiddle, colors.gradientEnd]
          : [colors.futureDark, colors.futureMid, colors.futureLight]
        }
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
            <X color="white" size={24} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.landmarkName}>{landmark.name}</Text>
            <Text style={styles.landmarkLocation}>{landmark.location}</Text>
          </View>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.imageContainer}>
            {generatedImage ? (
              <Image source={{ uri: generatedImage }} style={styles.mainImage} />
            ) : (
              <Image source={{ uri: landmark.imageUrl }} style={styles.mainImage} />
            )}
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.5)"]}
              style={styles.imageGradient}
            />
            {generatedImage && (
              <View style={styles.yearOverlay}>
                <Text style={styles.yearOverlayText}>{selectedYear}</Text>
              </View>
            )}
          </View>

          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[styles.modeButton, viewMode === "past" && styles.activeModeButton]}
              onPress={() => {
                setViewMode("past");
                setSelectedYear(1900);
                setGeneratedImage(null);
              }}
            >
              <Clock color={viewMode === "past" ? "white" : colors.textSecondary} size={18} />
              <Text style={[styles.modeText, viewMode === "past" && styles.activeModeText]}>
                Past
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, viewMode === "future" && styles.activeModeButton]}
              onPress={() => {
                setViewMode("future");
                setSelectedYear(2100);
                setGeneratedImage(null);
              }}
            >
              <Compass color={viewMode === "future" ? "white" : colors.textSecondary} size={18} />
              <Text style={[styles.modeText, viewMode === "future" && styles.activeModeText]}>
                Future
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.yearDisplay}>
            <Text style={styles.yearLabel}>Travel to Year</Text>
            <Text style={styles.yearValue}>{selectedYear}</Text>
          </View>

          <TimeSlider
            minYear={viewMode === "past" ? 1000 : 2026}
            maxYear={viewMode === "past" ? 2024 : 2500}
            currentYear={selectedYear}
            onYearChange={setSelectedYear}
            isPast={viewMode === "past"}
          />

          <TouchableOpacity 
            style={styles.generateButton}
            onPress={handleGenerateImage}
            disabled={isGenerating}
          >
            <LinearGradient
              colors={viewMode === "past" 
                ? [colors.primary, colors.accent]
                : [colors.accent, colors.futureBright]
              }
              style={styles.generateGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {isGenerating ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Camera color="white" size={20} />
                  <Text style={styles.generateText}>Generate Time View</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>About {landmark.name}</Text>
            <Text style={styles.infoText}>{landmark.description}</Text>
          </View>

          <View style={styles.factsSection}>
            <Text style={styles.factsTitle}>
              {viewMode === "past" ? "Historical Facts" : "Future Predictions"}
            </Text>
            {(viewMode === "past" ? landmark.historicalFacts : landmark.futurePredictions).map((fact, index) => (
              <View key={index} style={styles.factCard}>
                <Info color={colors.primary} size={16} />
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    flex: 1,
    marginLeft: 15,
  },
  landmarkName: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: "white",
    marginBottom: 4,
  },
  landmarkLocation: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    height: 300,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  yearOverlay: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  yearOverlayText: {
    fontSize: 16,
    fontWeight: "bold" as const,
    color: "white",
  },
  modeSelector: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeModeButton: {
    backgroundColor: colors.primary,
  },
  modeText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: colors.textSecondary,
  },
  activeModeText: {
    color: "white",
  },
  yearDisplay: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  yearLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  yearValue: {
    fontSize: 36,
    fontWeight: "bold" as const,
    color: colors.text,
  },
  generateButton: {
    marginHorizontal: 20,
    marginTop: 25,
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
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: colors.text,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  factsSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  factsTitle: {
    fontSize: 18,
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