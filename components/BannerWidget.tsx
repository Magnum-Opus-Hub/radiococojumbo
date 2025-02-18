import React, { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity, ActivityIndicator, Linking } from "react-native";
import { supabase } from "./supabaseClient";

interface ImageData {
  id: string;
  imageUrl: string;
  imageSrc: string;
}

export default function BannerWidget() {
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("banners")
        .select("*")

      if (error) {
        console.error("Fetch Error:", error.message);
        setError(error.message);
      } else {
        setImages(data || []);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading ad...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white" }}>Error: {error}</Text>
      </View>
    );
  }

  if (images.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white" }}>No banners available</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
    className="shadow-md"
    onPress={() => {
        // Open the image URL (you could use Linking API if it's an external URL)
        Linking.openURL(images[1].imageUrl);
      }}
    >
      <Image
        source={{ uri: images[1].imageSrc }}
        style={{
          width: 402,
          height: 320,
          borderRadius: 10,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
        onError={() => setError("Failed to load image")}
      />
    </TouchableOpacity>
  );
}
