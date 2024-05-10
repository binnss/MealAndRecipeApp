import React, { createContext, useContext, useState } from 'react';
import { Text } from 'react-native';
import i18n from 'i18n-js';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is English

  // Initialize i18n only if it's not already initialized
  if (!i18n.translations) {
    i18n.translations = {
      en: {
        greeting: 'Hello',
      },
      fr: {
        greeting: 'Bonjour',
      },
      // Add more languages here
      zh: {
        greeting: '你好',
      },
      ko: {
        greeting: '안녕하세요',
      },
    };

    // Set default locale
    i18n.locale = language;
  }

  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'en' ? 'fr' : 'en')); // Toggle between English and French
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
