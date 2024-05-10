import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure you've installed this package
import { getDocs, setDoc, doc, deleteDoc, collection } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig'; 

const Chicken = ({ navigation }) => {
  // States for each favorite dish
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Function to fetch favorites from Firestore
    const fetchFavorites = async () => {
      try {
        const favoritesSnapshot = await getDocs(collection(FIREBASE_DB, 'favorites'));
        const favoritesData = favoritesSnapshot.docs.map(doc => doc.data().recipe);
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  // Function to toggle favorite
  const toggleFavorite = async (recipe) => {
    try {
      // Check if the recipe is already favorited
      const isFavorited = favorites.includes(recipe);

      if (isFavorited) {
        // Remove the recipe from favorites
        await deleteDoc(doc(FIREBASE_DB, 'favorites', recipe));
        setFavorites(favorites.filter((favRecipe) => favRecipe !== recipe));
      } else {
        // Add the recipe to favorites
        await setDoc(doc(FIREBASE_DB, 'favorites', recipe), { recipe });
        setFavorites([...favorites, recipe]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const goToProfile = () => {
    // Navigate to the Profile screen, if you're using React Navigation
    navigation.navigate('Profile');
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconWrapper}>
          <Image
            source={require('../assets/back_icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.text}>CHICKEN</Text>
        <TouchableOpacity style={styles.iconWrapper} onPress={goToProfile}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.transparentCard}>
          {/* Card for Cheesy Chciken Pasta */}
          <View style={styles.whiteCard}>
            <Image
              source={require('../assets/cheesychickenpasta.jpg')}
              style={styles.foodImage}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.foodTitle}>Chicken Pasta</Text>
              <Text style={styles.foodDescription}> Perfectly cooked pasta tossed pieces of chicken with creamy sauce</Text>
              
              <View style={styles.authorContainer}>
                <Text style={styles.authorName}>By Kathryn Bernardo</Text>
                <TouchableOpacity onPress={() => toggleFavorite('Chicken Pasta')}>
                  <Icon
                    name={favorites.includes('Chicken Pasta') ? 'heart' : 'heart-o'}
                    size={16}
                    color={favorites.includes('Chicken Pasta') ? 'red' : 'black'}
                    style={styles.favoriteIcon}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ChickenPasta')} style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Card for Chicken Masala */}
          <View style={styles.whiteCard}>
            {/* You should have an image for Chicken Masala Pata in your assets */}
            <Image
              source={require('../assets/Chicken Masala.jpg')} 
              style={styles.foodImage}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.foodTitle}>Chicken Masala</Text>
              <Text style={styles.foodDescription}>A Indian dish featuring roasted chunks of chicken enveloped in a creamy, spiced tomato sauce.</Text>
              <View style={styles.authorContainer}>
                <Text style={styles.authorName}>By Niki Samantha</Text>
                <TouchableOpacity onPress={() => toggleFavorite('Chicken Masala')}>
                  <Icon
                    name={favorites.includes('Chicken Masala') ? 'heart' : 'heart-o'}
                    size={16}
                    color={favorites.includes('Chicken Masala') ? 'red' : 'black'}
                    style={styles.favoriteIcon}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ChickenMasala')} style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card for Coq au Vin */}
          <View style={styles.whiteCard}>
            {/* You should have an image for Coq au Vin in your assets */}
            <Image
              source={require('../assets/Coq au Vin.jpg')} 
              style={styles.foodImage}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.foodTitle}>Coq au Vin</Text>
              <Text style={styles.foodDescription}>French dish where chicken is braised slowly in red wine</Text>
              <View style={styles.authorContainer}>
                <Text style={styles.authorName}>By Liza Soberano</Text>
                <TouchableOpacity onPress={() => toggleFavorite('Coq au Vin')}>
                  <Icon
                    name={favorites.includes('Coq au Vin') ? 'heart' : 'heart-o'}
                    size={16}
                    color={favorites.includes('Coq au Vin') ? 'red' : 'black'}
                    style={styles.favoriteIcon}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('CoqauVin')} style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  foodDescription: {
    color: 'black',
    fontSize: 12,
    paddingBottom: 10, // Adjust as needed for proper spacing
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: '#6DA34D',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,   
  },
  viewButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  favoriteIcon: {
    marginLeft: 8,
  },
  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#668067',
    paddingTop: 40,
  },
  //Designs for the back button and the title of "Popular Categories" start here
  header: {
    width: '95%', // Smaller width for the header card
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
    alignSelf: 'center', // This will center the header in its parent container
    marginBottom: 10,
  },
  iconWrapper: {
    flex: 1,
    justifyContent: 'center', // Center the icon vertically within the wrapper
    alignItems: 'center', // Center the icon horizontally within the wrapper
  },
  icon: {
    marginLeft: -90,
    marginRight: 5, // Adjust the right margin as needed
    width: 25,
    height: 25,
    tintColor: '#333',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginLeft: 5, // Reduced margin to bring text closer to the back button
  },
  profileIcon: {
    marginRight: -90,
    marginLeft: 5, // Adjust the left margin as needed
    width: 35,
    height: 35,
    tintColor: '#333',
  },
  card: {
    width: '90%',
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 20,
  },
  transparentCard: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 20,
    marginBottom: 20,
  },
  whiteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%', // You can adjust this if needed and if it's within a larger container
    height: 180, // Increased from 140 to 180, adjust this value as needed
    padding: 10,
    marginBottom: 10,
  },
  foodImage: {
    width: '50%',
    height: '100%',
    borderRadius: 10,
  },
  textContainer: {
    width: '50%',
    justifyContent: 'center',
    padding: 10,
  },
  foodTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    
  },
  authorName: {
    fontSize: 13,
    color: 'gray',
  },
});

export default Chicken;
