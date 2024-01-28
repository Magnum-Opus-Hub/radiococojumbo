import { Text, View, Image, ScrollView } from "react-native";
import { Stack } from 'expo-router';


const people = [
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      require("../../assets/images/logoicon.png"),
  },
  {
    name: "Lindsay W",
    role: "Front-end Developer",
    imageUrl:
      require("../../assets/images/logo.png"),
  },
  {
    name: "Lindsay Wal",
    role: "Front-end Developer",
    imageUrl:
      require("../../assets/images/logo.png"),
  },
  {
    name: "Lindsay Walt",
    role: "Front-end Developer",
    imageUrl:
      require("../../assets/images/logo.png"),
  },
  {
    name: "Lindsay Walto",
    role: "Front-end Developer",
    imageUrl:
      require("../../assets/images/logo.png"),
  },
];

export default function About() {
  return (
    <ScrollView       contentContainerStyle={styles.wrapper}
    className="bg-gray-100 pt-8 px-2 flex">
      <View className="bg-gray-100 py-12">
        <View className="mx-auto">
          <View className="mx-auto">
            <Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our team
            </Text>
            <Text className="mt-6 text-lg leading-8 text-gray-600">
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </Text>
          </View>
          <View
            role="list"
            className="mx-auto mt-20 grid  grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {people.map((person) => (
              <View key={person.name}>
                <Image
                  className="shadow-lg aspect-[3/2] w-full rounded-2xl object-cover"
                  source={person.imageUrl}
                  
                />
                <Text className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {person.name}
                </Text>
                <Text className="text-base leading-7 text-gray-600">
                  {person.role}
                </Text>
              </View>
            ))}
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

