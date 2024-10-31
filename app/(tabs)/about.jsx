import { Text, View, Image, ScrollView } from "react-native";

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
            <Text className="mt-6 text-xl font-bold leading-8 text-gray-900">
              Suntem postul de radio online dedicat românilor din Marea
              Britanie!
            </Text>
            <Text className="mt-6 text-lg leading-8 text-gray-600">
              Iar misiunea noastră este să închegăm și să ajutăm la dezvoltarea
              comunității de români, dându-i o voce și un spațiu în care să se
              exprime și să poată fi auzită. Cum ne propunem să facem asta?
              Răspunsul este simplu:
            </Text>
            <Text className="mt-6 text-lg leading-8 text-gray-600">
              Prin emisiuni realizate de jurnaliști cu experiență unde vor fi
              dezbătute subiectele care ne apasă cel mai mult în străinătate, și
              nu numai - emisiuni cu sfaturi legale, știri politice nepartizane
              și actualități din toate domeniile sau interviuri cu români care
              au reușit să facă lucruri impresionante aici, în UK, în ciuda
              tuturor dificultăților pe care le întâmpină un străin.
            </Text>
            <Text className="mt-6 text-lg leading-8 text-gray-600">
              Prin muzică românească și din străinătate, care să ne lumineze
              zilele care sunt mai mereu ploioase.
            </Text>
            <Text className="mt-6 text-lg leading-8 text-gray-600">
              Prin evenimente și promovări care să ne ajute să auzim unii de
              alții și să ne mențină inima românească și să ne păstreze cultura
              vie, în ciuda faptului că suntem foarte departe de casă.
            </Text>
            <Text className="mt-6 text-lg leading-8 text-gray-600">
              Toate acestea, și nu numai, ne vor ajuta să creăm cu adevărat o
              Comunitate în Străinătate, unde fiecare român poate să-și exprime
              părerile, întrebările și temerile într-un spațiu sigur, românesc
              și al nostru.
            </Text>
            <Text className="mt-6 text-lg leading-8 text-gray-600">
              Stai la curent cu ultimele știri despre România Online descărcând
              aplicația de pe App Store sau Google Play și urmărindu-ne paginile
              de Instagram și Facebook, link-uri pe care le accesezi prin
              butoanele din dreapta paginii.
            </Text>
            <Text className="mt-6 text-lg leading-8 text-gray-600">
              Până data viitoare!
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
