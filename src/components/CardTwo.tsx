import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRelationship } from '../context/relationship';
import { useActiveCode } from '../context/activeCode';
import { CURRENT_USER, Relationship } from '../screens/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CardTwo = () => {
  const [enteredCode, setEnteredCode] = useState('');
  const { relationship, setRelationship } = useRelationship();
  const {  setActiveCode } = useActiveCode();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const navigation = useNavigation<any>();

  const enterCode = async () => {
    if (relationship) {
      Alert.alert("You're already in a relationship!");
      return;
    }

    if (!enteredCode || enteredCode.length !== 8) {
      Alert.alert('Please enter a valid 8-digit code');
      return;
    }
    setIsConnecting(true);
    await new Promise(res => setTimeout(res, 1000));

    if (enteredCode === '00000000') {
      Alert.alert('Sorry, this person is already in a relationship.');
      return;
    }

    const partnerNames = ['Taylor', 'Emma', 'Ryan', 'Zendaya'];
    const partnerName =
      partnerNames[Math.floor(Math.random() * partnerNames.length)];
    const partnerId = `demo_user_${Date.now()}`;

    const newRel: Relationship = {
      partnerId,
      partnerName,
      startDate: Date.now(),
    };

    setRelationship(newRel);
    setIsConnecting(false);
    await AsyncStorage.setItem(
      `tether_relationship_${CURRENT_USER.id}`,
      JSON.stringify(newRel),
    );
    await AsyncStorage.removeItem(`tether_code_${CURRENT_USER.id}`);
    setActiveCode(null);
    setEnteredCode('');
    navigation.navigate('Connection');

    Alert.alert(`You're now connected with ${partnerName}!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Icon size={40} name="people-outline" color={'white'} />
      </View>
      <Text style={styles.title}>Enter A Code</Text>
      <Text style={styles.subtitle}>
        Enter somenone Code to establish connection
      </Text>
      <TextInput
        style={styles.inputBox}
        value={enteredCode}
        onChangeText={text => setEnteredCode(text.toUpperCase())}
        maxLength={8}
        placeholder="Enter 8-digit code"
      />
      <Pressable
        style={styles.gradientWrapper}
        onPress={() => {
          enterCode();
        }}
      >
        <LinearGradient
          colors={['#8A2BE2', '#BA55D3']} // Gradient colors from the screenshot
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>
            {isConnecting ? 'Connecting...' : 'Enter Code'}
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default CardTwo;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    color: 'grey',
  },
  gradientWrapper: {
    width: '100%',
    overflow: 'hidden',
    marginTop: 10,
    borderRadius: 8,
  },
  gradientButton: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: 'white',
  },
  inputBox: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginVertical: 10,
    width: '100%',
    borderRadius: 8,
  },
  iconCircle: {
    marginBottom: 10,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#C43867',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
