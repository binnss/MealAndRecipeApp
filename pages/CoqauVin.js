import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Animated } from 'react-native';

const CoqauVin = ({ navigation }) => {
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
                return 'Coq au Vin is the well-known French chicken stew where pieces of meat are braised in a luscious, glossy red wine sauce with bacon, mushroom and onions. Like Beef Bourguignon, the beauty of this dish lies in its simplicity. There are remarkably few ingredients and it’s a simple process, but the results are fit for a king – or queen!';
            case 'INGREDIENTS':
                return '• 4 chicken thighs , bone-in, skin on (~220g / 7 oz each) (Note 1)\n' +
                '• 4 chicken drumsticks (Note 1)\n' +
                '• 16 pearl onions or picking onions (Note 2)\n' +
                '• 1 bay leaf , fresh (dry also ok)\n' +
                '• 3 thyme sprigs (sub 1 tsp dried thyme)\n' +
                '• 750 ml / 3 cups pinot noir red wine , or other dry red wine (Note 3)\n' +
                '• 3 – 4 tbsp vegetable oil (or canola oil)\n' +
                '• 3/4 tsp salt (cooking/kosher salt, or 1/2 tsp table salt)\n' +
                '• 1/2 tsp pepper\n' +
                '• 400g / 14oz white mushrooms , halved (quartered if large) (Note 4)\n' +
                '• 150g / 5oz bacon piece , (speck) cut into 1 x 2.5cm / 0.4 x 1″ batons (Note 5)\n' +
                '• 60g / 4 tbsp unsalted butter\n' +
                '• 3 garlic cloves , finely minced (with knife)\n' +
                '• 2 tbsp tomato paste\n' +
                '• 7 tbsp flour , plain / all purpose\n' +
                '• 750 ml / 3 cups beef stock , low sodium, preferably homemade (Note 6)\n' +
                '• 1/4 tsp salt (cooking/kosher salt, or 1/8 tsp table salt) (Note 7)\n' +
                '• 1/4 tsp black pepper\n';

            case 'PROCEDURE':
                return '1.) Marinate chicken: Place the Chicken Marinade ingredients in a large glass or ceramic bowl or dish. Marinate overnight in the fridge.\n' +
                        '2.) Strain wine into a bowl. Reserve herbs and wine. Separate the chicken and onion.\n' +
                        '3.) Dry chicken: Spread chicken out on a try lined with paper towels, then pat dry with paper towels.\n' +
                        '4.) Reduce wine: Pour red wine into a saucepan and bring to a boil over medium high heat. Set aside.\n' +
                        '5.) Preheat oven to 180°C / 350°F (160°C fan).\n' +
                        '6.) Season chicken: Sprinkle chicken with 3/4 tsp salt and 1/2 tsp black pepper.\n' +
                        '7.) Brown chicken: Heat 3 tbsp oil in a large, heavy-based, oven-proof pot over medium-high heat. \n' +
                        '8.) Fry bacon: Remove any loose black burnt bits. Add a bit of extra oil if needed, then cook bacon for 3 minutes until golden.\n' +
                        '9.) Sauté mushrooms: Add mushrooms and cook for 5 minutes, or until golden. Remove into a separate bowl.\n' +
                        '10.) Sauté onion: Add a bit of extra oil if needed, then cook onions for 5 minutes or until there are nice golden patches.\n' +
                        '11.) Butter and flour: Add butter into pot. Once melted, add garlic and cook for a further 1 minute. Add tomato paste and cook for 2 minutes. Add flour and cook for 2 minutes.\n' +
                        '12.) Add wine and stock: While stirring, slowly pour in beef stock – this helps the flour dissolve lump-free into the stock. Then add the reduced wine and mix until flour mixture is dissolved and mostly lump-free. \n' +
                        '13.) Add everything back in: Add chicken, bacon, mushroom, thyme, bay leaf, salt and pepper into the pot, then stir.\n';
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
              <Text style={styles.text2}>Coq au Vin</Text>
              <TouchableOpacity style={styles.iconWrapper} onPress={goToSettings}>
                <Image
                  source={require('../assets/settings.png')}
                  style={styles.profileIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Image source={require('../assets/Coq au Vin.jpg')} style={styles.cardImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Coq au Vin</Text>
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
    height: 730, 
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
    marginTop: 80, 
  },
  cardImage: {
    width: '100%', 
    height: 200, 
    borderRadius: 15, 
  },
});


export default CoqauVin;
