import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RecipeCard = ({ recipe }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{recipe.recipeTitle}</Text>
        <FontAwesome name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>Overview: {recipe.overview}</Text>
          <Text style={styles.cardText}>Ingredients: {recipe.ingredients}</Text>
          <Text style={styles.cardText}>Procedure: {recipe.procedure}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonStyle}>
              <FontAwesome name="edit" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle}>
              <FontAwesome name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#eee',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 15,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default RecipeCard;
