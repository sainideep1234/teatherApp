import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Cross from 'react-native-vector-icons/Entypo';

const ConnectionCard = ({
  setModalVisible,
}: {
  setModalVisible: (e: any) => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Icon size={30} name="heart" color={'white'} />
      </View>
      <Text style={styles.title}>In a Relationship</Text>
      <Text style={styles.subtitle}>
        You're in a relationship with{' '}
        <Text style={styles.name}>Ariana Grande </Text>since July 23, 2025.
      </Text>

      <Pressable style={styles.badge} onPress={() => setModalVisible(true)}>
        <Cross size={20} name="cross" color={'grey'} />

        <Text style={styles.badgetitle}>End Relationship</Text>
      </Pressable>
    </View>
  );
};

export default ConnectionCard;

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitle: { color: 'grey', textAlign: 'center' },
  badge: {
    margin: 10,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    paddingHorizontal: 6,
    borderRadius: 6,
    borderColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    elevation: 2,
    backgroundColor: 'white',
  },
  badgetitle: {
    fontWeight: '500',
    color: 'red',
  },
  iconCircle: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: '#C43867',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    margin: 10,
  },
  name: {
    fontWeight: '600',
    color: '#F33A6A',
  },
});
