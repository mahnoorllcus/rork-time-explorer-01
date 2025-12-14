import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Mail, User } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/profile');
  };

  const handleSignUp = () => {
    router.push('/profile');
  };

  const handleGuestLogin = () => {
    router.replace('/past');
  };

  const handleGmailLogin = () => {
    // In a real app, this would integrate with Google OAuth
    router.push('/profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Clock size={60} color={colors.primary} />
          </View>
          <Text style={styles.title}>Welcome to Time Explorer</Text>
          <Text style={styles.subtitle}>
            Journey through time and explore the past and future of any place on Earth
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn}>
            <User size={20} color={colors.text} />
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleSignUp}>
            <Text style={styles.secondaryButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gmailButton} onPress={handleGmailLogin}>
            <Mail size={20} color={colors.text} />
            <Text style={styles.gmailButtonText}>Login with Gmail</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => router.push('/terms')}>
            <Text style={styles.footerLink}>Terms & Conditions</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>•</Text>
          <TouchableOpacity onPress={() => router.push('/privacy')}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>•</Text>
          <TouchableOpacity onPress={() => router.push('/about')}>
            <Text style={styles.footerLink}>About</Text>
          </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoContainer: {
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 60,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600' as const,
    textAlign: 'center',
  },
  gmailButton: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  gmailButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  guestButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  guestButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500' as const,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    gap: 8,
  },
  footerLink: {
    color: colors.textSecondary,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footerSeparator: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});