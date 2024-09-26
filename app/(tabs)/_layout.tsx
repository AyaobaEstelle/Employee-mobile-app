import React from "react";
import { Stack } from "expo-router";

const TabLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="welcome-page" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default TabLayout;
