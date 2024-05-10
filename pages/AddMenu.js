import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig'; // Import your Firebase DB instance
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from expo/vector-icons
import { MaterialIcons } from '@expo/vector-icons';

const AddMenu = ({ navigation }) => {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [category, setCategory] = useState('');
  const [overview, setOverview] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [procedure, setProcedure] = useState('');
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleAddMenu = async () => {
    // Check if any field is empty
    if (!recipeTitle || !category || !overview || !ingredients || !procedure || !selectedImage) {
      Alert.alert('Error', 'Please fill out all fields and pick an image.');
      return;
    }
  
    // Set loading to true when starting the addition process
    setLoading(true);
  
    try {
      // Add menu data to Firebase
      const docRef = await addDoc(collection(FIREBASE_DB, 'menus'), {
        recipeTitle,
        category,
        overview,
        ingredients,
        procedure,
        imageURL: selectedImage,
        createdAt: new Date(), // Add createdAt field with current date
      });
      console.log('Document written with ID: ', docRef.id);
  
      // Reset the form fields after successful addition
      setRecipeTitle('');
      setCategory('');
      setOverview('');
      setIngredients('');
      setProcedure('');
      setSelectedImage(null);
      setSelectedImageName(null);
  
      // Display success alert after adding the menu
      Alert.alert(
        'Success',
        'New recipe added successfully!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Failed to add menu. Please try again later.');
    } finally {
      // Set loading back to false after the addition process is complete
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    // Reset the selected image URI
    setSelectedImage(null);
    // Reset any other state related to the image
    // For example:
    // setSelectedImageName(null);
  };

  const takePhotoFromCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access the camera is required!');
      return;
    }
  
    let pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.cancelled === true ) {
      console.log("Image capturing cancelled from camera.")
      return;
    }

    console.log("Picker Result:", pickerResult); 
  
    if (!pickerResult.cancelled) {
      if (pickerResult.uri) {
        console.log("Camera Image URI:", pickerResult.uri);
        setSelectedImage(pickerResult.uri);
        setSelectedImageName(pickerResult.uri.split('/').pop()); 
      } else {
        console.error("Error: Camera image URI is undefined");
      }
    } else {
      console.log("Image selection cancelled from camera.");
    }
  };  
  
  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
  
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      console.log("Image selection cancelled from library.");
      return;
    }
  
    console.log("Picker Result:", pickerResult);
  
    // Check if assets array exists and has at least one item
    if (pickerResult.assets && pickerResult.assets.length > 0) {
      const selectedAsset = pickerResult.assets[0]; // Select the first asset
      if (selectedAsset.uri) {
        console.log("Library Image URI:", selectedAsset.uri);
        setSelectedImage(selectedAsset.uri);
        setSelectedImageName(selectedAsset.fileName); // Use fileName from the selected asset
      } else {
        console.error("Error: Library image URI is undefined");
      }
    } else {
      console.error("Error: No image selected");
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
        <Text style={styles.text}>Add New Menu</Text>
        <TouchableOpacity style={styles.iconWrapper} onPress={goToProfile}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Text Inputs */}
      <View style={styles.formContainer}>

        {/* Image Picker */}
        <View style={styles.row2Container}>
          <TouchableOpacity style={styles.imagePickerButton} onPress={openImagePickerAsync}>
            <MaterialIcons name="image" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            {selectedImage && (
              <>
                <Image source={{ uri: selectedImage }} style={styles.image} />
                <TouchableOpacity style={styles.removeImageButton} onPress={handleRemoveImage}>
                  <MaterialIcons name="close" size={24} color="white" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        <View style={styles.rowContainer}>
          <TextInput
            style={[styles.input, styles.titleInput]} // Apply specific styles for the title input
            placeholder="Recipe Title"
            value={recipeTitle}
            onChangeText={setRecipeTitle}
          />
          <TextInput
            style={[styles.input, styles.categoryInput]} // Apply specific styles for the category input
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            multiline
          />
        </View>
        <TextInput
          style={styles.inputOthers}
          placeholder="Overview"
          value={overview}
          onChangeText={setOverview}
          multiline
        />
        <TextInput
          style={styles.inputOthers}
          placeholder="Ingredients"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
        />
        <TextInput
          style={styles.inputOthers}
          placeholder="Procedure"
          value={procedure}
          onChangeText={setProcedure}
          multiline
        />

        {/* Add Menu Button */}
        <TouchableOpacity style={styles.button} onPress={handleAddMenu}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" /> // Show activity indicator while loading
          ) : (
            <Text style={styles.buttonText}>Add Recipe</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewlyAdded')}>
          <Text style={styles.buttonText}>View Newly Added Recipes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#658067',
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
  imagePickerButton: {
    backgroundColor: '#d3d3d3',
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginRight: 10, // Add some space between button and image
    marginBottom: 10,
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center items vertically
  }, 
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
    borderRadius: 12,
    padding: 5,
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
  rowContainer: {
    flexDirection: 'row', // Arrange children horizontally
  },
  row2Container: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  input: {
    flex: 1, // Occupy remaining space
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  inputOthers: {
    width: '100%',
    height: 70,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  // Additional styles for the title input
  titleInput: {
    width: '100%',
  },
  // Additional styles for the category input
  categoryInput: {
    width: '100%',
    marginLeft: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginLeft: 10,
  },
  image: {
    width: 140,
    height: 85,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageName: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#34A132',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
    position: 'absolute',
    top: 40,
    left: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    position: 'absolute',
    top: 25,
    left: 50,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AddMenu;
