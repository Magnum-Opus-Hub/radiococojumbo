import { View, Text, ActivityIndicator } from "react-native";
import React, {useEffect, useState} from 'react';

const ScheduleWidget = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const url = "https://public.radio.co/stations/s1cdb8ef73/embed/schedule"

  const getData = () => {
    fetch(url)
    .then((response)=> response.json())
    .then((json) =>setData(json))
    .catch((error)=> console.error(error))
    .finally(()=> setLoading(false))
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <View className="shadow-md bg-white rounded-xl p-6 w-11/12 h-auto">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-start tracking-tight text-gray-900 sm:text-xl">
          Schedule
        </Text>
        <Text>19:03 GMT</Text>
      </View>

      <View className="">
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        data.data.map((data)=>(
        
            <View key={data.playlist.id} className="flex flex-row justify-between py-4 items-center">
              <Text className=" text-md font-normal text-gray-500 sm:text-right dark:text-gray-400 shrink-0">
              {data.start.slice(11, -9)}  - {data.end.slice(11, -9)}
              </Text>

              <Text className="text-md font-semibold text-right text-gray-900 w-36">
              {data.playlist.title}
              </Text>
            </View>
      
        ))
      )}
    </View>

    </View>
  );
};

export default ScheduleWidget;
