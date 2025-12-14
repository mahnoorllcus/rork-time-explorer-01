import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Clock, MapPin, Trash2, Calendar, Download } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { useTimeExplorer } from "@/providers/TimeExplorerProvider";

export default function TripsScreen() {
  const { history, removeFromHistory, clearHistory } = useTimeExplorer();

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this time travel memory?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => removeFromHistory(id), style: "destructive" },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Trips",
      "This will delete all your saved time travel memories. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", onPress: clearHistory, style: "destructive" },
      ]
    );
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.gradientStart, colors.background]}
        style={StyleSheet.absoluteFillObject}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Time Travels</Text>
            <Text style={styles.subtitle}>Your journey through history</Text>
          </View>
          {history.length > 0 && (
            <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        {history.length === 0 ? (
          <View style={styles.emptyState}>
            <Clock color={colors.textSecondary} size={48} />
            <Text style={styles.emptyTitle}>No Time Travels Yet</Text>
            <Text style={styles.emptyText}>
              Start exploring the past and future to save your journeys here
            </Text>
          </View>
        ) : (
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.stats}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{history.length}</Text>
                <Text style={styles.statLabel}>Total Trips</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {history.filter(h => h.type === "past").length}
                </Text>
                <Text style={styles.statLabel}>Past Visits</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  {history.filter(h => h.type === "future").length}
                </Text>
                <Text style={styles.statLabel}>Future Visits</Text>
              </View>
            </View>

            {history.map((trip) => (
              <View key={trip.id} style={styles.tripCard}>
                <Image source={{ uri: trip.imageUri }} style={styles.tripImage} />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.tripGradient}
                />
                <View style={styles.tripContent}>
                  <View style={styles.tripHeader}>
                    <View style={styles.tripBadge}>
                      <Text style={styles.tripType}>
                        {trip.type === "past" ? "Past" : "Future"}
                      </Text>
                    </View>
                    <TouchableOpacity 
                      onPress={() => handleDelete(trip.id)}
                      style={styles.deleteButton}
                    >
                      <Trash2 color="white" size={18} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.tripInfo}>
                    <Text style={styles.tripName}>{trip.landmarkName}</Text>
                    <View style={styles.tripDetails}>
                      <View style={styles.detailRow}>
                        <Clock color="white" size={14} />
                        <Text style={styles.detailText}>Year {trip.year}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Calendar color="white" size={14} />
                        <Text style={styles.detailText}>{formatDate(trip.timestamp)}</Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.downloadButton}>
                    <Download color="white" size={16} />
                    <Text style={styles.downloadText}>Save Image</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
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
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clearText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold" as const,
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  stats: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold" as const,
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  tripCard: {
    height: 250,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  tripImage: {
    width: "100%",
    height: "100%",
  },
  tripGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  tripContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tripBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tripType: {
    fontSize: 12,
    color: "white",
    fontWeight: "600" as const,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
  },
  tripInfo: {
    marginBottom: 10,
  },
  tripName: {
    fontSize: 22,
    fontWeight: "bold" as const,
    color: "white",
    marginBottom: 8,
  },
  tripDetails: {
    gap: 6,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 8,
    borderRadius: 8,
  },
  downloadText: {
    fontSize: 14,
    color: "white",
    fontWeight: "500" as const,
  },
});