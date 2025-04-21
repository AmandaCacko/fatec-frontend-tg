import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import api from "../../services/api";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Background from "../../components/Background";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../contexts/AuthContext";
import { Colors } from "../../constants/Colors";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { setToken, setUserId, setPatientData } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      const response = await api.post("/auth/login", { userEmail, userPassword });
  
      const {
        token,
        user: { userId: userId, userName, userEnvironment },
        patients
      } = response.data;
  
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", userId);
      await AsyncStorage.setItem("userName", userName ?? "");
      await AsyncStorage.setItem("patientData", JSON.stringify(patients));
  
      setToken(token);
      setUserId(userId);
      setPatientData(patients);

    } catch (err) {
      console.error(err);
      setError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Input placeholder="Email" value={userEmail} onChangeText={setUserEmail} />
        <Input placeholder="Senha" secureTextEntry value={userPassword} onChangeText={setUserPassword} />

        {error && <Text style={styles.error}>{error}</Text>}

        <Button title="Entrar" onPress={handleLogin} disabled={!userEmail || !userPassword} />

        <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Não possui conta? Faça seu cadastro
        </Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  error: { color: "red", marginTop: 8, textAlign: "center" },
  link: { color: Colors.light.textHighlight, fontWeight: "bold", marginTop: 16, textDecorationLine: "underline" },
});

export default LoginScreen;
