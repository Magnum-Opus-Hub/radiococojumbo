import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable, Image, Text } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Radio",
          tabBarIcon: ({ color }) => <TabBarIcon name="radio" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color="red"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => (
            <Image
              style={{ width: 25, height: 25, marginLeft: 15 }}
              source={require("../../assets/images/logoicon.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="accessibility" color={color} />
          ),
          headerLeft: () => (
            <Image
              style={{ width: 25, height: 25, marginLeft: 15 }}
              source={require("../../assets/images/logoicon.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color }) => <TabBarIcon name="call" color={color} />,
          headerLeft: () => (
            <Image
              style={{ width: 25, height: 25, marginLeft: 15 }}
              source={require("../../assets/images/logoicon.png")}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="blog"
        options={{
          title: "Blog",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="document-text" color={color} />
          ),
          headerLeft: () => (
            <Image
              style={{ width: 25, height: 25, marginLeft: 15 }}
              source={require("../../assets/images/logoicon.png")}
            />
          ),
        }}
      /> */}
    </Tabs>
  );
}
