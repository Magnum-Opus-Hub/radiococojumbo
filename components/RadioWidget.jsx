import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, Image, Button } from "react-native";

import { Audio } from "expo-av";

export default function RadioWidget() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sound, setSound] = useState();
  const url = "https://public.radio.co/stations/sced7c0e79/status";

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: "http://streaming.radio.co/sced7c0e79/listen",
    });
    setSound(sound);

    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
    });

    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function pauseSound() {
    await sound.pauseAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="shadow-md bg-white rounded-xl p-6 w-11/12 h-auto mb-6">
      <View className="flex flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-4 h-4 rounded-xl bg-red-500 mr-2"></View>
          <Text className="text-lg font-bold tracking-tight text-gray-900">
            Now Playing
          </Text>
        </View>

        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-md text-green-600 font-bold">
              {data.status}
            </Text>
          )}
        </View>
      </View>

      <View className="flex flex-row items-center">
        <View className="mr-2">
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Image
              className="w-16 h-16 rounded-lg"
              source={{ uri: data.current_track.artwork_url }}
            ></Image>
          )}
        </View>

        <View>
          <View>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <View className="w-60">
                <Text className="text-lg font-bold text-start tracking-tight text-gray-900">
                  {data.current_track.title}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View>
          <Button title="plas" onPress={playSound}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 fill-red-500"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>

          <Button title="Pause Sound" onPress={pauseSound}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-10 h-10 fill-red-500"
              fill="currentColor"
              id="pause"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 5a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2zm8 0a2 2 0 0 0-2 2v10a2 2 0 1 0 4 0V7a2 2 0 0 0-2-2z"
              ></path>
            </svg>
          </Button>
        </View>
      </View>
    </View>
  );
}
