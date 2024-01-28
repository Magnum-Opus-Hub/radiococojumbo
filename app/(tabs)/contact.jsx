import { ScrollView, Text, View } from "react-native";

export default function Contact() {
  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      className="bg-gray-100 pt-8 px-2 flex"
    >
      <View>
        <View className="shadow-md pb-30">
          <View>
            <View>
              <Text className="text-3xl font-bold tracking-tight text-gray-900">
                Get in touch
              </Text>
              <Text className="my-3 leading-7 text-gray-600">
                Quam nunc nunc eu sed. Sed rhoncus quis ultricies ac
                pellentesque.
              </Text>
            </View>
            <View className="flex justify-center gap-6">
              <View className="rounded-2xl bg-gray-50 p-10">
                <Text className="text-base font-semibold leading-7 text-gray-900">
                  Collaborate
                </Text>
                <View className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <View>
                    <Text className="sr-only">Email</Text>
                    <Text>
                      <Text
                        className="font-semibold text-red-500"
                        href="mailto:collaborate@example.com"
                      >
                        collaborate@example.com
                      </Text>
                    </Text>
                  </View>
                  <View className="mt-1">
                    <Text className="sr-only">Phone number</Text>
                    <Text>+1 (555) 905-2345</Text>
                  </View>
                </View>
              </View>
              <View className="rounded-2xl bg-gray-50 p-10">
                <Text className="text-base font-semibold leading-7 text-gray-900">
                  Press
                </Text>
                <Text className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <View>
                    <Text className="sr-only">Email</Text>
                    <Text>
                      <Text
                        className="font-semibold text-red-500"
                        href="mailto:press@example.com"
                      >
                        press@example.com
                      </Text>
                    </Text>
                  </View>
                  <View className="mt-1">
                    <Text className="sr-only">Phone number</Text>
                    <Text>+1 (555) 905-3456</Text>
                  </View>
                </Text>
              </View>
              <View className="rounded-2xl bg-gray-50 p-10">
                <Text className="text-base font-semibold leading-7 text-gray-900">
                  Join our team
                </Text>
                <Text className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <View>
                    <Text className="sr-only">Email</Text>
                    <Text>
                      <Text
                        className="font-semibold text-red-500"
                        href="mailto:careers@example.com"
                      >
                        careers@example.com
                      </Text>
                    </Text>
                  </View>
                  <View className="mt-1">
                    <Text className="sr-only">Phone number</Text>
                    <Text>+1 (555) 905-4567</Text>
                  </View>
                </Text>
              </View>
              <View className="rounded-2xl bg-gray-50 p-10">
                <Text className="text-base font-semibold leading-7 text-gray-900">
                  Say hello
                </Text>
                <Text className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <View>
                    <Text className="sr-only">Email</Text>
                    <Text>
                      <Text
                        className="font-semibold text-red-500"
                        href="mailto:hello@example.com"
                      >
                        hello@example.com
                      </Text>
                    </Text>
                  </View>
                  <View className="mt-1">
                    <Text className="sr-only">Phone number</Text>
                    <Text>+1 (555) 905-5678</Text>
                  </View>
                </Text>
              </View>
            </View>
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
