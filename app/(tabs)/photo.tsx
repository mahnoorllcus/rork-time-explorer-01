import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Camera, Upload, Sparkles, User, MapPin } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { colors } from "@/constants/colors";

type TransformType = "past" | "future" | "child" | "elderly";

export default function PhotoScreen() {
  const insets = useSafeAreaInsets();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isTransforming, setIsTransforming] = useState<boolean>(false);
  const [selectedTransform, setSelectedTransform] = useState<TransformType | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Please grant photo library access to upload images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images" as any,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setTransformedImage(null);
      setSelectedTransform(null);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Please grant camera access to take photos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      setTransformedImage(null);
      setSelectedTransform(null);
    }
  };

  const transformImage = async (type: TransformType) => {
    if (!selectedImage) return;

    setIsTransforming(true);
    setSelectedTransform(type);

    try {
      let base64Image: string;
      
      if (selectedImage.startsWith("data:")) {
        base64Image = selectedImage;
      } else if (Platform.OS === 'web') {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        base64Image = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } else {
        const base64Data = await FileSystem.readAsStringAsync(selectedImage, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const mimeType = selectedImage.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
        base64Image = `data:${mimeType};base64,${base64Data}`;
      }

      const promptMap: Record<TransformType, string> = {
        past: "Transform this image to show how it looked 50-100 years ago. If it's a person, age them backwards to show their younger self. If it's a location, show historical architecture and vintage elements with sepia or old photography tones.",
        future: "Transform this image to show how it might look 50-100 years in the future. If it's a person, age them forward to show their elderly self. If it's a location, add futuristic architecture, advanced technology, and modern sustainable elements.",
        child: "Transform this person's image to show how they looked as a child (around 5-10 years old). Maintain their facial features and characteristics but make them younger, smaller, with child-like proportions and innocent expressions.",
        elderly: "Transform this person's image to show how they will look as an elderly person (around 70-80 years old). Add natural aging effects like wrinkles, gray/white hair, age spots, and weathered skin while maintaining their core facial features.",
      };

      const base64Data = base64Image.split(',')[1] || base64Image;

      const response = await fetch("https://toolkit.rork.com/images/edit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptMap[type],
          images: [
            {
              type: "image",
              image: base64Data,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to transform image");
      }

      const data = await response.json();
      const transformedBase64 = `data:${data.image.mimeType};base64,${data.image.base64Data}`;
      setTransformedImage(transformedBase64);
    } catch (error) {
      console.error("Transform error:", error);
      Alert.alert("Error", "Failed to transform image. Please try again.");
    } finally {
      setIsTransforming(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Sparkles color={colors.primary} size={32} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Photo Time Machine</Text>
          <Text style={styles.headerSubtitle}>Transform any photo through time</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedImage ? (
          <View style={styles.uploadSection}>
            <View style={styles.uploadPlaceholder}>
              <Upload color={colors.textSecondary} size={64} />
              <Text style={styles.uploadText}>Upload or capture a photo</Text>
              <Text style={styles.uploadSubtext}>
                Works with portraits, landmarks, and locations
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Upload color={colors.background} size={20} />
                <Text style={styles.uploadButtonText}>Choose Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
                <Camera color={colors.background} size={20} />
                <Text style={styles.uploadButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.imageSection}>
            <View style={styles.imagePreviewContainer}>
              <View style={styles.imageWrapper}>
                <Text style={styles.imageLabel}>Original</Text>
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
              </View>

              {transformedImage && (
                <View style={styles.imageWrapper}>
                  <Text style={styles.imageLabel}>Transformed</Text>
                  <Image source={{ uri: transformedImage }} style={styles.imagePreview} />
                </View>
              )}

              {isTransforming && (
                <View style={styles.imageWrapper}>
                  <Text style={styles.imageLabel}>Processing...</Text>
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Transforming through time...</Text>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.transformSection}>
              <Text style={styles.sectionTitle}>Choose Transformation</Text>

              <View style={styles.transformGrid}>
                <TouchableOpacity
                  style={[
                    styles.transformCard,
                    selectedTransform === "past" && styles.transformCardActive,
                  ]}
                  onPress={() => transformImage("past")}
                  disabled={isTransforming}
                >
                  <View style={styles.transformIcon}>
                    <MapPin color={colors.primary} size={28} />
                  </View>
                  <Text style={styles.transformTitle}>Past View</Text>
                  <Text style={styles.transformDescription}>
                    50-100 years ago
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.transformCard,
                    selectedTransform === "future" && styles.transformCardActive,
                  ]}
                  onPress={() => transformImage("future")}
                  disabled={isTransforming}
                >
                  <View style={styles.transformIcon}>
                    <Sparkles color={colors.primary} size={28} />
                  </View>
                  <Text style={styles.transformTitle}>Future View</Text>
                  <Text style={styles.transformDescription}>
                    50-100 years ahead
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.transformCard,
                    selectedTransform === "child" && styles.transformCardActive,
                  ]}
                  onPress={() => transformImage("child")}
                  disabled={isTransforming}
                >
                  <View style={styles.transformIcon}>
                    <User color={colors.primary} size={28} />
                  </View>
                  <Text style={styles.transformTitle}>Younger Self</Text>
                  <Text style={styles.transformDescription}>
                    As a child
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.transformCard,
                    selectedTransform === "elderly" && styles.transformCardActive,
                  ]}
                  onPress={() => transformImage("elderly")}
                  disabled={isTransforming}
                >
                  <View style={styles.transformIcon}>
                    <User color={colors.primary} size={28} />
                  </View>
                  <Text style={styles.transformTitle}>Elderly Self</Text>
                  <Text style={styles.transformDescription}>
                    In old age
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setSelectedImage(null);
                setTransformedImage(null);
                setSelectedTransform(null);
              }}
            >
              <Text style={styles.resetButtonText}>Upload New Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  uploadSection: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 400,
  },
  uploadPlaceholder: {
    alignItems: "center",
    padding: 40,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    borderStyle: "dashed",
    width: "100%",
    marginBottom: 24,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: colors.text,
    marginTop: 16,
  },
  uploadSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  uploadButton: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  uploadButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "600" as const,
  },
  imageSection: {
    padding: 20,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  imageWrapper: {
    flex: 1,
    minWidth: "48%",
  },
  imageLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: colors.text,
    marginBottom: 8,
  },
  imagePreview: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
  },
  loadingContainer: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  transformSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: colors.text,
    marginBottom: 16,
  },
  transformGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  transformCard: {
    flex: 1,
    minWidth: "48%",
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  transformCardActive: {
    borderColor: colors.primary,
  },
  transformIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  transformTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: colors.text,
    marginBottom: 4,
    textAlign: "center",
  },
  transformDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  resetButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600" as const,
  },
});
