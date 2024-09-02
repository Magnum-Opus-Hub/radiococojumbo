import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image } from "react-native";
import { Text, View } from "@/components/Themed";

export default function ModalScreen() {
  return (
    <View className="shadow-md bg-white flex-1 items-center justify-center">
      <Text className="text-xl font-bold tracking-tight text-gray-900">
        Radio România Online
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
