import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { setDoc, doc, getDoc, getFirestore } from 'firebase/firestore'; // Import Firestore functions

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data

  const auth = FIREBASE_AUTH;
  const db = getFirestore(); // Get Firestore instance

  const navigation = useNavigation(); 

  const signIn = async () => {
    // Validation: Check if email and password are not empty
    if (!email || !password) {
        alert('Email and password are required');
        return;
    }
    setLoading(true);
    try {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, email, password);
        
        // Check if user document already exists with the email as the ID
        const userDocRef = doc(db, 'users', email);
        const userDocSnapshot = await getDoc(userDocRef);
        
        if (!userDocSnapshot.exists()) {
            // Create a new user document with email as the ID
            await setDoc(userDocRef, {
                email: email,
                // You can add other user data here if needed
            });
        }
        
        // Fetch user data from Firestore based on email
        const userData = userDocSnapshot.data();
        
        // Ensure userData contains the name field
        if (userData && userData.name) {
            // Update state with user data
            setUserData(userData);
        } else {
            console.log('Name not found in user data');
        }
        
        // Navigate to the main screen if the user has signed up
        navigation.navigate('Main');
    } catch (error) {
        console.log(error);
        alert('Sign in failed: ' + error.message);
        setShowForgotPassword(true); // Show Forgot Password text on incorrect login attempt
    } finally {
        setLoading(false);
    }
};


  return (
    <ImageBackground source={require('../assets/bg.jpg')} resizeMode="cover" style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          
          <KeyboardAvoidingView behavior="padding">
            <Text style={{ fontSize: 27 }}>Log in</Text>
            <Text style={{ fontSize: 12 }}>Welcome back! Please log in to continue</Text>
            <Text style={{ fontSize: 12 }}>  </Text>
            
            {/* Sign In Form */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>
            )}
            <Text style={{ fontSize: 12 }}>  </Text>
            {/* Conditionally render Forgot Password text */}
            {showForgotPassword && (
              <Text style={[styles.signInText, { textAlign: 'center' }]} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password? </Text>
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
  signInText: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
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
});

export default SignInScreen;
