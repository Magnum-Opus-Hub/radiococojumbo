import { ScrollView, Text, View } from "react-native";
import RadioWidget from "@/components/RadioWidget";
import ScheduleWidget from "@/components/ScheduleWidget";


export default function TabOneScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      className="bg-gray-100 h-full flex pt-5"
    >
      <RadioWidget />
      <ScheduleWidget />
    </ScrollView>
  );
}

const styles = {
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
};
