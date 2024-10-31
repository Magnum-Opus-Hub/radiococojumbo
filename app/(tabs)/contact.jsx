import {
  ScrollView,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";

export default function Contact() {
  const handlePhonePress = () => {
    Linking.openURL("tel:+441316187000");
  };

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      className="bg-gray-100 px-2 flex shadow-md"
    >
      <View className="bg-gray-100 py-12">
        <View className="shadow-md pb-30">
          <Text className="text-3xl font-bold tracking-tight text-gray-900">
            Hai să ne auzim!
          </Text>
          <Text className="my-6 leading-8 text-lg text-gray-600">
            Dacă ai o întrebare, propunere sau dacă doar vrei să ne comunici
            ceva, nu ezita să ne trimiți un mesaj prin mail sau telefon.
          </Text>
        </View>

        <View className="flex shadow-md justify-center gap-6">
          {/* Contact Section */}
          <View className="rounded-2xl bg-gray-50 p-10">
            <Text className="text-base font-semibold leading-7 text-gray-900">
              Contact
            </Text>
            <View className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
              <TouchableOpacity
                onPress={() => handleEmailPress("contact@romaniaonline.net")}
              >
                <Text className="font-semibold text-red-500">
                  contact@romaniaonline.net
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePhonePress}
                className="mt-2 bg-gray-200 p-2 rounded-lg"
              >
                <Text className="text-black font-semibold">
                  +44 131 618 7000
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Vânzări Section */}
          <View className="rounded-2xl bg-gray-50 p-10">
            <Text className="text-base font-semibold leading-7 text-gray-900">
              Vânzări
            </Text>
            <TouchableOpacity
              onPress={() => handleEmailPress("sales@romaniaonline.net")}
            >
              <Text className="font-semibold text-red-500 mt-3">
                sales@romaniaonline.net
              </Text>
            </TouchableOpacity>
          </View>

          {/* Emisiuni Section */}
          <View className="rounded-2xl bg-gray-50 p-10">
            <Text className="text-base font-semibold leading-7 text-gray-900">
              Emisiuni
            </Text>
            <TouchableOpacity
              onPress={() => handleEmailPress("emisiuni@romaniaonline.net")}
            >
              <Text className="font-semibold text-red-500 mt-3">
                emisiuni@romaniaonline.net
              </Text>
            </TouchableOpacity>
          </View>

          {/* Alatură-te Echipei Section */}
          <View className="rounded-2xl bg-gray-50 p-10">
            <Text className="text-base font-semibold leading-7 text-gray-900">
              Alatură-te Echipei
            </Text>
            <TouchableOpacity
              onPress={() => handleEmailPress("echipa@romaniaonline.net")}
            >
              <Text className="font-semibold text-red-500 mt-3">
                echipa@romaniaonline.net
              </Text>
            </TouchableOpacity>
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
