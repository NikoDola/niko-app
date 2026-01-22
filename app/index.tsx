import { View, Text, Pressable, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 30,
      }}
    >
      <Pressable
        onPress={() => router.push("/games/flip-coin")}
        style={{
          width: "47.5%",
          aspectRatio: 1,
          backgroundColor: "red",
          borderRadius: 15,
        }}
      >
        <ImageBackground
          source={require("../assets/images/flip-coin.png")}
          style={{
            width: "100%",
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          imageStyle={{ borderRadius: 12 }}
        ></ImageBackground>
      </Pressable>
      <Pressable
        onPress={() => router.push("/games/odd-one-out")}
        style={{
          width: "47.5%",
          aspectRatio: 1,
          backgroundColor: "red",
          borderRadius: 15,
        }}
      >
        <ImageBackground
          source={require("../assets/images/odd-one-out.png")}
          style={{
            width: "100%",
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          imageStyle={{ borderRadius: 12 }}
        ></ImageBackground>
      </Pressable>
    </View>
  );
}
