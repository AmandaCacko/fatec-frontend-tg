import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import api from "../../services/api";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Background from "../../components/Background";
import Loading from "../../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../contexts/AuthContext";
import { Colors } from "../../constants/Colors";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { setToken, setUserId } = useAuth();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const allFieldsFilled = userName && userEmail && userPassword && confirmPassword;
  const passwordsMatch = userPassword === confirmPassword;
  const isFormValid = allFieldsFilled && passwordsMatch;

  const handleRegister = async () => {
    if (!passwordsMatch) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      await api.post("/users", {
        userName,
        userEmail,
        userPassword,
        userType: "P",
      });

      const response = await api.post("/auth/login", {
        userEmail,
        userPassword,
      });

      const { token, user } = response.data;

      if (token && user?.userId && user?.userName) {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("userId", user.userId.toString());
        await AsyncStorage.setItem("userName", user.userName);

        setToken(token);
        setUserId(user.userId.toString());

      } else {
        throw new Error("Dados de usuário incompletos na resposta.");
      }
    } catch (err) {
      console.error("Erro no registro ou login:", err);
      setError("Erro ao registrar ou realizar o login. Verifique os dados e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar</Text>
        <Input placeholder="Nome" value={userName} onChangeText={setUserName} />
        <Input placeholder="Email" value={userEmail} onChangeText={setUserEmail} />
        <Input placeholder="Senha" secureTextEntry value={userPassword} onChangeText={setUserPassword} />
        <Input placeholder="Repetir senha" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

        {allFieldsFilled && !passwordsMatch && (
          <Text style={styles.warning}>As senhas não coincidem.</Text>
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        <Button title="Cadastrar" onPress={handleRegister} disabled={!isFormValid || isLoading} />
        {isLoading && <Loading />}

        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Já tem conta? Faça o login
        </Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  error: { color: "red", marginTop: 8, textAlign: "center" },
  warning: { color: "orange", marginTop: 8, textAlign: "center" },
  link: { color: Colors.light.textHighlight, fontWeight: "bold", marginTop: 16, textDecorationLine: "underline" },
});

export default RegisterScreen;
