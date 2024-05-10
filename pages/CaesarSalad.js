import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Animated } from 'react-native';

const CaesarSalad = ({ navigation }) => {
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
                return 'A Caesar salad is a green salad of romaine lettuce and croutons dressed with lemon juice, olive oil, eggs or egg yolks, Worcestershire sauce, anchovies, garlic, Dijon mustard, Parmesan cheese, and black pepper.';
            case 'INGREDIENTS':
                return '• 2 small garlic cloves, minced (1 tsp)\n' +
                '• 2 tsp dijon mustard\n' +
                '• 1 tsp Worcestershire sauce\n' +
                '• 2 tsp fresh lemon juice\n' +
                '• 1 1/2 tsp red wine vinegar\n' +
                '• 1/3 cup extra virgin olive oil\n' +
                '• 1/2 tsp sea salt, or to taste\n' +
                '• 1/8 tsp black pepper, plus more to serve\n' +
                '• 1 large romaine lettuce, (or 2 small heads romaine)\n' +
                '• 1/3 cup parmesan cheese, shredded or shaved\n' ;
            case 'PROCEDURE':
                return '1.) In a small bowl, whisk together garlic, dijon, Worcestershire, lemon juice and red wine vinegar.\n' +
                       '2.) Slowly drizzle in extra virgin olive oil while whisking constantly.\n' +
                       '3.) Whisk in 1/2 tsp salt and 1/8 tsp black pepper, or season to taste.\n' +
                       '4.) Rinse, dry and chop or tear the romaine into bite-sized pieces. Place in a large serving bowl and sprinkle generously with shredded parmesan cheese and cooled croutons. Drizzle with caesar dressing and toss gently until lettuce is evenly coated.';
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
              <Text style={styles.text2}>Caesar Salad</Text>
              <TouchableOpacity style={styles.iconWrapper} onPress={goToSettings}>
                <Image
                  source={require('../assets/settings.png')}
                  style={styles.profileIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>


            <View style={styles.card}>
                <Image source={require('../assets/Caesar Salad.jpg')} style={styles.cardImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Caesar Salad</Text>
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


export default CaesarSalad;
