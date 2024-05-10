import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

const EditProfile = ({ navigation }) => {
  
  const goToProfile = () => {
    navigation.navigate('Profile');
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
        <Text style={styles.text}>Favorites</Text>
        <TouchableOpacity style={styles.iconWrapper} onPress={goToProfile}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Edit Profile</Text>
      {/* Profile editing fields */}
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Full Name" />
      <TextInput style={styles.input} placeholder="Bio/Description" />
      {/* Other profile editing fields */}
      <Button title="Save Changes" onPress={() => {/* Save changes and navigate back */}} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  header: {
    width: '95%', // Take full width of the screen
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items with space between them
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
    position: 'absolute', // Position the header absolutely
    top: 0, // Position it at the top of the screen
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
    textAlign: 'center', // Center text horizontally
    flex: 1, // Take up remaining space
  },
 profileIcon: {
    width: 35,
    height: 35,
    tintColor: '#333',
  },
});

export default EditProfile;
