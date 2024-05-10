import 'intl-pluralrules';
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, Image, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoginScreen from './pages/Login';
import MainScreen from './pages/Main';
import SignInScreen from './pages/SignIn';
import ChickenPastaScreen from './pages/ChickenPasta'; 
import TiramisuScreen from './pages/Tiramisu';
import GrilledPorkBellyScreen from './pages/GrilledPorkBelly';
import CreamyCucumberSaladScreen from './pages/CreamyCucumberSalad';
import CreamySoupScreen from './pages/CreamySoup'; 
import AddMenu from './pages/AddMenu';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import Pork from './pages/Pork';
import Chicken from './pages/Chicken';
import Fish from './pages/Fish';
import Beef from './pages/Beef';
import Soup from './pages/Soup';
import Pasta from './pages/Pasta';
import Salad from './pages/Salad';
import Desserts from './pages/Desserts';
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';
import EditProfile from './pages/EditProfile';
import KarekarePata from './pages/KarekarePata';
import PorkBinagoongan from './pages/PorkBinagoongan';
import ChickenMasala from './pages/ChickenMasala';
import CoqauVin from './pages/CoqauVin';
import GrilledSalmon from './pages/GrilledSalmon';
import FishTacos from './pages/FishTacos';
import SushiPlatter from './pages/SushiPlatter';
import ItalianBeef from './pages/ItalianBeef';
import BeefWellington from './pages/BeefWellington';
import KoreanBulgogi from './pages/KoreanBulgogi';
import FrenchOnionSoup from './pages/FrenchOnionSoup';
import ButternutSquashSoup from './pages/ButternutSquashSoup';
import ClamChowder from './pages/ClamChowder';
import Carbonara from './pages/Carbonara';
import PestoGenovese from './pages/PestoGenovese';
import SeafoodLinguine from './pages/SeafoodLinguine';
import CaesarSalad from './pages/CaesarSalad';
import GreekSalad from './pages/GreekSalad';
import QuinoaTabbouleh from './pages/QuinoaTabbouleh';
import CarrotCake from './pages/CarrotCake';
import RhubarbCake from './pages/RhubarbCake';
import StrawberryCake from './pages/StrawberryCake';
import Favorites from './pages/Favorites';
import NewlyAdded from './pages/NewlyAdded';
import AboutUs from './pages/AboutUs';
import Calendar from './pages/Calendar';
import InviteFriends from './pages/InviteFriends';
import AlarmScreen from './pages/AlarmScreen';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const logoScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoScale, {
      toValue: 1, // Scale to full size
      duration: 2500,
      easing: Easing.elastic(2.5), // Elastic easing for a bouncy effect
      useNativeDriver: true,
    }).start(); // Start the animation
  }, []);

  const handleExploreNow = () => {
    setIsLoading(true);
    // Simulate a delay for demonstration purposes
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Login');
    }, 2000); // Adjust the delay time as needed
  };

  return (
    <ImageBackground source={require('./assets/bg.jpg')} resizeMode="cover" style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.overlay}>
        <Animated.View
          style={{
            transform: [{ scale: logoScale }], // Apply scaling transformation
            opacity: logoScale, // Apply opacity based on the scale
          }}
          >
          <Image source={require('./assets/finalsplash.png')} style={styles.logo} />
        </Animated.View>
        <TouchableOpacity style={styles.button} onPress={handleExploreNow} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Get Started</Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        /*
        TransitionPresets.DefaultTransition: Default transition animation.
        TransitionPresets.ModalPresentationIOS: Modal presentation animation for iOS.
        TransitionPresets.ModalSlideFromBottomIOS: Modal slide animation from bottom for iOS.
        TransitionPresets.ModalSlideFromBottomIOS: Modal slide animation from bottom for iOS.
        TransitionPresets.FadeFromBottomAndroid: Fade animation from bottom for Android.
        TransitionPresets.RevealFromBottomAndroid: Reveal animation from bottom for Android.
        TransitionPresets.SlideFromRightIOS: Slide animation from right to left for iOS.
        TransitionPresets.SlideFromLeftIOS: Slide animation from left to right for iOS.
        TransitionPresets.ScaleFromCenterAndroid: Scale animation from center for Android.
        */
          ...TransitionPresets.SlideFromRightIOS, // Choose animation preset
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChickenPasta" component={ChickenPastaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tiramisu" component={TiramisuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GrilledPorkBelly" component={GrilledPorkBellyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreamyCucumberSalad" component={CreamyCucumberSaladScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreamySoup" component={CreamySoupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddMenu" component={AddMenu} options={{ headerShown: false }} />
        <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Pork" component={Pork} options={{ headerShown: false }} />
        <Stack.Screen name="Chicken" component={Chicken} options={{ headerShown: false }} />
        <Stack.Screen name="Fish" component={Fish} options={{ headerShown: false }} />
        <Stack.Screen name="Beef" component={Beef} options={{ headerShown: false }} />
        <Stack.Screen name="Soup" component={Soup} options={{ headerShown: false }} />
        <Stack.Screen name="Pasta" component={Pasta} options={{ headerShown: false }} />
        <Stack.Screen name="Salad" component={Salad} options={{ headerShown: false }} />
        <Stack.Screen name="Desserts" component={Desserts} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="KarekarePata" component={KarekarePata} options={{ headerShown: false }} />
        <Stack.Screen name="PorkBinagoongan" component={PorkBinagoongan} options={{ headerShown: false }} />
        <Stack.Screen name="ChickenMasala" component={ChickenMasala} options={{ headerShown: false }} />
        <Stack.Screen name="CoqauVin" component={CoqauVin} options={{ headerShown: false }} />
        <Stack.Screen name="GrilledSalmon" component={GrilledSalmon} options={{ headerShown: false }} />
        <Stack.Screen name="FishTacos" component={FishTacos} options={{ headerShown: false }} />
        <Stack.Screen name="SushiPlatter" component={SushiPlatter} options={{ headerShown: false }} />
        <Stack.Screen name="ItalianBeef" component={ItalianBeef} options={{ headerShown: false }} />
        <Stack.Screen name="BeefWellington" component={BeefWellington} options={{ headerShown: false }} />
        <Stack.Screen name="KoreanBulgogi" component={KoreanBulgogi} options={{ headerShown: false }} />
        <Stack.Screen name="FrenchOnionSoup" component={FrenchOnionSoup} options={{ headerShown: false }} />
        <Stack.Screen name="ButternutSquashSoup" component={ButternutSquashSoup} options={{ headerShown: false }} />
        <Stack.Screen name="ClamChowder" component={ClamChowder} options={{ headerShown: false }} />
        <Stack.Screen name="Carbonara" component={Carbonara} options={{ headerShown: false }} />
        <Stack.Screen name="PestoGenovese" component={PestoGenovese} options={{ headerShown: false }} />
        <Stack.Screen name="SeafoodLinguine" component={SeafoodLinguine} options={{ headerShown: false }} />
        <Stack.Screen name="CaesarSalad" component={CaesarSalad} options={{ headerShown: false }} />
        <Stack.Screen name="GreekSalad" component={GreekSalad} options={{ headerShown: false }} />
        <Stack.Screen name="QuinoaTabbouleh" component={QuinoaTabbouleh} options={{ headerShown: false }} />
        <Stack.Screen name="CarrotCake" component={CarrotCake} options={{ headerShown: false }} />
        <Stack.Screen name="RhubarbCake" component={RhubarbCake} options={{ headerShown: false }} />
        <Stack.Screen name="StrawberryCake" component={StrawberryCake} options={{ headerShown: false }} />
        <Stack.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
        <Stack.Screen name="NewlyAdded" component={NewlyAdded} options={{ headerShown: false }} />
        <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
        <Stack.Screen name="InviteFriends" component={InviteFriends} options={{ headerShown: false }} />
        <Stack.Screen name="AlarmScreen" component={AlarmScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 250,
  },
  button: {
    backgroundColor: '#34A132',
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 40,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});