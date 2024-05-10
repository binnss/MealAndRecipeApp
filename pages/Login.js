import React, { useState } from 'react';
import { Platform, Alert, Text, View, StyleSheet, TextInput, ImageBackground, TouchableOpacity, Image, Linking, ActivityIndicator, Button, KeyboardAvoidingView} from 'react-native';
import 'react-native-gesture-handler';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Add email state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  // Function to handle sign up and store user data
  const handleSignUpAndStoreUserData = async (email, password, name) => {
    const auth = FIREBASE_AUTH;
    const firestore = getFirestore();
  
    try {
      // Sign up the user using Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
      // Store additional user data in Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        email: email,
        name: name,
        // Add other user data here if needed
      });
  
      console.log('User signed up successfully and data stored in Firestore.');
      return user;
    } catch (error) {
      console.error('Error signing up user:', error);
      throw error;
    }
  };
  

  // Sign up function
  const signUp = async () => {
    // Validation: Check if any of the fields are empty
    if (!name || !email || !password || !confirmPassword) {
      alert('All fields are required');
      return;
    }
  
    // Validation: Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    setLoading(true);
    try {
      // Call the function to handle sign up and store user data
      await handleSignUpAndStoreUserData(email, password, { name, email });

      // Display success alert
      Alert.alert(
        'Sign up successful!',
        '',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn'), // Navigate to SignIn screen
          },
        ],
      );
    } catch (error) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }; 

    return (
      <ImageBackground source={require('../assets/bg.jpg')} resizeMode="cover" style={styles.container}>
        <View style={styles.overlay}>
          <View style={styles.formContainer}>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
              <Text style={{ fontSize: 27 }}>Create an Account</Text>
              <Text style={{ fontSize: 12 }}>Let's help you set up your account, it won't take long</Text>
              <Text style={{ fontSize: 12 }}>  </Text>
              {/* Registration Form */}
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />          
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
      
              {/* Sign-up button */}
              <TouchableOpacity style={styles.button} onPress={signUp}>
                <Text style={styles.buttonText}>Sign-up</Text>
              </TouchableOpacity>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Text style={[styles.signInText, { textAlign: 'center' }]} onPress={() => navigation.navigate('SignIn')}>Already have an account? </Text>
              )}
            </KeyboardAvoidingView>
          </View>
        </View>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#34A132',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  optionButton: {
    width: 70, // Adjust width as needed
    height: 50, // Adjust height as needed
    borderRadius: 25, // Make it round
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 30, // Adjust size as needed
    height: 30, // Adjust size as needed
  },
});

export default LoginScreen;