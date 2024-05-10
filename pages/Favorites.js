import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig';

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
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

  const goToProfile = () => {
    navigation.navigate('Profile');
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
        <Text style={styles.text}>Favorites</Text>
        <TouchableOpacity style={styles.iconWrapper} onPress={goToProfile}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Display favorites */}
      <View style={styles.cardContainer}>
        {favorites && favorites.length > 0 ? (
          favorites.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => {/* Handle onPress event */}}>
              <Text style={styles.favoriteItem}>{item}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No favorites added yet!</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#658067',
  },
  cardContainer: {
    width: '90%',
    marginTop: 110, // Adjusted to accommodate the header height
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
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#34A132',
    elevation: 3,
  },
  favoriteItem: {
    fontSize: 18,
    color: 'white',
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
    textAlign: 'center',
    flex: 1,
  },
  profileIcon: {
    width: 35,
    height: 35,
    tintColor: '#333',
  },
});

export default Favorites;
