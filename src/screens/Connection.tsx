import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';

import CardThree from '../components/CardThree';
import ConnectionCard from '../components/ConnectionCard';
import Header from '../components/Header';
import ModalProvider from '../components/ModalProvider';

const Connection = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ModalProvider
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
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
