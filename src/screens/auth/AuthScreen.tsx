import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Button from '../../components/Button';
import { Colors } from '../../constants/Colors';

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

interface AuthScreenProps {
  navigation: AuthScreenNavigationProp;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          margin: 25
        }}
        source={require('../../assets/images/logo-colored.png')}
      />
      <Text style={styles.title}>Gerencie suas medicações de forma <Text style={styles.highlight}>fácil</Text> e <Text style={styles.highlight}>eficiente</Text></Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Cadastro" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  subtitle: { fontSize: 18, marginBottom: 24 },
  highlight: { color: Colors.light.textHighlight, fontWeight: 'bold' },
});
