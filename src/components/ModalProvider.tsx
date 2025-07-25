import React from 'react';
import { Alert, Modal, StyleSheet, View, Text, Pressable } from 'react-native';
import { useRelationship } from '../context/relationship';
import { useNavigation } from '@react-navigation/native';

const ModalProvider = ({
  children,
  modalVisible,
  setModalVisible,
  breakUp,
}: {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  breakUp: () => void;
}) => {
  const { relationship } = useRelationship();
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1 }}>
      {children}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}
      >
        <View style={styles.screen}>
          <View style={styles.container}>
            <Text style={styles.title}>End Connection</Text>
            <Text style={styles.paragraph}>
              Are you sure you want to end your connection with{' '}
              {relationship?.partnerName}? Both parties will be notified and
              you'll both be able to generate new codes.
            </Text>
            <View style={styles.btnContainer}>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.btn1Container}
              >
                <Text style={styles.btn1text}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModalVisible(!modalVisible);
                  breakUp();
                  navigation.navigate('Dashboard');
                }}
                style={styles.btn2Container}
              >
                <Text style={styles.btn2text}>End Connection</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalProvider;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // This adds the dim, semi-transparent background
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },

  title: {
    fontWeight: '500',
    color: 'red',
    paddingVertical: 8,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
    marginBottom: 2,
    justifyContent: 'flex-end',
  },
  paragraph: {
    color: 'gray',
    lineHeight: 16,
  },
  btn1Container: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  btn2Container: {
    backgroundColor: 'red',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontWeight: '500',
  },
  btn2text: {
    color: 'white',
    fontWeight: '500',
  },
  btn1text: {
    fontWeight: '500',
  },
  container: {
    padding: 10,
    elevation: 4,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 8,
    borderColor: 'red',
  },
});
