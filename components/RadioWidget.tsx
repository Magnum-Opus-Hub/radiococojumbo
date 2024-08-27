import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableHighlight, TouchableOpacity,
} from "react-native";

import { Audio } from "expo-av";
import Svg, {Path} from "react-native-svg";
import {Root} from "@/app/types";
import { registerRootComponent } from 'expo';
import TrackPlayer from 'react-native-track-player';
import MusicPlayer from "@/components/MusicPlayer";

export default function RadioWidget() {

  const [isLoading, setLoading] = useState(true);
  const [radio, setRadio] = useState<Root | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const url = "https://public.radio.co/stations/sb6e6793c6/status";
  registerRootComponent(RadioWidget);
  TrackPlayer.registerPlaybackService(() => require('../services/service'));

  const getData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setRadio(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const playSound = async () => {
    setLoading(true);
    try {
      const { sound } = await Audio.Sound.createAsync(
          { uri: "http://streaming.radio.co/sb6e6793c6/listen" },
          { shouldPlay: true }
      );
      setSound(sound);

      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      });

      await sound.playAsync();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };


  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);


  const renderStatus = () => {
    if (isLoading) {
      return <ActivityIndicator />;
    }
    return (
        <Text className={`text-md tracking-tight font-bold ${radio?.status === "offline" ? "text-red-500" : "text-green-600"}`}>
          {radio?.status}
        </Text>
    );
  };

  const renderTrackInfo = () => {
    if (isLoading) {
      return <ActivityIndicator />;
    }
    return (
        <View className="w-60">
          <Text className="text-lg font-bold text-start tracking-tight text-gray-900">
            {radio?.current_track?.title}
          </Text>
        </View>
    );
  };

  return (
      <View className="shadow-md bg-white rounded-xl p-6 w-11/12 h-auto mb-6">
        <View className="flex flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <View className="w-4 h-4 rounded-xl bg-red-500 mr-2"></View>
            <Text className="text-md font-bold tracking-tight text-gray-900">
              Live now:
            </Text>
          </View>
          <View>{renderStatus()}</View>
        </View>

        <View className="flex flex-row items-center">
          <View className="mr-2">
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <Image
                    className="w-16 h-16 rounded-lg"
                    source={{ uri: radio?.current_track?.artwork_url }}
                />
            )}
          </View>
          <View>{renderTrackInfo()}</View>
        </View>

        <View><MusicPlayer /></View>

        <View className="flex-row items-center justify-between">
          <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                  <TouchableHighlight onPress={playSound}>
                    <View>
                      <Svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-10 h-10 fill-red-500"
                          fill="currentColor"
                          id="play"
                      >
                        <Path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 5a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2zm8 0a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2z"
                        ></Path>
                      </Svg>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight onPress={pauseSound}>
                    <View>
                      <Svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-10 h-10 fill-red-500"
                          fill="currentColor"
                          id="pause"
                      >
                        <Path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 5a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2zm8 0a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2z"
                        ></Path>
                      </Svg>
                    </View>
                  </TouchableHighlight>
                </>
            )}
          </View>
        </View>
      </View>
  );
}

