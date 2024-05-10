import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import i18n from 'i18next';

const Settings = ({ navigation, favorites }) => {
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language
  const auth = getAuth();

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleSignOut = async () => {
    try {
      // Set loading to true to show the activity indicator
      setIsLoading(true);
  
      // Display a confirmation dialog
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Sign Out',
            onPress: async () => {
              try {
                // Get authentication instance
                const auth = getAuth();
  
                // Perform sign-out operation
                await signOut(auth);
  
                // Show signed out successfully alert
                Alert.alert(
                  'Signed Out',
                  'Signed out successfully',
                  [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                  { cancelable: false }
                );
              } catch (error) {
                console.error('Error signing out:', error.message);
              } finally {
                // Set loading to false when sign-out process ends
                setIsLoading(false);
                
                // Navigate to the authentication screen
                navigation.navigate('Login');
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error handling sign out:', error.message);
      // Set loading to false in case of error
      setIsLoading(false);
    }
  };   

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconWrapper}>
          <Image
            source={require('../assets/back_icon.png')}
            style={styles.iconBack}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.text}>Settings</Text>
        <TouchableOpacity style={styles.iconWrapper} onPress={goToProfile}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
        {/* Settings options */}
        <View style={styles.container2}>
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Calendar')}>
            <Text style={styles.settingText}>Calendar</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Favorites', { favorites: favorites })}>
            <Text style={styles.settingText}>Favorites</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('AlarmScreen')}>
            <Text style={styles.settingText}>Scheduled Menu</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('NewlyAdded')}>
            <Text style={styles.settingText}>Newly Added Recipes</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('AboutUs')}>
            <Text style={styles.settingText}>About Us</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleSignOut} disabled={isLoading}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="white" />
                <Text style={[styles.settingText, { marginLeft: 10 }]}>Signing Out...</Text>
              </View>
            ) : (
              <>
                <Text style={[styles.settingText, { color: 'white' }]}>Sign Out</Text>
                <Ionicons name="exit" size={24} color="white" />
              </>
            )}
          </TouchableOpacity>

          {/* Sign Out option */}
          <View>
            {/* Conditionally render activity indicator */}
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            {/* Your other UI components */}
          </View>
        </View>

        {/* Bottom navigation icons */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Ionicons name="home" size={30} color="white" />
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#658067',
  },
  container2: {
    marginTop: 100, 
    width: '93%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  favoriteItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  header: {
    width: '95%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
    position: 'absolute',
    top: 0,
  },
  iconBack: {
    width: 25,
    height: 25,
    tintColor: '#333',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  profileIcon: {
    width: 35,
    height: 35,
    tintColor: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 18,
    color: 'white',
  },
  bottomNavigation: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 30,
    justifyContent: 'space-evenly', // Change to evenly distribute the buttons
    alignItems: 'center', // Center items vertically
    backgroundColor: '#658067', // Set background color
    height: 60, // Set a fixed height for the navigation bar
    paddingHorizontal: 20, // Add padding to the sides for spacing
    bottom: 0, // Align at the bottom of the screen
    width: '100%', // Take full width of the screen
  },
});

export default Settings;
