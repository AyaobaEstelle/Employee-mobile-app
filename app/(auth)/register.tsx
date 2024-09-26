import {
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import FontSize from "@/constants/FontSize";
import Colors from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import { Link, router } from "expo-router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface Iform {
  fullName?: string;
  email?: string;
  password?: string;
}

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
};

type SignupProps = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function Register({ navigation }: SignupProps) {
  const [focused, setFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Iform>({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const validateForm = () => {
    let formErrors = {} as Iform;

    if (!form.fullName) formErrors.fullName = "Full Name is required";

    if (!form.email) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      formErrors.email = "Email is invalid";

    if (!form.password) formErrors.password = "Password is required";
    else if (form.password.length < 6)
      formErrors.password = "Password must be at least 6 characters";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const submit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://employee-management-api-xj3a.onrender.com/auth/register",
          form
        );
        const result = response.data;
        console.log("🚀 ~ submit ~ result:", result);
        await AsyncStorage.setItem("token", result.accessToken);
        // navigation.replace("Login");
        router.push("/login");
      } catch (error) {
        setError("Failed to create account");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("form is invalid");
    }
  };

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm({ ...form, [name]: value });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create account</Text>
          <Text style={styles.headerSubText}>
            Create an account to view all employees
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              placeholder="Full name"
              value={form.fullName}
              onChangeText={(fullName: string) => {
                setForm({ ...form, fullName });
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholderTextColor={Colors.darkText}
              style={styles.input}
            />

            <Text
              style={{
                color: "red",
                marginTop: 1,
                fontSize: 12,
              }}
            >
              {errors.fullName && "Full name is required"}
            </Text>
          </View>
          <View>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              placeholder="Email"
              value={form.email}
              onChangeText={(email: string) => {
                setForm({ ...form, email });
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholderTextColor={Colors.darkText}
              keyboardType="email-address"
              style={styles.input}
            />
            <Text
              style={{
                color: "red",
                marginTop: 1,
                fontSize: 12,
              }}
            >
              {errors.email && "Email is required"}
            </Text>
          </View>
          <View>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              placeholder="Password"
              value={form.password}
              onChangeText={(password: string) => {
                setForm({ ...form, password });
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholderTextColor={Colors.darkText}
              secureTextEntry={true}
              style={styles.input}
            />
            <Text
              style={{
                color: "red",
                marginTop: 1,
                fontSize: 12,
              }}
            >
              {errors.password && "Password is required"}
            </Text>
          </View>
        </View>
        <Pressable onPress={() => submit()} style={styles.buttonView}>
          <Text style={styles.buttonText}>
            {isLoading ? "Loading..." : "Register"}
          </Text>
        </Pressable>
        <Pressable style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "blue",
              }}
            >
              Login
            </Link>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing * 2,
    backgroundColor: Colors.background,
    height: "100%",
    width: "100%",
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    fontSize: FontSize.xLarge,
    fontFamily: "PlayFairBlack",
    color: Colors.primary,
    paddingTop: Spacing * 4,
    paddingBottom: Spacing,
    textTransform: "capitalize",
  },
  headerSubText: {
    fontSize: FontSize.small,
    fontFamily: "PoppinsLight",
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: Spacing * 3,
  },
  inputLabel: {
    marginBottom: 1,
    fontSize: FontSize.medium,
    fontFamily: "PoppinsBold",
    color: Colors.primary,
    marginHorizontal: 2,
  },
  input: {
    fontSize: FontSize.small,
    fontFamily: "PoppinsRegular",
    padding: Spacing * 2,
    backgroundColor: Colors.lightsecondary,
    marginVertical: Spacing,
  },
  buttonView: {
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    // marginVertical: Spacing * 3,
  },
  buttonText: {
    color: Colors.secondary,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    fontSize: FontSize.large,
  },
  footer: {
    padding: Spacing,
  },
  footerText: {
    color: Colors.text,
    textAlign: "center",
    fontSize: FontSize.small,
    fontFamily: "PoppinsLight",
  },
});

// onChangeText={(value) => handleChange("password", value)}
