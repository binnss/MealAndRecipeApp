import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, ActivityIndicator , Alert } from 'react-native';
import { Calendar as CustomCalendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_DB } from '../FirebaseConfig'; // Import your Firebase DB instance
import { addDoc, collection } from 'firebase/firestore';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [menuDetails, setMenuDetails] = useState('');
  const [alarmDetails, setAlarmDetails] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [savingAlarm, setSavingAlarm] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setShowMenuModal(true);
    setShowAlarmModal(true);
  };

  const handleAddMenu = () => {
    setShowMenuModal(true);
  };

  const handleSetAlarm = () => {
    setShowAlarmModal(true);
  };

  const handleMenuSave = () => {
    // Save menu details
    console.log('Menu details:', menuDetails);
  
    // Clear the menu details input
    setMenuDetails('');
  
    setShowMenuModal(false);
  };

  const formatTime = (time) => {
    // Format the time as "hh:mmAM/PM"
    const hours = time.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = time.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
    const period = time.getHours() < 12 ? 'am' : 'pm';
    return `${hours}:${minutes}${period}`;
  };

  const handleAlarmSave = () => {
    const formattedTime = formatTime(alarmTime);
    
    // Start showing the activity indicator
    setSavingAlarm(true);
    
    // Save alarm details to Firestore
    const alarmsCollection = collection(FIREBASE_DB, 'alarms');
    addDoc(alarmsCollection, {
      date: selectedDate,
      time: formattedTime, // Save time as "hh:mmam/pm"
      menuDetails: menuDetails, // Optionally, include menu details
    })
    .then(() => {
      console.log('Alarm details saved successfully!');
      // Stop showing the activity indicator
      setSavingAlarm(false);
      // Show alert when alarm is saved
      Alert.alert('Success', 'Scheduled menu saved', [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]);
    })
    .catch((error) => {
      console.error('Error saving alarm details: ', error);
      // Stop showing the activity indicator
      setSavingAlarm(false);
      // Show alert when there is an error
      Alert.alert('Error', 'Failed to save alarm. Please try again.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]);
    });
  
    setShowAlarmModal(false);
    setShowTimePicker(false);
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
        <Text style={styles.text}>Calendar</Text>
        <TouchableOpacity style={styles.iconWrapper}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View style={styles.calendarContent}>
        <CustomCalendar
          style={{ width: '95%', aspectRatio: 7 }} // Adjust width and aspect ratio as needed
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'green' }
          }}
          onDayPress={handleDateSelect}
        />
      </View>
 
      {/* Alarm Modal */}
      <Modal visible={showAlarmModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>Set a Menu for {selectedDate}</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.alarmIcon}>
              <Ionicons name="alarm" size={24} color="white" />
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={alarmTime}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    setAlarmTime(selectedTime);
                  }
                }}
              />
            )}
            <View style={styles.selectedTimeContainer3}>
              <Text></Text>
              <Text style={styles.selectedTimeText3}>Selected Time: {alarmTime.toLocaleTimeString()}</Text>
            </View>
            {/* TextInput for entering menu */}
            <TextInput
              style={styles.input1}
              placeholder="Enter menu details"
              onChangeText={(text) => setMenuDetails(text)}
              value={menuDetails}
            />
            <View style={styles.buttonContainer3}>
            {savingAlarm ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <TouchableOpacity style={styles.button3} onPress={handleAlarmSave}>
                  <Text style={styles.buttonText3}>Save Alarm</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.button3, styles.cancelButton3]} onPress={() => setShowAlarmModal(false)}>
                <Text style={[styles.buttonText, styles.cancelButtonText3]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input1: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },  
  calendarContent: {
    flex: 1,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
    paddingHorizontal: 50, // Adjust horizontal padding
    marginTop: -250, // Adjust top margin
    height: 600,
    width: 500,
  },  
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button5: {
    backgroundColor: '#34A132',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText5: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    padding: 20,
    width: '90%', // Adjust the width as needed
    maxHeight: '70%', // Limit the height to 70% of the screen height
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  selectedTimeContainer3: {
    marginBottom: 20,
  },
  selectedTimeText3: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button3: {
    backgroundColor: '#34A132',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButton3: {
    backgroundColor: 'red',
    marginLeft: 10,
  },
  cancelButtonText3: {
    color: '#fff',
  },
  alarmIcon: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CalendarScreen;
