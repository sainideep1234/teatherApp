import React, { useState } from 'react';
import { StyleSheet,  View, SafeAreaView,  Alert } from 'react-native';
import { useActiveCode } from '../context/activeCode';

import CardThree from '../components/CardThree';
import ConnectionCard from '../components/ConnectionCard';
import Header from '../components/Header';
import ModalProvider from '../components/ModalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRelationship } from '../context/relationship';
import { CURRENT_USER } from './Dashboard';

const Connection = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {relationship , setRelationship} = useRelationship();
  const {  setActiveCode } = useActiveCode();
  const breakUp = async () => {
    if (!relationship) return;

    await AsyncStorage.removeItem(`tether_relationship_${CURRENT_USER.id}`);
    await AsyncStorage.removeItem(
      `tether_relationship_${relationship.partnerId}`,
    );
    setRelationship(null);
    setActiveCode(null);
    Alert.alert('Connection ended.');
  };

  

  return (
    <ModalProvider
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      breakUp={breakUp}
    >
      <SafeAreaView style={styles.fullScreenContainer}>
        <Header />
        <View style={styles.contentArea}>
          <ConnectionCard setModalVisible={setModalVisible} />
          <CardThree />
        </View>
      </SafeAreaView>   
    </ModalProvider>
  );
};

export default Connection;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  openButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
