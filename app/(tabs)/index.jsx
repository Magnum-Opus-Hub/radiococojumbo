import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import RadioWidget from "@/components/RadioWidget";
import ScheduleWidget from "@/components/ScheduleWidget";

export default function TabOneScreen() {
  const [refreshing, setRefreshing] = useState(false);

  // Simulate a refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    // Add logic to refresh your components here, e.g., refetch data for RadioWidget or ScheduleWidget
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay for refresh
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      className="bg-gray-100 h-full flex pt-5"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } // Adding pull-to-refresh control
    >
      <RadioWidget />
      {/* <TestRadio /> */}
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
