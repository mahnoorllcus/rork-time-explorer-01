import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, MapPin, Star, Camera, Globe } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { landmarks } from "@/data/landmarks";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

export default function LandmarksScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Ancient", "Modern", "Natural", "Religious", "Urban"];

  const filteredLandmarks = landmarks.filter((landmark) => {
    const matchesSearch = landmark.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         landmark.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || landmark.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.background]}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Landmarks Explorer</Text>
          <Text style={styles.subtitle}>Discover iconic places through time</Text>
        </View>

        <View style={styles.searchContainer}>
          <Search color={colors.textSecondary} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search landmarks..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.arPrompt}>
            <LinearGradient
              colors={[colors.primary, colors.accent]}
              style={styles.arGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Camera color="white" size={24} />
              <View style={styles.arTextContainer}>
                <Text style={styles.arTitle}>AR Time Travel</Text>
                <Text style={styles.arSubtitle}>Point your camera at any landmark</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.landmarksGrid}>
            {filteredLandmarks.map((landmark) => (
              <TouchableOpacity
                key={landmark.id}
                style={styles.landmarkCard}
                onPress={() => router.push(`/landmark/${landmark.id}`)}
                activeOpacity={0.9}
              >
                <Image source={{ uri: landmark.imageUrl }} style={styles.landmarkImage} />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.7)"]}
                  style={styles.cardGradient}
                />
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.landmarkName}>{landmark.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Star color="#FFD700" size={14} fill="#FFD700" />
                      <Text style={styles.rating}>{landmark.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.locationContainer}>
                    <MapPin color="white" size={12} />
                    <Text style={styles.landmarkLocation}>{landmark.location}</Text>
                  </View>
                  <View style={styles.tagContainer}>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{landmark.category}</Text>
                    </View>
                    <View style={styles.tag}>
                      <Globe color="white" size={10} />
                      <Text style={styles.tagText}>{landmark.era}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    marginHorizontal: 20,
    marginTop: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 10,
    fontSize: 16,
    color: colors.text,
  },
  categoriesContainer: {
    paddingLeft: 20,
    marginTop: 15,
    maxHeight: 40,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "500" as const,
  },
  selectedCategoryText: {
    color: "white",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  arPrompt: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  arGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 15,
  },
  arTextContainer: {
    flex: 1,
  },
  arTitle: {
    fontSize: 18,
    fontWeight: "bold" as const,
    color: "white",
    marginBottom: 4,
  },
  arSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  landmarksGrid: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  landmarkCard: {
    height: 220,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
  },
  landmarkImage: {
    width: "100%",
    height: "100%",
  },
  cardGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  landmarkName: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: "white",
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 12,
    color: "white",
    fontWeight: "600" as const,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  landmarkLocation: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  tagContainer: {
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: "white",
    fontWeight: "500" as const,
  },
});