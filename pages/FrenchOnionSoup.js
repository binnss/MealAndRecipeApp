import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Animated } from 'react-native';

const FrenchOnionSoup = ({ navigation }) => {
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
                return 'French onion soup is a soup of onions, gently fried and then cooked in meat stock or water, usually served gratinéed with croutons or a larger piece of bread covered with cheese floating on top. Onion soups were known in France since medieval times, but the version now familiar dates from the mid-19th century.';
            case 'INGREDIENTS':
                return '• 6 large red or yellow onions (about 3 pounds)\n' +
                '• 4 tablespoons extra virgin olive oil\n' +
                '• 2 tablespoons butter\n' +
                '• 1 teaspoon sugar\n' +
                '• Kosher salt\n' +
                '• 2 cloves garlic, minced\n' +
                '• 8 cups beef stock, chicken stock, or a combination of the two\n' +
                '• 1/2 cup dry vermouth or dry white wine\n' +
                '• 2 bay leaves\n' +
                '• 1 tablespoon fresh thyme leaves, a few sprigs of fresh thyme, OR 1/2 teaspoon dried thyme\n' +
                '• 1/2 teaspoon freshly ground black pepper\n' +
                '• 2 tablespoons brandy (optional)\n' +
                '• 8 slices (1 inch thick) French bread or baguette\n' +
                '• 1 1/2 cups grated Gruyere cheese\n' +
                '• Sprinkling grated Parmesan cheese';
            case 'PROCEDURE':
                return '1.) Peel and slice the onions: Peel and thinly slice the onions from root to stem. There should be about 10 cups of sliced onions in total.\n' +
                       '2.) Begin caramelizing the onions with olive oil and butter: In a 5 to 6 quart thick-bottomed pot, heat 3 tablespoons of olive oil on medium heat. Add the onions and toss to coat with the olive oil.\n' +
                       '3.) Sprinkle with the sugar, finish caramelizing, and add garlic: Sprinkle with sugar (to help with the caramelization) and 1 teaspoon of salt. Continue to cook until the onions are well browned, about 10 to 15 more minutes.\n' +
                       '4.) Deglaze the pot with vermouth or wine: Add the wine or vermouth to the pot and scrape up the browned bits on the bottom and sides of the pot, deglazing the pot as you go.\n' +
                       '5.) Add the stock, bay leaves, and thyme: Add the stock, bay leaves, and thyme. Bring to a simmer, cover the pot and lower the heat to maintain a low simmer. Cook for about 30 minutes.\n' +
                       '6.) Season and add the brandy: Season to taste with more salt and add freshly ground black pepper. Discard the bay leaves. Add brandy if using.';
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
              <Text style={styles.text2}>French Onion Soup</Text>
              <TouchableOpacity style={styles.iconWrapper} onPress={goToSettings}>
                <Image
                  source={require('../assets/settings.png')}
                  style={styles.profileIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>


            <View style={styles.card}>
                <Image source={require('../assets/French Onion Soup.jpg')} style={styles.cardImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>French Onion Soup</Text>
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


export default FrenchOnionSoup;
