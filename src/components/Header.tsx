import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.container}>
        <Pressable    
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        >
          <Icon size={25} name={'arrow-back'} />
        </Pressable>
        <Text style={styles.title}>Teather</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
  },
});
