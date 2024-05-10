import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!email) {
      setErrorMessage('Please enter your email');
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
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
    <ImageBackground source={require('../assets/bg.jpg')} resizeMode="cover" style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <KeyboardAvoidingView behavior="padding">
            <Text style={{ fontSize: 27 }}>Forgot Password</Text>
            <Text style={{ fontSize: 12 }}>Let's help you reset your password.</Text>
            <Text style={{ fontSize: 12 }}> </Text>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Send Reset Email</Text>
              </TouchableOpacity>
            )}
            <Text style={[styles.signInText, { textAlign: 'center' }]} onPress={() => navigation.goBack()}>Go back to Sign In</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  signInText: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#34A132',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  success: {
    color: 'green',
    marginBottom: 10,
  },
});

export default ForgotPasswordScreen;
