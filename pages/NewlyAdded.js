import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert, Modal} from 'react-native';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore'; // Import updateDoc
import { FIREBASE_DB } from '../FirebaseConfig';
import { FontAwesome } from '@expo/vector-icons';

const NewlyAdded = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [editingIds, setEditingIds] = useState([]);
  const [editedDescriptions, setEditedDescriptions] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [allergicIngredients, setAllergicIngredients] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesCollectionRef = collection(FIREBASE_DB, 'menus');
        const q = query(recipesCollectionRef, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const newRecipes = [];
          querySnapshot.forEach((doc) => {
            const { category, imageURL, ingredients, overview, procedure, recipeTitle, } = doc.data();
            newRecipes.push({
             id: doc.id,
                category,
                imageURL,
                ingredients,
                overview,
                procedure,
                recipeTitle,
            });
          });
          setRecipes(newRecipes);
          checkAllergicIngredients(newRecipes);  // Check for allergens right after setting the recipes
        });
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
  
    fetchRecipes();
  }, []);

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleUpdate = (id) => {
    const updatedEditingIds = editingIds.includes(id)
      ? editingIds.filter((editingId) => editingId !== id)
      : [...editingIds, id];
    setEditingIds(updatedEditingIds);
  };

  const handleUpdateConfirm = async (id) => {
    try {
      const editedRecipe = editedDescriptions[id] || {};
      const updatedRecipeData = {
        overview: editedRecipe.overview || recipes.find((recipe) => recipe.id === id).overview,
        ingredients: editedRecipe.ingredients || recipes.find((recipe) => recipe.id === id).ingredients,
        procedure: editedRecipe.procedure || recipes.find((recipe) => recipe.id === id).procedure,
      };
  
      // Update the document in Firebase with the edited description
      await updateDoc(doc(FIREBASE_DB, 'menus', id), updatedRecipeData);
      console.log('Recipe updated successfully');
  
      // Show an alert indicating that the recipe was updated successfully
      Alert.alert('Success', 'Recipe updated successfully');
  
      // Fetch the updated recipes and update the state
      const updatedRecipesCollectionRef = collection(FIREBASE_DB, 'menus');
      const updatedQuerySnapshot = await getDocs(updatedRecipesCollectionRef);
      const updatedRecipes = [];
      updatedQuerySnapshot.forEach((doc) => {
        const { category, imageURL, ingredients, overview, procedure, recipeTitle } = doc.data();
        updatedRecipes.push({
          id: doc.id,
          category,
          imageURL,
          ingredients,
          overview,
          procedure,
          recipeTitle,
        });
      });
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  
    // Remove the recipe id from editingIds
    const updatedEditingIds = editingIds.filter((editingId) => editingId !== id);
    setEditingIds(updatedEditingIds);
  };
  
  const handleDelete = async (id) => {
    try {
      // Show an alert to confirm the deletion
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this recipe?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await deleteDoc(doc(FIREBASE_DB, 'menus', id));
              console.log('Recipe deleted successfully');
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleDescriptionChange = (id, field, value) => {
    const newEditedDescriptions = {
      ...editedDescriptions,
      [id]: {
        ...editedDescriptions[id],
        [field]: value,
      },
    };
  
    // If the value is empty or contains only white spaces, remove the field from the editedDescriptions
    if (value.trim() === '') {
      delete newEditedDescriptions[id][field];
    }
  
    setEditedDescriptions(newEditedDescriptions);
    const hasEditedField = Object.keys(newEditedDescriptions[id]).length > 0;
    const updatedEditingIds = hasEditedField
      ? [...editingIds, id]
      : editingIds.filter((editingId) => editingId !== id);

    setEditingIds(updatedEditingIds);
  };
  
  const isEditing = (id) => editingIds.includes(id);

  const checkAllergicIngredients = (recipes) => {
    const allergens = [
      'Peanuts', 
      'Peanut',
      'peanuts',
      'peanut',
      'Milk',
      'Milks',
      'milk',
      'milks',
      'Eggs',
      'Egg',
      'eggs',
      'egg',
      'Nuts',
      'Nut',
      'nuts',
      'nut',
      'Soy',
      'soy',
      'Wheat',
      'wheat',
      'Fishes',
      'Fish',
      'fishes',
      'fish',
      'Sesame',
      'sesame',
      'Sulfite',
      'sulfite',
      'Celery',
      'celery',
      'Lupin',
      'lupin',
      'Gelatin',
      'gelatin',
      'shellfish', 
      'milk', 
      'eggs', 
      'soy', 
      'wheat'];
    const allergicItems = recipes.reduce((acc, recipe) => {
      allergens.forEach(allergen => {
        if (recipe.ingredients.toLowerCase().includes(allergen)) {
          acc.push(`${allergen} in ${recipe.recipeTitle}`);
        }
      });
      return acc;
    }, []);
  
    if (allergicItems.length > 0) {
      showAlertForAllergicIngredients(allergicItems);
    }
  };
  
  const showAlertForAllergicIngredients = (allergicItems) => {
    Alert.alert(
      'Allergic Ingredients Warning',
      `Please check these ingredients as they might cause allergies:\n${allergicItems.join('\n')}`,
      [{ text: 'OK', onPress: () => console.log('Alert dismissed') }],
      { cancelable: false,
        style: 'default',
        textStyles: { fontSize: 20 } // Increase font size
       }
    );
  };

  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView0}>
          <View style={styles.modalView0}>
            <Text style={styles.modalText0}>Some recipes contain ingredients you may be allergic to. Please review carefully.</Text>
            <TouchableOpacity
              style={styles.closeButton0}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.closeButtonText0}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconWrapper}>
          <Image
            source={require('../assets/back_icon.png')}
            style={styles.iconBack}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.text}>Newly Added Recipes</Text>
        <TouchableOpacity style={styles.iconWrapper} onPress={goToProfile}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        data={recipes}
        renderItem={({ item }) => (
          <View style={styles.whiteCard}>
            <Image
              source={{ uri: item.imageURL }}
              style={styles.foodImage}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.titleContainer}>
                  <Text style={styles.foodTitle}>{item.recipeTitle}</Text>
                  <TouchableOpacity onPress={() => handleUpdate(item.id)}>
                    <FontAwesome name="pencil" size={15} color="gray" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.foodDescription2}>{item.category}</Text>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.foodDescription}>Overview:</Text>
                  {isEditing(item.id) ? (
                    <TextInput
                    style={styles.editableDescription}
                    multiline
                    value={(editedDescriptions[item.id]?.overview !== undefined && editedDescriptions[item.id]?.overview !== '') ? 
                      editedDescriptions[item.id]?.overview : item.overview}
                    onChangeText={(value) =>
                      handleDescriptionChange(item.id, 'overview', value)
                    }
                  />
                  ) : (
                    <Text style={styles.foodDescription2}>{item.overview}</Text>
                  )}
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.foodDescription}>Ingredients:</Text>
                  {isEditing(item.id) ? (
                    <TextInput
                      style={styles.editableDescription}
                      multiline
                      value={editedDescriptions[item.id]?.ingredients || item.ingredients}
                      onChangeText={(value) =>
                        handleDescriptionChange(item.id, 'ingredients', value)
                      }
                    />
                  ) : (
                    <Text style={styles.foodDescription2}>{item.ingredients}</Text>
                  )}
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.foodDescription}>Procedure:</Text>
                  {isEditing(item.id) ? (
                    <TextInput
                      style={styles.editableDescription}
                      multiline
                      value={editedDescriptions[item.id]?.procedure || item.procedure}
                      onChangeText={(value) =>
                        handleDescriptionChange(item.id, 'procedure', value)
                      }
                    />
                  ) : (
                    <Text style={styles.foodDescription2}>{item.procedure}</Text>
                  )}
                </View>
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.updateButton]}
                    onPress={() => handleUpdateConfirm(item.id)}
                  >
                    <Text style={styles.buttonText}>Update Recipe</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete Recipe</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={ // Rendered when there are no items in the FlatList
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No recipes added yet</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#658067',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
  },
  emptyListText: {
    fontSize: 16,
    color: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  flatList: {
    alignSelf: 'center',
    width: '90%',
  },
  whiteCard: {
    flexDirection: 'column', // Change flexDirection to 'column'
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    minHeight: 250,
    padding: 10,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  foodImage: {
    width: '100%', // Set width to 100% to occupy the entire width of the card
    height: 150, // Set a fixed height for the image
    borderTopLeftRadius: 10, // Ensure the top-left and top-right corners are rounded
    borderTopRightRadius: 10,
  },
  textContainer: {
    width: '100%', // Ensure text container occupies the entire width of the card
    justifyContent: 'center', // Align text vertically in the center
    padding: 10,
  },
  foodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  foodDescription: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  foodDescription2: {
    color: 'black',
    fontSize: 15,
    paddingBottom: 10,
    width: '70%',
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray', // Change the color as needed
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingBottom: 5, // Adjust padding as needed
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 0,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: '#34A132',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  editableDescription: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginTop: 2,
    marginBottom: 2,
    height: 70, // Adjust height as needed
    width: '70%',
  },




  centeredView0: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView0: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText0: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton0: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButtonText0: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NewlyAdded;
