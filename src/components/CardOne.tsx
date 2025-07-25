import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import Copy from 'react-native-vector-icons/Ionicons';
import Check from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useActiveCode } from '../context/activeCode';

const Card = ({
  genrateCode,
  timeRemaining,
  isGenrating,
}: {
  genrateCode: () => void;
  timeRemaining: string;
  isGenrating: boolean;
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isCode, setIsCode] = useState<boolean>(false);
  const { activeCode } = useActiveCode();

  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <LinearGradient
          colors={['#8A2BE2', '#BA55D3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.iconContainer}
        >
          <Icon name="heart" size={40} color="white" />
        </LinearGradient>
      </View>

      <Text style={styles.title}>Generate Your Code</Text>
      <Text style={styles.subtitle}>
        Create a Unique Code for someone special
      </Text>
      {isCode && activeCode && (
        <View style={styles.copyCodeContainer}>
          <View style={styles.copyCode}>
            <Text style={styles.code}>{activeCode.code}</Text>
            <Pressable
              style={[styles.isHoverClass]}
              onPress={() => {
                setIsCopied(true);
              }}
            >
              {isCopied ? (
                <Check color={'green'} name="check" size={15} />
              ) : (
                <Copy size={15} name="copy-outline" />
              )}
            </Pressable>
          </View>
          <Text style={styles.time}>{timeRemaining}</Text>
        </View>
      )}

      <Pressable
        style={styles.gradientWrapper}
        onPress={() => {
          setIsCode(true);
          genrateCode();
        }}
      >
        <LinearGradient
          colors={['#8A2BE2', '#BA55D3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>
            {isGenrating ? 'Genrating...' : 'Genrate Code'}
          </Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
};

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
  subtitle: {
    color: 'grey',
  },
  button: {
    backgroundColor: '',
  },
  iconContainer: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: '#C43867',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    margin: 10,
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
    fontSize: 16,
    color: 'white',
  },
  code: {
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 20,
  },
  copyCode: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  isHoverClass: {
    backgroundColor: '#E5E4E2',
    overflow: 'hidden',
    padding: 4,
    borderRadius: 4,
    elevation: 4,
  },
  copyCodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    color: 'gray',
    fontWeight: '400',
  },
});

export default Card;
