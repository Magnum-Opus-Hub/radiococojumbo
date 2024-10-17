import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { Root } from "@/app/types";
import PulsatingDot from "./PulsatingDot";

export default function RadioWidget() {
  const [isLoadingTrack, setIsLoadingTrack] = useState(true);
  const [isSoundLoading, setIsSoundLoading] = useState<boolean>(true); // Track sound loading
  const [isBuffering, setIsBuffering] = useState<boolean>(false); // For buffering state
  const [radio, setRadio] = useState<Root | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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

  const loadSound = async () => {
    try {
      setIsSoundLoading(true); // Start sound loading
      const { sound } = await Audio.Sound.createAsync(
        {
          uri: streamUrl,
        },
        { shouldPlay: false } // Sound will not auto-play
      );
      setSound(sound);
    } catch (error) {
      console.error("Error loading sound:", error);
    } finally {
      setIsSoundLoading(false); // Sound loaded
    }
  };

  const handlePlayPause = async () => {
    if (sound) {
      setIsBuffering(true); // Set buffering state
      try {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Error playing/pausing sound:", error);
      } finally {
        setIsBuffering(false); // Reset buffering state
      }
    }
  };

  useEffect(() => {
    getData();
    loadSound();

    const interval = setInterval(() => {
      getData(); // Poll for updates
    }, 5000); // Update every 5 seconds

    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
    });

    return () => {
      sound?.unloadAsync(); // Unload the sound when the component unmounts
      clearInterval(interval); // Clear the interval on unmount
    };
  }, [sound]);

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

  const renderPlayPauseButton = () => {
    // if (isSoundLoading) {
    //   return <ActivityIndicator size="large" color="#000" />; // Show loader while sound is loading
    // }

    if (isBuffering) {
      return <ActivityIndicator size="large" color="#000" />; // Show loader while buffering
    }

    return (
      <View className="p-2">
        <FontAwesome6
          name={isPlaying ? "pause" : "play"}
          size={30}
          color="#000"
        />
      </View>
    );
  };

  return (
    <View className="shadow-md bg-white rounded-xl p-6 w-11/12 h-auto mb-6">
      <View className="flex flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <PulsatingDot />
          <Text className="text-md font-bold tracking-tight text-gray-900">
            Live now:
          </Text>
        </View>
        <View>{renderStatus()}</View>
      </View>

      <View className="flex flex-row items-center">
        <View className="mr-2">{renderTrackImage()}</View>
        <View>{renderTrackInfo()}</View>
      </View>

      <View className="flex-row items-center justify-center mt-4">
        <TouchableHighlight
          onPress={handlePlayPause}
          underlayColor="#fff"
          disabled={isSoundLoading} // Disable button while sound is loading
          style={{ opacity: isSoundLoading ? 0.5 : 1 }} // Reduce opacity when disabled
        >
          {renderPlayPauseButton()}
        </TouchableHighlight>
      </View>
    </View>
  );
}
