import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createContextHook from "@nkzw/create-context-hook";

interface TimeTravel {
  id: string;
  landmarkId: string;
  landmarkName: string;
  year: number;
  type: "past" | "future";
  imageUri: string;
  timestamp: number;
}

interface TimeExplorerContextType {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  history: TimeTravel[];
  addToHistory: (travel: TimeTravel) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}

export const [TimeExplorerProvider, useTimeExplorer] = createContextHook<TimeExplorerContextType>(() => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [history, setHistory] = useState<TimeTravel[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem("timeExplorerHistory");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  const saveHistory = async (newHistory: TimeTravel[]) => {
    try {
      await AsyncStorage.setItem("timeExplorerHistory", JSON.stringify(newHistory));
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  const addToHistory = (travel: TimeTravel) => {
    const newHistory = [travel, ...history].slice(0, 50); // Keep last 50 items
    setHistory(newHistory);
    saveHistory(newHistory);
  };

  const removeFromHistory = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    saveHistory(newHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  return {
    selectedYear,
    setSelectedYear,
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
});