import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Heart from 'react-native-vector-icons/AntDesign';

const CardThree = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Heart size={15} name={'heart'} color={'pink'}/>
        <Text style={styles.title}>How teather works</Text>
      </View>

      <Text style={styles.subtitle}>
        • Create time-bound codes for secure pairing
      </Text>
      <Text style={styles.subtitle}>
        • Share codes with trusted connections
      </Text>
      <Text style={styles.subtitle}>• Maintain exclusive partnerships</Text>
    </View>
  );
};

export default CardThree;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    lineHeight: 20,
    color: 'grey',
  },
  headingContainer:{
    flexDirection:'row',
    gap:8,
    alignItems:'center'
  }
});
