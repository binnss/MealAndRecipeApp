import React from 'react';
import { Text, TouchableOpacity } from 'react-native'; // Import TouchableOpacity for button

import { useLanguage } from '../contexts/LanguageContext'; // Adjust the path accordingly

const SomeComponent = () => {
  const { language, toggleLanguage } = useLanguage();

  // Define your translations
  const translations = {
    en: {
      greeting: 'Hello',
    },
    fr: {
      greeting: 'Bonjour',
    },
  };

  const handleToggleLanguage = () => {
    toggleLanguage(); // Toggle the language when the button is pressed
  };

  return (
    <>
      <Text>{translations[language].greeting}</Text>
      <TouchableOpacity onPress={handleToggleLanguage}>
        <Text>Change Language</Text>
      </TouchableOpacity>
    </>
  );
};

export default SomeComponent;
