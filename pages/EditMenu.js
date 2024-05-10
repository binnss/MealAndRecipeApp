import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, ActivityIndicator } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig'; // Import your Firebase DB instance

const EditRecipe = ({ navigation, route }) => {
  const { id, recipeTitle: initialRecipeTitle, category: initialCategory, overview: initialOverview, ingredients: initialIngredients, procedure: initialProcedure, imageURL: initialImageURL } = route.params;
  
  const [recipeTitle, setRecipeTitle] = useState(initialRecipeTitle);
  const [category, setCategory] = useState(initialCategory);
  const [overview, setOverview] = useState(initialOverview);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [procedure, setProcedure] = useState(initialProcedure);
  const [loading, setLoading] = useState(false);

  const handleUpdateRecipe = async () => {
    // Check if any field is empty
    if (!recipeTitle || !category || !overview || !ingredients || !procedure) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
  
    // Set loading to true when starting the update process
    setLoading(true);
  
    try {
      // Update recipe data in Firebase
      await updateDoc(doc(FIREBASE_DB, 'menus', id), {
        recipeTitle,
        category,
        overview,
        ingredients,
        procedure,
      });
  
      // Display success alert after updating the recipe
      Alert.alert(
        'Success',
        'Recipe updated successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error updating recipe: ', error);
      Alert.alert('Error', 'Failed to update recipe. Please try again later.');
    } finally {
      // Set loading back to false after the update process is complete
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
        <Text style={styles.text}>Edit Recipe</Text>
      </View>

      {/* Text Inputs */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Recipe Title"
          value={recipeTitle}
          onChangeText={setRecipeTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Overview"
          value={overview}
          onChangeText={setOverview}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Ingredients"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Procedure"
          value={procedure}
          onChangeText={setProcedure}
          multiline
        />

        {/* Update Recipe Button */}
        <TouchableOpacity style={styles.button} onPress={handleUpdateRecipe}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" /> // Show activity indicator while loading
          ) : (
            <Text style={styles.buttonText}>Update Recipe</Text>
          )}
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
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
});

export default EditRecipe;
