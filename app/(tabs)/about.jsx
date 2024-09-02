import { Text, View, Image, ScrollView } from "react-native";

const people = [
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl: require("../../assets/images/logoicon.png"),
  },
  {
    name: "Lindsay W",
    role: "Front-end Developer",
    imageUrl: require("../../assets/images/logo.png"),
  },
  {
    name: "Lindsay Wal",
    role: "Front-end Developer",
    imageUrl: require("../../assets/images/logo.png"),
  },
  {
    name: "Lindsay Walt",
    role: "Front-end Developer",
    imageUrl: require("../../assets/images/logo.png"),
  },
  {
    name: "Lindsay Walto",
    role: "Front-end Developer",
    imageUrl: require("../../assets/images/logo.png"),
  },
];

export default function About() {
  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      className="bg-gray-100 px-2 flex"
    >
      <View className="bg-gray-100 py-12">
        <View>
          <View>
            <Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Radio România Online
            </Text>
            <Text className="mt-6 text-lg leading-8 text-gray-600">
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
};
