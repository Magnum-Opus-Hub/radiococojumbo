import React, {useEffect, useState} from 'react';
import { Text, View, ActivityIndicator, Image, TouchableWithoutFeedback } from "react-native";
import AudioButton from '../components/AudioButton'


export default function RadioWidget() {
  

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const url = "https://public.radio.co/stations/sced7c0e79/status"

  const getData = () => {
    fetch(url)
    .then((response)=> response.json())
    .then((json) =>setData(json))
    .catch((error)=> console.error(error))
    .finally(()=> setLoading(false))
  }

  async function setup(){
    let isSetup = await setupPlayer()

    if(isSetup){
      await addTrack()
    }

    setIsPlayerReady(isSetup)
  }

  useEffect(() => {
    getData();
    setup();
  }, []);
  
  return (
    <View className="shadow-md bg-white rounded-xl p-6 w-11/12 h-auto mb-6">
      <View className="flex flex-row items-center justify-between mb-3">
        <View  className="flex-row items-center">
          <View className="w-5 h-5 rounded-xl bg-red-500 mr-2"></View>
          <Text className="text-lg font-bold tracking-tight text-gray-900">
          Now Playing
          </Text>
        </View>


        <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text className="text-md text-green-600 font-bold">{data.status}</Text>
      )}
    </View>
      </View>

      <View className="flex flex-row items-center">


        <View className="mr-2">
      {isLoading ? (
        <ActivityIndicator />
      ) : (
         


          <Image className="w-16 h-16 rounded-lg" source={{uri: data.current_track.artwork_url}}></Image>

      
      )}
    </View>





        <View>
    
          <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
       
         
        <View className="w-60">

        <Text className="text-lg font-bold text-start tracking-tight text-gray-900">{data.current_track.title}</Text>

        </View>
        
      
      )}
    </View>

        
        </View>
      </View>


    </View>
  );
}
