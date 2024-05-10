import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FIREBASE_DB } from '../FirebaseConfig'; // Import your Firebase DB instance
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const AlarmScreen = ({ navigation }) => {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const fetchAlarms = async () => {
      const alarmsCollection = collection(FIREBASE_DB, 'alarms');
      const querySnapshot = await getDocs(alarmsCollection);
      const alarmList = [];
      querySnapshot.forEach((doc) => {
        alarmList.push({ id: doc.id, ...doc.data() });
      });
      setAlarms(alarmList);
    };

    fetchAlarms();
  }, []);

  const handleDeleteAlarm = async (id) => {
    // Show confirmation alert
    Alert.alert(
      'Delete Alarm',
      'Are you sure you want to delete this alarm?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Delete alarm from Firebase
              await deleteDoc(doc(collection(FIREBASE_DB, 'alarms'), id));
              // Filter out the deleted alarm from the alarms state
              setAlarms(alarms.filter((alarm) => alarm.id !== id));
            } catch (error) {
              console.error('Error deleting alarm:', error);
              // Show error alert
              Alert.alert('Error', 'Failed to delete alarm. Please try again.');
            }
          },
        },
      ],
      { cancelable: false }
    );
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
        <Text style={styles.text}>Scheduled Menus</Text>
        <TouchableOpacity style={styles.iconWrapper}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Alarms */}
      <View style={styles.cardContainer}>
        {alarms.length === 0 ? (
          <Text>No alarms set</Text>
        ) : (
          alarms.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <Text style={styles.alarmText}>Date: {item.date}</Text>
              <Text style={styles.alarmText}>Time: {item.time}</Text>
              <Text style={styles.alarmText}>Menu: {item.menuDetails}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteAlarm(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    width: '90%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
    elevation: 3,
    marginTop: 10,
    marginButtom: 10,
  },
  alarmText: {
    fontSize: 16,
    color: 'black',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AlarmScreen;
