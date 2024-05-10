import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Animated } from 'react-native';

const KarekarePata = ({ navigation }) => {
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
                return 'Kare-kare goes well with white rice. Sauteed shrimp paste or bagoong alamang compliments this dish well and makes it stand out.';
            case 'INGREDIENTS':
                return '• 1.5 lbs. Pork shank pata, cut into 2 inch thick pieces\n' +
                       '• 1.13 cups crushed peanuts\n' +
                       '• 0.38 cup peanut butter\n' +
                       '• 1.5 medium Chinese eggplant sliced\n' +
                       '• 1.5 tablespoons fish sauce\n' +
                       '• 0.75 bunch bok choy cleaned\n' +
                       '• 1.13 cups string beans cut in 3 inches length\n' +
                       '• 0.75 medium onion diced\n' +
                       '• 3.75 cloves garlic crushed\n' +
                       '• 0.75 tablespoon annatto powder\n' +
                       '• 2.25 tablespoons cooking oil\n' +
                       '• 0.38 teaspoon ground black pepper\n' +
                       '• 1.5 cups water or beef broth\n' +
                       '• salt\n' +
                       '• 0.19 cup shrimp paste bagoong \n';
            case 'PROCEDURE':
                return '1.) Pour 2 quarts of water in a cooking pot. Let boil.\n' +
                        '2.) Add about 3 teaspoons of salt, and the put in the pork shank. Simmer for 1 hour.\n' +
                        '3.) Remove the pork from the cooking pot. Set aside.\n' +
                        '4.) In a clean cooking pot, heat oil. Saute the garlic and onion.\n' +
                        '5.) Add the ground black pepper. Stir. Add the pork. Cook for 2 minutes.\n' +
                        '6.) Put-in the fish sauce, crushed peanut, peanut butter, and annato powder. Stir.\n' +
                        '7.) Pour-in the beef broth (or water). Bring to a boil.\n' +
                        '8.) Simmer for 20 to 30 minutes while stirring once in a while. Add water as necessary.\n' +
                        '9.) When the texture thickens, add the eggplant. Cook for 5 minutes.\n' +
                        '10.) Put-in the string beans. Cook for 3 minutes.\n' +
                        '11.) Add the bok choy. Cover and then turn the heat off. Let the veggies cook using the residual heat for 5 to 7 minutes (do not remove the cover).\n' +
                        '12.) Transfer to a serving bowl. Serve with shrimp paste.\n';
            default:
                return 'Select a tab to see the content.';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconWrapper}>
                <Image
                  source={require('../assets/back_icon.png')}
                  style={styles.iconBack}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.text2}>Kare-kare Pata</Text>
              <TouchableOpacity style={styles.iconWrapper} onPress={goToSettings}>
                <Image
                  source={require('../assets/settings.png')}
                  style={styles.profileIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Image source={require('../assets/karekarepata.jpg')} style={styles.cardImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Kare-kare Pata</Text>
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
    padding: 10,// Adjust as needed
    // Other styles for the content container
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
  activeTab: {
    backgroundColor: '#FFD700', // A golden yellow for the active tab
    borderBottomWidth: 3,
    borderBottomColor: '#DAA520',
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
//Design and size ng Card sa loob.
  card: {
    width: 340, 
    height: 600, 
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


export default KarekarePata;