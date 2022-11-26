import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import styles from "../styles/auth.js";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import * as SecureStore from "expo-secure-store";

import { BackHandler, Keyboard } from "react-native";
import axios from "axios";

export default function Auth({ navigation }) {
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleBackButtonClick() {
    if (imagePosition.value === 1) {
      BackHandler.exitApp();
    } else {
      imagePosition.value = 1;
    }
    return true;
  }

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1, 2],
      [-height / 1.7, 0, -height / 1.1]
    );
    return {
      transform: [{ translateY: withTiming(interpolation, { duration: 800 }) }],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1, 2],
      [250, 0, 250]
    );
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0 || imagePosition.value === 2
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        imagePosition.value = 2;
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        imagePosition.value = 0;
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const save = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
  };

  const handleSubmit = async () => {
    runOnJS(
      (formButtonScale.value = withSequence(withSpring(1.1), withSpring(1)))
    );

    if (isRegistering) {
      try {
        const { data } = await axios({
          method: "POST",
          url: "http://api.cup2022.ir/api/v1/user",
          data: {
            name,
            email,
            password,
            passwordConfirm: password,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        Alert.alert("Success", "You have been registered sucessfully");
        save("token", JSON.stringify(data.data.token));

        //Reset the stack and navigate to the home screen
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } catch (error) {
        Alert.alert("Error occured", error);
        console.log(error);
      }
    } else {
      //login
      try {
        const { data } = await axios({
          method: "POST",
          url: "http://api.cup2022.ir/api/v1/user/login",
          data: {
            email,
            password,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });

        Alert.alert("Success", "You have been logged in sucessfully");
        save("token", JSON.stringify(data.data.token));

        //Reset the stack and navigate to the home screen
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } catch (error) {
        Alert.alert("Error occured", error);
        console.log(error.message);
      }
    }
  };

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 100} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height + 100} ry={height + 100} />
          </ClipPath>
          <Image
            href={require("../assets/login-background.jpg")}
            width={width + 25}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Animated.View
          style={[styles.closeButtonContainer, closeButtonContainerStyle]}
        >
          <Text
            onPress={() => {
              Keyboard.dismiss();
              imagePosition.value = 1;
            }}
          >
            X
          </Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            style={styles.textInput}
            value={email}
            textContentType="emailAddress"
            onChangeText={(text) => setEmail(text)}
          />
          {isRegistering && (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="black"
              style={styles.textInput}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          )}
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            textContentType="password"
          />
          <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Pressable onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {isRegistering ? "REGISTER" : "LOG IN"}
              </Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
