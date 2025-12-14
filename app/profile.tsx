import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { User, Save, ArrowLeft } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';

interface UserProfile {
  name: string;
  age: string;
  gender: Gender;
  country: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: '',
    gender: 'prefer-not-to-say',
    country: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const countries = [
    'Select Country',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'South Korea',
    'India',
    'Pakistan',
    'Saudi Arabia',
    'UAE',
    'Egypt',
    'Turkey',
    'Brazil',
    'Mexico',
    'Other',
  ];

  const genderOptions: { label: string; value: Gender }[] = [
    { label: 'Prefer not to say', value: 'prefer-not-to-say' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const handleSave = async () => {
    if (!profile.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!profile.age.trim() || isNaN(Number(profile.age))) {
      Alert.alert('Error', 'Please enter a valid age');
      return;
    }

    if (!profile.country || profile.country === 'Select Country') {
      Alert.alert('Error', 'Please select your country');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success',
        'Profile saved successfully!',
        [
          {
            text: 'Continue',
            onPress: () => router.replace('/past'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileIcon}>
          <User size={60} color={colors.primary} />
        </View>

        <Text style={styles.description}>
          Please fill in your information to personalize your Time Explorer experience
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              value={profile.name}
              onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textSecondary}
              testID="name-input"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age *</Text>
            <TextInput
              style={styles.input}
              value={profile.age}
              onChangeText={(text) => setProfile(prev => ({ ...prev, age: text }))}
              placeholder="Enter your age"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              testID="age-input"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={profile.gender}
                onValueChange={(value: Gender) => setProfile(prev => ({ ...prev, gender: value }))}
                style={styles.picker}
                dropdownIconColor={colors.textSecondary}
                testID="gender-picker"
              >
                {genderOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    color={colors.text}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Country *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={profile.country}
                onValueChange={(value: string) => setProfile(prev => ({ ...prev, country: value }))}
                style={styles.picker}
                dropdownIconColor={colors.textSecondary}
                testID="country-picker"
              >
                {countries.map((country) => (
                  <Picker.Item
                    key={country}
                    label={country}
                    value={country}
                    color={colors.text}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
          testID="save-button"
        >
          <Save size={20} color={colors.text} />
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Saving...' : 'Save Profile'}
          </Text>
        </TouchableOpacity>
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
  profileIcon: {
    alignSelf: 'center',
    marginBottom: 24,
    padding: 20,
    borderRadius: 50,
    backgroundColor: colors.cardBackground,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
  },
  pickerContainer: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    color: colors.text,
    backgroundColor: colors.cardBackground,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600' as const,
  },
});