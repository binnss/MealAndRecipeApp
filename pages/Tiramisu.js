import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Animated } from 'react-native';

const Tiramisu = ({ navigation }) => {
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

    const goToProfile = () => {
      // Navigate to the Profile screen, if you're using React Navigation
      navigation.navigate('Profile');
    };
  
    // Content based on active tab
    const getContent = () => {
        switch (activeTab) {
            case 'OVERVIEW':
                return 'Tiramisu is a classic Italian dessert layered with a blend of creamy mascarpone cheese, delicate espresso-soaked ladyfingers, a dusting of cocoa powder, and sometimes flavored with liquor. The result is a rich and indulgent treat that balances sweetness with the deep flavors of coffee.';
                case 'INGREDIENTS':
                    return '• 1 1/2 cups espresso or strong coffee, cooled to room temperature\n' +
                           '• 3 large eggs, separated, at room temperature\n' +
                           '• 1 cup sugar, divided into 1/2 cups\n' +
                           '• 8 ounces mascarpone cheese, at room temperature\n' +
                           '• 1 cup heavy whipping cream\n' +
                           '• 1 package ladyfingers (24 total), preferably Savoiardi\n' +
                           '• Unsweetened cocoa powder, for dusting\n' +
                           '• 2 tablespoons unsweetened cocoa powder, for dusting\n' +
                           '• Optional: 2 tablespoons Marsala wine, dark rum, or coffee liqueur';
            case 'PROCEDURE':
                return '1.) Brew the espresso or coffee and allow it to cool.\n' +
                       '2.) Separate the eggs, whisking the yolks with sugar until creamy, and beat the whites to stiff peaks.\n' +
                       '3.) Fold the mascarpone into the yolk mixture, then gently fold in the egg whites.\n' +
                       '4.) Dip the ladyfingers into the coffee and layer into a dish.\n' +
                       '5.) Spread a layer of the mascarpone mixture over the ladyfingers.\n' +
                       '6.) Repeat the layers and finish with a dusting of cocoa powder.\n' +
                       '7.) Refrigerate for several hours or overnight before serving.';
            default:
                return 'Select a tab to see the content.';
        }
    };

    return (
        // Cards content
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
              <Text style={styles.text2}>Tiramisu</Text>
              <TouchableOpacity style={styles.iconWrapper} onPress={goToProfile}>
                <Image
                  source={require('../assets/profile.png')}
                  style={styles.profileIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Card content */}
            <View style={styles.card}>
                <Image source={require('../assets/dessert.png')} style={styles.cardImage} />
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Tiramisu</Text>
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
     text2: {
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


export default Tiramisu;
