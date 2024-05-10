import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const InviteFriends = ({ navigation }) => {
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
        <Text style={styles.text}>Invite your Friends</Text>
        <TouchableOpacity style={styles.iconWrapper}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {/* Calendar content */}
      <View style={styles.calendarContent}>
        <Text style={styles.calendarText}>adwdasdawd</Text>
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
  calendarContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default InviteFriends;
