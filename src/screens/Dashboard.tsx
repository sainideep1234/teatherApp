import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/Card';
import CardTwo from '../components/CardTwo';
import CardThree from '../components/CardThree';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface TetherCode {
  code: string;
  createdAt: number;
  expiresAt: number;
  userId: string;
  userName: string;
}
interface Relationship {
  partnerId: string;
  partnerName: string;
  startDate: number;
}

const CURRENT_USER = {
  id: 'user_123',
  name: 'Alex Chen',
};

function Dashboard() {
  const [activeCode, setActiveCode] = useState<TetherCode | null>(null);
  const [enteredCode, setEnteredCode] = useState('');
  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const savedCode = await AsyncStorage.getItem(
        `tether_code_${CURRENT_USER.id}`,
      );
      const savedRelationship = await AsyncStorage.getItem(
        `tether_relationship_${CURRENT_USER.id}`,
      );

      if (savedCode) {
        const code = JSON.parse(savedCode);
        if (code.expiresAt > Date.now()) {
          setActiveCode(code);
        } else {
          await AsyncStorage.removeItem(`tether_code_${CURRENT_USER.id}`);
        }
      }

      if (savedRelationship) {
        setRelationship(JSON.parse(savedRelationship));
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!activeCode) return;

    const updateTimer = () => {
      const now = Date.now();
      const remaining = activeCode.expiresAt - now;

      if (remaining <= 0) {
        setActiveCode(null);
        AsyncStorage.removeItem(`tether_code_${CURRENT_USER.id}`);
        setTimeRemaining('');
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      setTimeRemaining(`${hours}h ${minutes}m remaining`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [activeCode]);

  const generateCode = async () => {
    if (relationship) {
      Alert.alert("You're already in a relationship!");
      return;
    }

    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const now = Date.now();
    const expiresAt = now + 24 * 60 * 60 * 1000;

    const newCode: TetherCode = {
      code,
      createdAt: now,
      expiresAt,
      userId: CURRENT_USER.id,
      userName: CURRENT_USER.name,
    };

    setActiveCode(newCode);
    await AsyncStorage.setItem(
      `tether_code_${CURRENT_USER.id}`,
      JSON.stringify(newCode),
    );
    await AsyncStorage.setItem(
      `tether_available_code_${code}`,
      JSON.stringify(newCode),
    );

    Alert.alert('Tether code generated!');
  };

  const enterCode = async () => {
    if (relationship) {
      Alert.alert("You're already in a relationship!");
      return;
    }

    if (!enteredCode || enteredCode.length !== 8) {
      Alert.alert('Please enter a valid 8-digit code');
      return;
    }

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
    await AsyncStorage.setItem(
      `tether_relationship_${CURRENT_USER.id}`,
      JSON.stringify(newRel),
    );
    await AsyncStorage.removeItem(`tether_code_${CURRENT_USER.id}`);
    setActiveCode(null);
    setEnteredCode('');

    Alert.alert(`You're now connected with ${partnerName}!`);
  };

  const breakUp = async () => {
    if (!relationship) return;

    await AsyncStorage.removeItem(`tether_relationship_${CURRENT_USER.id}`);
    await AsyncStorage.removeItem(
      `tether_relationship_${relationship.partnerId}`,
    );
    setRelationship(null);

    Alert.alert('Connection ended.');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <KeyboardAvoidingView>
            <Header />
            <Card
              onPress={generateCode}
              activeCode={activeCode}
              timeRemaining={timeRemaining}
            />
            <CardTwo onTextChange={setEnteredCode} value={enteredCode} />
            <CardThree />
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Dashboard;
