import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig';

const MainScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;

  const goBack = () => {
    navigation.goBack();
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const CategoryPage = ({ route }) => {
    const { category } = route.params;
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      const fetchRecipes = async () => {
        const q = query(collection(FIREBASE_DB, 'menus'), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        const recipesData = [];
        querySnapshot.forEach((doc) => {
          recipesData.push({ id: doc.id, ...doc.data() });
        });
        setRecipes(recipesData);
      };
  
      fetchRecipes();
    }, [category]);
  
    return (
      <View style={styles.container}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <FlatList
          data={recipes}
          renderItem={({ item }) => (
            <View style={styles.recipeContainer}>
              <Text style={styles.recipeTitle}>{item.recipeTitle}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
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
        <Text style={styles.text}>Popular Categories</Text>
        <TouchableOpacity style={styles.iconWrapper} onPress={goToProfile}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>

        <TouchableOpacity
          style={[styles.card, { width: windowWidth / 2.2 }]}
          onPress={() => navigation.navigate('Pork')}>
          <Image
            source={require('../assets/pork.jpg')}
            style={[styles.image, { height: 120 }]}
          />
          <Text style={styles.description}>Pork</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[styles.card, { width: windowWidth / 2.2 }]}
          onPress={() => navigation.navigate('Chicken')}>
          <Image
            source={require('../assets/chicken.jpg')}
            style={[styles.image, { height: 120 }]}
          />
          <Text style={styles.description}>Chicken</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { width: windowWidth / 2.2 }]}
          onPress={() => navigation.navigate('Fish')}>
          <Image
            source={require('../assets/fish.jpg')}
            style={[styles.image, { height: 120 }]}
          />
          <Text style={styles.description}>Seafood</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { width: windowWidth / 2.2 }]}
          onPress={() => navigation.navigate('Beef')}>
          <Image
            source={require('../assets/beef.jpg')}
            style={[styles.image, { height: 120 }]}
          />
          <Text style={styles.description}>Beef</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { width: windowWidth / 2.2 }]}
          onPress={() => navigation.navigate('Soup')}>
          <Image
            source={require('../assets/soup.jpg')}
            style={[styles.image, { height: 120 }]}
          />
          <Text style={styles.description}>Soup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { width: windowWidth / 2.2 }]}
          onPress={() => navigation.navigate('Pasta')}>
          <Image
            source={require('../assets/pasta.jpg')}
            style={[styles.image, { height: 120 }]}
          />
          <Text style={styles.description}>Pasta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { width: windowWidth / 2.2 }]}
          onPress={() => navigation.navigate('Salad')}>
          <Image
            source={require('../assets/salad.jpg')}
            style={[styles.image, { height: 120 }]}
          />
          <Text style={styles.description}>Salad</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { width: windowWidth / 2.2 }]}
          onPress={() => navigation.navigate('Desserts')}>
          <Image
            source={require('../assets/dessert.png')}
            style={[styles.image, { height: 120 }]}
          />
          <Text style={styles.description}>Desserts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.floatingActionButton, styles.shadow]}
          onPress={() => navigation.navigate('NewlyAdded')}>
          <Text style={styles.actionButtonText}>View Newly Added</Text>
        </TouchableOpacity>

      </ScrollView>
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
  contentContainer: {
    justifyContent: 'center', // Center items horizontally
    backgroundColor: 'transparent', // Make the background transparent to allow the parent container's background color to show
    paddingVertical: 10, // Adjust this value as needed
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  header: {
    width: '90%', // Smaller width for the header card
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
    alignSelf: 'center', // This will center the header in its parent container
    marginTop: 20,
  },
  iconBack: {
    width: 25,
    height: 25,
    tintColor: '#333',
    marginLeft: -70,
  },
  iconWrapper: {
    flex: 1,
    justifyContent: 'center', // Center the icon vertically within the wrapper
    alignItems: 'center', // Center the icon horizontally within the wrapper
  },
  textWrapper: {
    flex: 4, // Reduce flex to allocate space for icons
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginLeft: 5, // Reduced margin to bring text closer to the back button
  },
  profileIcon: {
    width: 35,
    height: 35,
    tintColor: '#333',
    marginRight: -60,
  },
    //Designs for the back button and the title of "Popular Categories" end here
  image: {
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden', // Clip the content that overflows the specified border-radius
    marginBottom: 5,
  },
  description: {
    fontSize: 20,
    marginBottom: 5,
    width: '100%',
    textAlign: 'center',
  },
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
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default MainScreen;
