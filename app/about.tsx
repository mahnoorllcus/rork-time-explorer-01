import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Info, Clock, Globe, Users } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function AboutScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <Info size={48} color={colors.primary} />
        </View>

        <Text style={styles.title}>About Time Explorer</Text>
        <Text style={styles.subtitle}>Virtual Travel Time Machine</Text>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Time Explorer is a revolutionary mobile application that allows you to journey through time and explore the past and future of any place on Earth. Using cutting-edge AI technology and historical data, we bring history to life and imagine possible futures.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Key Features</Text>
          
          <View style={styles.feature}>
            <Clock size={24} color={colors.primary} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Time Travel</Text>
              <Text style={styles.featureDescription}>
                Explore how cities and landmarks looked centuries ago or might appear in the future
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Globe size={24} color={colors.primary} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Global Exploration</Text>
              <Text style={styles.featureDescription}>
                Discover famous landmarks and hidden gems from around the world
              </Text>
            </View>
          </View>

          <View style={styles.feature}>
            <Users size={24} color={colors.primary} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Educational Content</Text>
              <Text style={styles.featureDescription}>
                Learn about history, culture, and future possibilities through immersive experiences
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            To make history accessible and the future imaginable for everyone. We believe that understanding our past and envisioning our future helps us make better decisions today.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technology</Text>
          <Text style={styles.sectionText}>
            Time Explorer combines artificial intelligence, historical databases, climate models, and augmented reality to create immersive time travel experiences that are both educational and entertaining.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Version Information</Text>
          <Text style={styles.sectionText}>
            Version 1.0.0{'\n'}
            Built with React Native and Expo{'\n'}
            Compatible with iOS and Android
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.copyrightText}>© 2024 Mahnoor LLC</Text>
          <Text style={styles.footerText}>All rights reserved.</Text>
          <Text style={styles.footerText}>
            For support or inquiries, please contact us through the app.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: 24,
    padding: 16,
    borderRadius: 40,
    backgroundColor: colors.cardBackground,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    marginBottom: 32,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  footer: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
});