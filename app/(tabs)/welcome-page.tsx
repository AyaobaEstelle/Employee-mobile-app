import { Link, useNavigation } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import Spacing from "@/constants/Spacing";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/Colors";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";

export default function WelcomePage() {
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  });

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem("AccessToken");
    console.log("🚀 ~ handleGetToken ~ dataToken:", dataToken);
    if (!dataToken) {
      navigation.navigate("(tabs)", { screen: "welcome-page" });
    } else {
      navigation.navigate("/login");
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          style={{ height: Dimensions.get("window").height / 2 }}
          resizeMode="contain"
          source={require("../../assets/images/welcome-img1.jpg")}
        />
        <View>
          <View style={styles.content}>
            <Text style={styles.headerText}>welcome to sleeky programmers</Text>
            <Text style={styles.headerSubText}>
              Manage employees data from here
            </Text>
          </View>
          <View style={styles.buttonView}>
            <Pressable style={styles.buttonInput}>
              <Text style={styles.buttonInputText}>
                <Link href="/">Add Employee</Link>
              </Text>
            </Pressable>
            <Pressable style={styles.buttonInput}>
              <Text style={styles.buttonInputText}>
                <Link href="/">View Employees</Link>
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: "100%",
  },
  content: {
    paddingTop: Spacing,
  },
  headerText: {
    fontSize: FontSize.xxLarge,
    fontFamily: "PlayFairBlack",
    color: Colors.primary,
    paddingHorizontal: Spacing * 2,
    textTransform: "capitalize",
    textAlign: "center",
    padding: Spacing,
  },
  headerSubText: {
    fontSize: FontSize.medium,
    fontFamily: "PlayFairItalic",
    color: Colors.text,
    textAlign: "center",
    textTransform: "capitalize",
    marginTop: Spacing * 2,
  },
  buttonView: {
    paddingHorizontal: Spacing * 2,
    gap: Spacing * 3,
    paddingTop: Spacing * 4,
  },
  buttonInput: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: "100%",
  },
  buttonInputText: {
    color: Colors.secondary,
    fontSize: FontSize.large,
    textAlign: "center",
    fontFamily: "PlayFairBold",
  },
});
