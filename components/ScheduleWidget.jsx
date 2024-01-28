import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";

const ScheduleWidget = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const url = "https://public.radio.co/stations/s1cdb8ef73/embed/schedule";

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      var time = moment().format(" hh:mm A");
      setCurrentTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    var date = moment().format("yyyy-MM-DD");
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="shadow-md bg-white rounded-xl p-6 w-11/12 h-96">
      <View className="flex-row items-center justify-between pb-2">
        <Text className="text-lg font-bold text-start tracking-tight text-gray-900 sm:text-xl">
          Schedule
        </Text>
        <Text className="text-md font-bold text-start tracking-tight text-gray-900 sm:text-xl">
          {currentTime}
        </Text>
      </View>

      <ScrollView className="h-full">
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          data.data.map((data) => (
            <View
              key={data.playlist?.id}
              className="flex flex-row justify-between py-4 items-center"
            >
              <View className="flex-col">
                <Text className=" text-md font-normal text-gray-900 sm:text-right shrink-0">
                  {data.end.slice(0, -15)}
                </Text>
                <Text className=" text-md font-normal text-gray-500 sm:text-right shrink-0">
                  {/* {data.start.slice(11, -9)} - {data.end.slice(11, -9)} */}
                  {currentDate}
                </Text>
              </View>

              <View className="flex-col">
                <Text className="text-md font-semibold text-right text-gray-900 w-36">
                  {data.playlist.title}
                </Text>

                <Text className="text-sm text-right text-gray-500">
                  {data.playlist.artist.slice(-10)}
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
