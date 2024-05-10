import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutUs = ({ navigation, imageSource, name, email, course }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const [expanded, setExpanded] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const openModal = () => {
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };
    
      // Your terms of service content
      const termsOfServiceContent = `
Privacy Policy
This Privacy Policy outlines how we collect, use, and disclose personal information when you use our Meal and Recipe app operated by MealAndRecipeOfficial. By using the App, you agree to the collection and use of information in accordance with this policy.
      
Information Collection and Use
We may collect personal information such as your name, email address, and location when you register an account or use certain features of the App. We use this information to provide you with personalized content, improve our services, and communicate with you.
      
Data Security
We take reasonable precautions to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
      
Third-Party Services
Our App may contain links to third-party websites or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
      
Changes to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
      
Contact Us
If you have any questions or concerns about our Privacy Policy, please contact us at [contact email].
      
Terms of Service
By accessing or using the App, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the App.
      
Content
The content provided in the App is for informational purposes only. We do not guarantee the accuracy, completeness, or usefulness of any information provided.
      
User Accounts
You may be required to create an account to access certain features of the App. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device.
      
Prohibited Activities
You agree not to engage in any of the following prohibited activities:
      
Use the App in any unlawful manner or for any illegal purpose.
Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity.
Interfere with or disrupt the operation of the App or servers or networks connected to the App.

Disclaimer
The App is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. We do not warrant that the App will be uninterrupted, secure, or error-free.
      
Limitation of Liability
In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or in any way connected with your use of the App.
      
Governing Law
These Terms of Service shall be governed by and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
      
Contact Us
If you have any questions about these Terms of Service, please contact us at [contact email].
`;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconWrapper}>
                    <Image
                        source={require('../assets/back_icon.png')}
                        style={styles.iconBack}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <Text style={styles.text}>About Us</Text>
                <TouchableOpacity style={styles.iconWrapper}>
                    <Image
                        source={require('../assets/profile.png')}
                        style={styles.profileIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* About Us content */}
                <View style={styles.contentContainer}>
                    <View style={styles.card}>
                        <Text style={styles.appName}>Welcome User!</Text>
                        <Text style={styles.description}>DishDelight</Text>
                        <Text style={styles.missionStatement}>An application that has a wide variety of recipes, quickly finds recipes that suit your tastes using intelligent search filters, and organizes your meals with an interactive calendar. Use automatic shopping lists to make grocery shopping easier, nutritional insights to help you make wise decisions, and a personalized profile to keep track of your culinary adventures. Get intelligent recipe suggestions, follow guided cooking instructions, and interact with a lively community to exchange advice and ideas. Dish Delight is your culinary ally, offering calorie tracking, ingredient substitutions, allergen alerts, and multi-device sync. It's more than just an app.
</Text>
                    </View>

                  

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Development Team</Text>
                        {/* First Row */}
                        <View style={styles.rowContainer}>
                            {/* First Card */}
                            <TouchableOpacity style={[styles.card2, { height: 180 }]} onPress={toggleDetails}>
                                {showDetails ? (
                                    <View style={styles.detailsContainer}>
                                        <Text>Course:</Text>
                                        <Text>Mobile Computing</Text>
                                        <Text>Email:</Text>
                                        <Text>qjbaluyut@tip.edu.ph</Text>
                                        <Text>Role:</Text>
                                        <Text>Developer</Text>
                                        <Text></Text>
                                    </View>
                                ) : (
                                    <Image
                                        source={require('../assets/jerome.jpg')}
                                        style={[styles.image, { height: 120 }]}
                                    />
                                )}
                                <Text style={styles.description2}>Baluyut</Text>
                                <Text style={styles.description3}>Jerome</Text>
                            </TouchableOpacity>
                            {/* Second Card */}
                            <TouchableOpacity style={[styles.card2, { height: 180 }]} onPress={toggleDetails}>
                                {showDetails ? (
                                    <View style={styles.detailsContainer}>
                                        <Text>Course:</Text>
                                        <Text>Mobile Computing</Text>
                                        <Text>Email:</Text>
                                        <Text>qlahibe@tip.edu.ph</Text>
                                        <Text>Role:</Text>
                                        <Text>Developer</Text>
                                        <Text></Text>
                                    </View>
                                ) : (
                                    <Image
                                        source={require('../assets/lei.jpeg')}
                                        style={[styles.image, { height: 120 }]}
                                    />
                                )}
                                <Text style={styles.description2}>Hibe</Text>
                                <Text style={styles.description3}>Leila</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Second Row */}
                        <View style={styles.rowContainer}>
                            {/* Third Card */}
                            <TouchableOpacity style={[styles.card2, { height: 180 }]} onPress={toggleDetails}>
                                {showDetails ? (
                                    <View style={styles.detailsContainer}>
                                        <Text>Course:</Text>
                                        <Text>Mobile Computing</Text>
                                        <Text>Email:</Text>
                                        <Text>qcjagabotero@tip.edu.ph</Text>
                                        <Text>Role:</Text>
                                        <Text>Developer</Text>
                                        <Text></Text>
                                    </View>
                                ) : (
                                    <Image
                                        source={require('../assets/jovan.jpg')}
                                        style={[styles.image, { height: 120 }]}
                                    />
                                )}
                                <Text style={styles.description2}>Gabotero</Text>
                                <Text style={styles.description3}>Claude</Text>
                            </TouchableOpacity>
                            {/* Fourth Card */}
                            <TouchableOpacity style={[styles.card2, { height: 180 }]} onPress={toggleDetails}>
                                {showDetails ? (
                                    <View style={styles.detailsContainer}>
                                        <Text>Course:</Text>
                                        <Text>Mobile Computing</Text>
                                        <Text>Email:</Text>
                                        <Text>qnlagunda@tip.edu.ph</Text>
                                        <Text>Role:</Text>
                                        <Text>Developer</Text>
                                        <Text></Text>
                                    </View>
                                ) : (
                                    <Image
                                        source={require('../assets/nads.jpeg')}
                                        style={[styles.image, { height: 120 }]}
                                    />
                                )}
                                <Text style={styles.description2}>Lagunda</Text>
                                <Text style={styles.description3}>Naehdine</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Third Row */}
                        <View style={styles.rowContainer}>
                            {/* Fifth Card */}
                            <TouchableOpacity style={[styles.card2, { height: 180 }]} onPress={toggleDetails}>
                                {showDetails ? (
                                    <View style={styles.detailsContainer}>
                                        <Text>Course:</Text>
                                        <Text>Mobile Computing</Text>
                                        <Text>Email:</Text>
                                        <Text>qjvtlopez@tip.edu.ph</Text>
                                        <Text>Role:</Text>
                                        <Text>Developer</Text>
                                        <Text></Text>
                                    </View>
                                ) : (
                                    <Image
                                        source={require('../assets/vince.jpg')}
                                        style={[styles.image, { height: 120 }]}
                                    />
                                )}
                                <Text style={styles.description2}>Lopez</Text>
                                <Text style={styles.description3}>Vince</Text>
                            </TouchableOpacity>
                            {/* Sixth Card */}
                            <TouchableOpacity style={[styles.card2, { height: 180 }]} onPress={toggleDetails}>
                                {showDetails ? (
                                    <View style={styles.detailsContainer}>
                                        <Text>Course:</Text>
                                        <Text>Mobile Computing</Text>
                                        <Text>Email:</Text>
                                        <Text>qkrmsamala@tip.edu.ph</Text>
                                        <Text>Role:</Text>
                                        <Text>Developer</Text>
                                        <Text></Text>
                                    </View>
                                ) : (
                                    <Image
                                        source={require('../assets/kait.png')}
                                        style={[styles.image, { height: 120 }]}
                                    />
                                )}
                                <Text style={styles.description2}>Samala</Text>
                                <Text style={styles.description3}>Kaitlyn</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Meal and Recipe</Text>
                        <Text style={styles.version}>Version: 1.0.0</Text>
                        <Text></Text>
                        <TouchableOpacity onPress={openModal}>
                            <Text style={styles.legal}>Privacy Policy | Terms of Service</Text>
                        </TouchableOpacity>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={closeModal}
                        >
                            <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <ScrollView>
                                    <Text style={styles.modalText}>{termsOfServiceContent}</Text>
                                </ScrollView>
                                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </Modal>

                        <Text style={styles.acknowledgments}>This app uses the following open-source libraries:</Text>
                        <Text>- React Native</Text>
                        <Text>- Firebase</Text>
                    </View>
                </View>
                    
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#658067', // Green background color
        alignItems: 'center',
        justifyContent: 'center',
     },
    header: {
        width: '95%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 20,
    },
    card: {
        backgroundColor: '#e5e5e5',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '97.8%',
    }, 
    contentContainer: {
        marginTop: 10,
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    detailsContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        marginBottom: 5,
    },
    description2: {
        fontSize: 16,
        width: '100%',
        textAlign: 'center',
    },
    description3: {
        fontSize: 27,
        marginBottom: 5,
        width: '100%',
        textAlign: 'center',
    },
    card2: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width: '48%',
        marginBottom: 5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        marginLeft: 8,
        marginRight: 8,
    },
    iconBack: {
        width: 25,
        height: 25,
        tintColor: '#333',
    },
    iconWrapper: {
        padding: 5,
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
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    missionStatement: {
        fontStyle: 'italic',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
      legal: {
        fontSize: 16,
        color: '#007AFF', // Change the color to your preference
        textDecorationLine: 'underline',
      },
    contact: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    acknowledgments: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        elevation: 5,
      },
      modalText: {
        fontSize: 16,
        marginBottom: 15,
      },
      closeButton: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#2196F3',
      },
      closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
});

export default AboutUs;
