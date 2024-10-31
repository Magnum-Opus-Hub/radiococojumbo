import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";

interface ScheduleWidgetProps {
  data: Data[];
}
interface Data {
  start: string;
  end: string;
  playlist: Playlist;
}
interface Playlist {
  name: string;
  colour: string;
  artist: string;
  title: string;
  artwork: string;
}

const ScheduleWidget = () => {
  const [isLoading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<ScheduleWidgetProps>();
  const url = "https://public.radio.co/stations/sb6e6793c6/embed/schedule";

  const [currentTime, setCurrentTime] = useState("");

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setSchedule(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const time = moment().format(" hh:mm A");
      setCurrentTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const upcomingShows = schedule?.data.filter((item) =>
    moment(item.end).isAfter(moment())
  );

  return (
    <View className="shadow-md bg-white rounded-xl p-6 w-11/12 max-h-96">
      <View className="flex-row items-center justify-between pb-2">
        <Text className="text-lg font-bold text-start tracking-tight text-gray-900 sm:text-xl">
          Schedule
        </Text>
        <Text className="text-md font-bold text-start tracking-tight text-gray-900 sm:text-xl">
          {currentTime}
        </Text>
      </View>

      <ScrollView className="h-full">
        {upcomingShows?.length === 0 ? (
          <Text>No upcoming shows available</Text>
        ) : (
          upcomingShows?.map((item, index) => (
            <View
              key={index}
              className="flex flex-row justify-between py-4 items-center"
            >
              <View className="flex-col">
                <Text className=" text-md font-semibold text-gray-900 sm:text-right shrink-0">
                  {moment(item.end).format("dddd")}
                </Text>
                <Text className=" text-md font-normal text-gray-500 sm:text-right shrink-0">
                  {item.start.slice(11, -9)} - {item.end.slice(11, -9)}
                </Text>
              </View>

              <View className="flex-col">
                <Text className="text-md font-semibold text-right text-gray-900 w-36">
                  {item.playlist.title}
                </Text>

                <Text className="text-sm text-right text-gray-500">
                  {item.playlist.artist}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ScheduleWidget;
