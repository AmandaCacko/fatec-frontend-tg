import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Background from "../../components/Background";

type EnterPatientCodeScreenNavigationProp = StackNavigationProp<RootStackParamList, "EnterPatientCode">;

interface EnterPatientCodeScreenProps {
  navigation: EnterPatientCodeScreenNavigationProp;
}

const EnterPatientCodeScreen: React.FC<EnterPatientCodeScreenProps> = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { token, setPatientData, setUserId } = useAuth(); 

  const handleJoin = async () => {
    try {
      const response = await api.post(
        "/patients/join",
        { accessCode: code },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const patient = response.data; 

      setPatientData({
        id: patient.patientId,
        accessCode: patient.patientAccessCode,
      });
      setUserId(patient.userId);

      navigation.navigate("Home");
    } catch (err) {
      setError("Código inválido");
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Entrar com código</Text>
        <Input placeholder="Código de acesso" value={code} onChangeText={setCode} />
        {error && <Text style={styles.error}>{error}</Text>}
        <Button title="Entrar" onPress={handleJoin} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: 'center' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  error: { color: "red", marginTop: 8 },
});

export default EnterPatientCodeScreen;