import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlayFairBold: require("../assets/fonts/PlayFair-Display.Bold.ttf"),
    PlayFairBlack: require("../assets/fonts/PlayFair-Display.Black.ttf"),
    PlayFairRegular: require("../assets/fonts/PlayFair-Display.Regular.ttf"),
    PlayFairItalic: require("../assets/fonts/PlayFair-Display.Italic.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Error in useEffect ===============", error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
