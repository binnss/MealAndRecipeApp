import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const email = user.email;
          const userDocRef = doc(FIREBASE_DB, 'users', email);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserData(userData);
          } else {
            console.log('User data not found');
          }
        } else {
          console.log('User not authenticated');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
      
    fetchUserData();
  }, []);
  const goToSettings = () => {
    navigation.navigate('Settings');
};
  useEffect(() => {
    if (successMessage) {
      Alert.alert(
        'Password Reset Email Sent',
        successMessage,
        [{ text: 'OK', onPress: () => setSuccessMessage('') }]
      );
    }
  }, [successMessage]);

  const handleResetPassword = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.log('User not authenticated');
      return;
    }
  
    const email = user.email;
  
    if (!email) {
      console.log('User email not found');
      return;
    }
  
    setLoading(true);
  
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent. Check your inbox.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to send password reset email. Please check your email address.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
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
        <Text style={styles.text}>Profile</Text>
        <TouchableOpacity style={styles.iconWrapper} onPress={goToSettings}>
          <Image
            source={require('../assets/settings.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {/* Blur container */}
      <View style={styles.blurContainer}>
        {userData ? (
          <React.Fragment>
            <Text>Your Email: {userData.email}</Text>
          </React.Fragment>
        ) : (
          <Text>No user data found</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleResetPassword}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Sending Email...' : 'Change my Password'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#658067', // Green background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurContainer: {
    width: '85%', // Fixed width
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background for blur effect
    borderRadius: 20, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Add padding for content spacing
    paddingVertical: 20, // Add padding for content spacing
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
  profileIcon: {
    width: 35,
    height: 35,
    tintColor: '#333',
  },
  card: {
    backgroundColor: '#658067',
    borderRadius: 20,
    marginBottom: 20,
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', // Center text horizontally
    flex: 1, // Take up remaining space
  },
  innerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    width: 75, // Adjust width as needed
    height: 130, // Adjust height as needed
    flexShrink: 0, // Prevent cards from shrinking when content exceeds width
  },
  horizontalScrollView: {
    flexDirection: 'row',
  },  
  cardContent: {
    padding: 15,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: 'blue',
  },
  recipeSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recipeItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#34A132',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Profile;
