import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Image, FlatList, BackHandler, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDocs, setDoc, doc, deleteDoc, collection } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig'; 

const MainScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const scrollViewRef = useRef(); // Ref for the ScrollView

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
 
  const [cardElevation, setCardElevation] = useState(6);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowButtons(offsetY <= 0);
  };

  const scrollToRecipe = (recipeName) => {
    const recipeCardHeight = 300; // You'll need to adjust this based on your layout
    const recipes = ["Cheesy Chicken Soup", "Tiramisu", "Grilled Pork Belly", "Creamy Cucumber Salad", "Creamy Soup"];
    const index = recipes.findIndex((recipe) => recipe.toLowerCase() === recipeName.toLowerCase());
    if (index !== -1) {
      const y = index * recipeCardHeight; // Calculate the y coordinate to scroll to
      scrollViewRef.current?.scrollTo({ y, animated: true });
    }
  };

  const handleSearch = () => {
    // Assuming scrollToRecipe can handle the search logic
    const formattedQuery = searchQuery.trim().replace(/\s+/g, ' ').toLowerCase();
    scrollToRecipe(formattedQuery);
    setSuggestions([]); // Clear suggestions after search
  };

  const updateSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().toUpperCase().startsWith('C')) {
      setSuggestions(["Cheesy Chicken Soup", "Creamy Cucumber Salad", "Creamy Soup",]);
    } else {
      setSuggestions([]);
    }
  };

  // Function to handle suggestion press
  const onSuggestionPress = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    // Here call the scrollToRecipe or whatever logic you need to navigate to the recipe
  };

  React.useEffect(() => {
    const onBackPress = () => {
      // Prevent navigation back to login and signup screens
      return true;
    };

    // Add event listener to handle back button press
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Clean up event listener
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  return (
      <View style={styles.container}>
      {/* Title */}
      <View
        onTouchStart={() => setCardElevation(12)} // When the touch starts, increase elevation
        onTouchEnd={() => setCardElevation(6)} // When the touch ends, reset elevation
        style={[styles.titleCard, { elevation: cardElevation }]} // Apply dynamic elevation
      >
        <Text style={styles.title}>Find Best Recipes for Cooking</Text>
      </View>

   {/* Search bar */}
   <View style={styles.searchBar}>
        <Image
          source={require('../assets/search1.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes"
          placeholderTextColor="#575757"
          value={searchQuery}
          onChangeText={updateSearch}
          onSubmitEditing={() => handleSearch(searchQuery)}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.searchButtonInside}
          onPress={() => handleSearch(searchQuery)}
        >
          <Text style={{ color: '#FFFFFF' }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSuggestionPress(item)}>
              <Text style={styles.suggestionItem}>{item}</Text>
            </TouchableOpacity> 
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.suggestionsDropdown}
        />
      )}
         {/* Suggestions dropdown end here*/}

        {/* Search bar end here*/}
        
      {/* Content */}

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        alwaysBounceVertical={true} // This line is for iOS to ensure scrolling is always possible
      >
        {/* Cards */}

        {/* Cheesy Chicken Pasta Card */}
        <View style={styles.card}>
          <Image
            source={require('../assets/cheesychickenpasta.jpg')}
            style={styles.image}
          />
          <Text style={styles.description}>
            Cheesy Chicken Pasta
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ChickenPasta')} 
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleFavorite('Cheesy Chicken Pasta')}
            >
              <Icon
                name={favorites.includes('Cheesy Chicken Pasta') ? 'heart' : 'heart-o'}
                size={24}
                color={favorites.includes('Cheesy Chicken Pasta') ? '#FF1493' : '#000000'}
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* end cheesychickenpasta */}

        {/* tiramisu */}
        <View style={styles.card}>
          <Image
            source={require('../assets/dessert.png')}
            style={styles.image}
          />
          <Text style={styles.description}>
            Tiramisu
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Tiramisu')}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleFavorite('Tiramisu')}
            >
              <Icon
                name={favorites.includes('Tiramisu') ? 'heart' : 'heart-o'}
                size={24}
                color={favorites.includes('Tiramisu') ? '#FF1493' : '#000000'}
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* end tiramisu */}

        {/* grilled pork belly */}
        <View style={styles.card}>
          <Image
            source={require('../assets/grilledporkbelly.jpg')}
            style={styles.image}
          />
          <Text style={styles.description}>
            Grilled Pork Belly
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('GrilledPorkBelly')}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleFavorite('Grilled Pork Belly')}
            >
              <Icon
                name={favorites.includes('Grilled Pork Belly') ? 'heart' : 'heart-o'}
                size={24}
                color={favorites.includes('Grilled Pork Belly') ? '#FF1493' : '#000000'}
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* end grilled pork belly */}

        {/* creamy cucumber salad */}
        <View style={styles.card}>
          <Image
            source={require('../assets/creamycucumbersalad.jpg')}
            style={styles.image}
          />
          <Text style={styles.description}>
            Creamy Cucumber Salad
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CreamyCucumberSalad')}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleFavorite('Creamy Cucumber Salad')}
            >
              <Icon
                name={favorites.includes('Creamy Cucumber Salad') ? 'heart' : 'heart-o'}
                size={24}
                color={favorites.includes('Creamy Cucumber Salad') ? '#FF1493' : '#000000'}
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* end creamy cucumber salad */}

        {/* Add more cards here */}
        <View style={styles.card}>
          <Image
            source={require('../assets/soup.jpg')}
            style={styles.image}
          />
          <Text style={styles.description}>
            Creamy Soup
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CreamySoup')}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleFavorite('Creamy Soup')}
            >
              <Icon
                name={favorites.includes('Creamy Soup') ? 'heart' : 'heart-o'}
                size={24}
                color={favorites.includes('Creamy Soup') ? '#FF1493' : '#000000'}
                style={styles.favoriteIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        
      </ScrollView>

  {/* Show Categories and Add Menu buttons */}
  <View style={styles.floatingButtonsContainer}>
        <TouchableOpacity style={styles.floatingActionButton} onPress={() => navigation.navigate('Categories')}>
          <Text style={styles.actionButtonText}>Show More Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.floatingActionButton} onPress={() => navigation.navigate('AddMenu')}>
          <Text style={styles.actionButtonText}>Add Menu</Text>
        </TouchableOpacity>
      </View>
 {/* Show Categories and Add Menu buttons end here*/}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#658067', // Background color of the entire MainScreen
  },
  //Floating buttons start here 
  floatingButtonsContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  floatingActionButton: {
    backgroundColor: '#34A132',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 10,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
 // Title with card designs
 titleCard: {
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light semi-transparent card
  borderRadius: 15,
  padding: 15,
  marginTop: 20,
  marginBottom: 10,
  borderWidth: 1, 
  borderColor: '#ddd', 
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 6, // Slightly more offset
  },
  shadowOpacity: 0.35,
  shadowRadius: 6, 
  elevation: 8, 
  alignSelf: 'stretch',
  marginHorizontal: 20,
 },
title: {
  fontSize: 22, 
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  letterSpacing: 0.5, 
},
  // Search bar "Start here"
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align children to the start
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  
  // Adjustments to searchInput to make space for the button
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 0,
    paddingLeft: 45,
    paddingRight: 60,
  },
  searchButtonInside: {
    position: 'absolute',
    right: 15,
    backgroundColor: '#90a789',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  searchIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },    
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 20,
    paddingBottom:100,
  },
  card: {
    width: '97%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    marginBottom: 5,
    width: 340,
    height: 40, 
    overflow: 'hidden', 
    lineHeight: 35, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#34A132',
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  favoriteIcon: {
    marginRight: 15,
    marginLeft: 15,
  },

 //Show Categories and Add Menu buttons 
 actionButton: {
  backgroundColor: '#34A132',
  paddingVertical: 15,
  paddingHorizontal: 20,
  borderRadius: 25,
  marginHorizontal: 10,
  marginTop: 20,
  marginBottom: 20,
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
actionButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
},
bottomButtonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  width: '100%',
  alignSelf: 'center',
  padding: 10,
  backgroundColor: 'transparent',
},

// Choices from the search bar 
suggestionItem: {
  padding: 12,
  backgroundColor: '#FFFFFF',
  borderBottomWidth: 1,
  borderColor: '#eaeaea',
  fontSize: 16,
  color: '#333',
  paddingHorizontal: 20,
},
suggestionsDropdown: {
  position: 'absolute',
  top: 160,
  left: 10,
  right: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  borderRadius: 20,
  zIndex: 1000,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.3,
  shadowRadius: 15,
  elevation: 10,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#eaeaea',
},
});

export default MainScreen;
