import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Animated } from 'react-native';

const GrilledSalmon = ({ navigation }) => {
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
    const goToSettings = () => {
      navigation.navigate('Settings');
    };

    // Content based on active tab
    const getContent = () => {
        switch (activeTab) {
            case 'OVERVIEW':
                return 'There are plenty of delicious ways to marinate fish for grilling, but were partial to this sweet and savory salmon marinade: Salmon filets are seasoned with lemon pepper, garlic powder, and salt, then marinated in a delicious combination of the following ingredients: soy sauce, brown sugar, water, and vegetable oil. Make sure to let the filets marinate in the fridge for at least two hours to reach their full flavor potential.';
            case 'INGREDIENTS':
                return '• ½ pounds salmon fillets\n' +
                          '•lemon pepper to taste\n' +
                          '•garlic powder to taste\n' +
                          '•salt to taste\n' +
                          '•⅓ cup soy sauce\n' +
                          '•⅓ cup brown sugar\n' +
                          '•⅓ cup water\n' +
                          '•¼ cup vegetable oil;\n';
            case 'PROCEDURE':
                return '1.) Season salmon fillets with lemon pepper, garlic powder, and salt.\n' +
                       '2.) Stir soy sauce, brown sugar, water, and vegetable oil together in a small bowl until sugar is dissolved. Place fish in a large resealable plastic bag; add soy sauce mixture, seal, and turn to coat. Refrigerate for at least 2 hours.\n' +
                       '3.) Preheat an outdoor grill for medium heat and lightly oil the grate.\n' +
                       '4.) Place salmon on the preheated grill, and discard marinade. Cook salmon until fish flakes easily with a fork, about 6 to 8 minutes per side.\n';
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
              <Text style={styles.text2}>Grilled Salmon</Text>
              <TouchableOpacity style={styles.iconWrapper} onPress={goToSettings}>
                <Image
                  source={require('../assets/settings.png')}
                  style={styles.profileIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Image source={require('../assets/grilled salmon.jpg')} style={styles.cardImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Grilled Salmon</Text>
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
        padding: 10, // Adjust as needed
        // Other styles for the content container
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
    height: 550, 
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


export default GrilledSalmon;
