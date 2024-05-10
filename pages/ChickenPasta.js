import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Animated } from 'react-native';

const ChickenPasta = ({ navigation }) => {
    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState('OVERVIEW');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;

    // Function to handle fading in the content
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    const goToSettings = () => {
      navigation.navigate('Settings');
    };

    // Function to handle the button press animation
    const animateButtonPress = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };
  
    // Content based on active tab
    const getContent = () => {
        
      switch (activeTab) {
        case 'OVERVIEW':
          return 'Cheesy Chicken Pasta is a crowd-pleasing favorite, known for its creamy, rich sauce and tender chunks of chicken. Perfectly cooked pasta is tossed with a generous helping of melted cheese and succulent, seasoned chicken to create a comforting and delicious meal. Its simple yet satisfying, combining all the flavors you love in a classic pasta dish thats easy to make and even easier to love. This dish is a great go-to for a quick dinner that feels like a treat.';
          case 'INGREDIENTS':
            return '• 2 chicken breasts, cut into bite-size pieces\n' +
                   '• Salt and pepper to taste\n' +
                   '• 1 tbsp olive oil\n' +
                   '• 2 cloves garlic, minced\n' +
                   '• 1 tsp Italian seasoning\n' +
                   '• 1 cup heavy cream\n' +
                   '• 1 cup chicken broth\n' +
                   '• 1 cup grated Parmesan cheese\n' +
                   '• 8 oz pasta, such as penne or fettuccine\n' +
                   '• 1/4 cup chopped fresh parsley\n' +
                   '• Extra grated Parmesan cheese for garnish';
          case 'PROCEDURE':
            return '1.) Cook the pasta as per package instructions to al dente.\n' +
                   '2.) Season chicken with salt, pepper, and Italian seasoning.\n' +
                   '3.) In a pan, heat olive oil over medium heat and cook chicken until browned.\n' +
                   '4.) Add garlic and sauté for a minute, then pour in the cream and broth.\n' +
                   '5.) Stir in the Parmesan cheese until melted, then add the cooked pasta.\n' +
                   '6.) Garnish with parsley and extra cheese before serving.';
          default:
            return 'Select a tab to see the content.';
        }
      };
  
    return (
        // Cards content
        <View style={styles.container}>

        {/* Back button */}
        <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconWrapper}>
                <Image
                  source={require('../assets/back_icon.png')}
                  style={styles.iconBack}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.text2}>Chicken Pasta</Text>
              <TouchableOpacity style={styles.iconWrapper} onPress={goToSettings}>
                <Image
                  source={require('../assets/settings.png')}
                  style={styles.profileIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

        {/* Card content */}
        <View style={styles.card}>
          <Image source={require('../assets/cheesychickenpasta.jpg')} style={styles.cardImage} />
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Cheesy Chicken Pasta</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'OVERVIEW' && styles.activeTab]}
              onPress={() => setActiveTab('OVERVIEW')}
            >
              <Text style={styles.tabText}>OVERVIEW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'INGREDIENTS' && styles.activeTab]}
              onPress={() => setActiveTab('INGREDIENTS')}
            >
              <Text style={styles.tabText}>INGREDIENTS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'PROCEDURE' && styles.activeTab]}
              onPress={() => setActiveTab('PROCEDURE')}
            >
              <Text style={styles.tabText}>PROCEDURE</Text>
            </TouchableOpacity>
          </View>
          {/* Dynamic content */}
          <Text style={styles.contentText}>{getContent()}</Text>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    //Design ng mga text sa "INGREDIENTS" and "PROCEDURE"
    contentText: {
        color: 'white',
        marginTop: 20,
        fontWeight: '300',
        fontSize: 13,
        lineHeight: 20, 
        textAlign: 'justify', 
        paddingHorizontal: 10, 
      },
      content: {
        padding: 10, // Adjust as needed
        // Other styles for the content container
      },
      activeTab: {
        backgroundColor: '#FFD700', // A golden yellow for the active tab
        borderBottomWidth: 3,
        borderBottomColor: '#DAA520',
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
      profileIcon: {
        width: 35,
        height: 35,
        tintColor: '#333',
      },
    text2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center', // Center text horizontally
        flex: 1, // Take up remaining space
      },
      contentText: {
        color: 'white',
        marginTop: 20, 
        fontWeight: '300', 
        fontSize: 13,
      },

      buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center', 
        marginTop: 10, 
        backgroundColor: '#668067', 
        borderRadius: 20, 
        overflow: 'hidden', 
      },
      
      tabButton: {
        flex: 1, 
        paddingVertical: 8, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#D9D9D9', 
      },
      
      //text in buttons
      tabText: {
        color: '#668067', 
        fontSize: 11, 
        fontWeight: 'bold', 
        textAlign: 'center', 
      },


  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#668067',
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
    marginLeft: 10,

  },

  //text in header title
  text: {
    color: 'white',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'normal',
  
    position: 'absolute',
    top: 40,
    left: 50, 
  },

  cardImage: {
    width: '100%', 
    height: 200, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
   
  },

  textContainer: {
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 9, 
  },

  
//Text sa loob ng card 
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300', 
    textAlign: 'center', 
  },


  card: {
    width: 340, 
    height: 520, 
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
    alignItems: 'flex-start',
    marginTop: 20, 
  },
  cardImage: {
    width: '100%', 
    height: 200, 
    borderRadius: 15, 
  },
});


export default ChickenPasta;
