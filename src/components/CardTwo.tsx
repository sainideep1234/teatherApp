import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const CardTwo = ({
  onTextChange,
  value,
}: {
  onTextChange: (text: string) => void;
  value: string;
}) => {
  const navigation = useNavigation<any>();
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
        value={value}
        onChangeText={text => onTextChange(text.toUpperCase())}
        maxLength={8}
        placeholder="Enter 8-digit code"
      />
      <Pressable
        style={styles.gradientWrapper}
        onPress={() => navigation.navigate('Connection')}
      >
        <LinearGradient
          colors={['#8A2BE2', '#BA55D3']} // Gradient colors from the screenshot
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>Enter Code</Text>
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
