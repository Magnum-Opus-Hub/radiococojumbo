import React from "react";
import { Pressable, View } from "react-native";
import TrackPlayer, {
  State,
  usePlaybackState,
} from "react-native-track-player";
import { Ionicons } from "@expo/vector-icons";

const ControlCenter = () => {
  const playbackState = usePlaybackState();

  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPlayer.getActiveTrack();

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play;
      } else {
        await TrackPlayer.pause;
      }
    }
  };

  return (
    <View>
      <Pressable onPress={() => togglePlayback(playbackState)}>
        <Ionicons
          size={28}
          style={{ marginBottom: -3 }}
          name={playbackState === State.Playing ? "pause" : "play"}
        />
      </Pressable>
    </View>
  );
};

export default ControlCenter;
