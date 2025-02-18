import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import PulsatingDot from "./PulsatingDot";
import { Root } from "@/app/types";

export default function RadioWidget() {
  const [isLoadingTrack, setIsLoadingTrack] = useState(true);
  const [isSoundLoading, setIsSoundLoading] = useState<boolean>(true); // Track sound loading
  const [radio, setRadio] = useState<Root | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState(false);

  const radioStatusUrl = "https://public.radio.co/stations/sb6e6793c6/status";
  const streamUrl = "https://s4.radio.co/sb6e6793c6/listen";

  const getData = useCallback(async () => {
    try {
      const response = await fetch(radioStatusUrl);
      const json = await response.json();
      setRadio(json);
    } catch (error) {
      console.error("Error fetching radio status:", error);
    } finally {
      setIsLoadingTrack(false);
    }
  }, [radioStatusUrl]);

  async function playSound() {
    if (playing) return; // Prevent play if already playing

    setIsSoundLoading(true); // Show loader while loading

    try {
      if (sound) {
        // Unload the existing sound instance to reset the stream position
        await sound.unloadAsync();
      }

      // Set audio mode for streaming
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        playsInSilentModeIOS: true,
      });

      // Load and play the new sound instance for a fresh connection to live stream
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: streamUrl },
        { shouldPlay: true, isLooping: true }
      );

      setSound(newSound);
      setPlaying(true);
      setIsSoundLoading(false);
      console.log("Playing Radio Stream in sync with live sound");
    } catch (error) {
      console.error("Error loading or playing radio stream:", error);
      Alert.alert("Playback Error", "Unable to load the stream.");
      setIsSoundLoading(false);
    }
  }

  // Modified stopSound function
  async function stopSound() {
    if (sound) {
      try {
        await sound.pauseAsync();
        await sound.unloadAsync(); // Unload to reset the stream on resume
        setPlaying(false);
        console.log("Stopping Radio Stream and unloading sound");
      } catch (error) {
        console.error("Error stopping sound:", error);
      }
    }
  }

  useEffect(() => {
    getData();
    playSound();

    const interval = setInterval(() => {
      getData();
    }, 5000);

    return sound
      ? () => {
          console.log("Unloading Radio Stream");
          sound
            .unloadAsync()
            .catch((error) => console.error("Unload Error:", error));
        }
      : undefined;
  }, []);

  const renderStatus = useCallback(() => {
    return (
      <Text
        className={`text-md tracking-tight font-bold ${
          radio?.status === "offline" || "" ? "text-red-500" : "text-green-600"
        }`}
      >
        {radio?.status}
      </Text>
    );
  }, [radio]);

  const renderTrackInfo = useCallback(() => {
    if (!radio?.status || isLoadingTrack) {
      return (
        <View className="flex flex-row gap-2">
          <Text>Loading track info...</Text>
        </View>
      );
    }
    return (
      <View className="w-60">
        <Text className="text-lg font-bold text-start tracking-tight text-gray-900">
          {radio?.current_track?.title}
        </Text>
      </View>
    );
  }, [isLoadingTrack, radio]);

  const renderTrackImage = useCallback(() => {
    if (!radio?.status) {
      return <View className="w-16 h-16 rounded-lg bg-gray-300"></View>;
    }
    return (
      <Image
        className="w-16 h-16 rounded-lg"
        source={{ uri: radio?.current_track?.artwork_url }}
      />
    );
  }, [radio]);

  return (
    <View className="shadow-md bg-white rounded-xl p-6 w-11/12 h-auto mb-6">
      <View className="flex flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <PulsatingDot />
          <Text className="text-md font-bold tracking-tight text-gray-900">
            Live now
          </Text>
        </View>
        <View>{renderStatus()}</View>
      </View>

      <View className="flex flex-row items-center">
        <View className="mr-2">{renderTrackImage()}</View>
        <View>{renderTrackInfo()}</View>
      </View>

      <View className="flex-row items-center justify-center mt-4">
        {isSoundLoading ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <TouchableOpacity
            className="px-4 py-2 bg-red-500 rounded-full"
            onPress={playing ? stopSound : playSound}
          >
            <Text className="text-white font-semibold">
              {playing ? "Stop Radio" : "Play Radio"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
