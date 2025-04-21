import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Background from "../../components/Background";
import Loading from "../../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CreatePatientScreenNavigationProp = StackNavigationProp<RootStackParamList, "CreatePatient">;

interface CreatePatientScreenProps {
  navigation: CreatePatientScreenNavigationProp;
}

const CreatePatientScreen: React.FC<CreatePatientScreenProps> = ({ navigation }) => {
  const [patientName, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPatientData } = useAuth();
  
  const handleCreate = async () => {
    const userId = await AsyncStorage.getItem("userId");
    
    if (!patientName) {
      setError("O nome do paciente é obrigatório.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await api.post(
        "/patients",
        {
          patientName: patientName,
          userId
        }
      );

      await api.patch(`/users/${userId}`, {
        userType: "C"
      });
  
      const newPatientData = {
        id: response.data.patient.id,
        accessCode: response.data.patient.accessCode
      };

      await AsyncStorage.setItem(
        'patientData',
        JSON.stringify({
          id: response.data.patient.id,
          accessCode: response.data.patient.accessCode
        })
      );

      setPatientData(newPatientData); 
      navigation.navigate("Home");
  
    } catch (err) {
      console.log(err);
      setError("Erro ao criar paciente ou associar cuidador.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Background>
      {loading ? ( 
      <Loading message="Criando paciente..." />
      ) : (
      <View style={styles.container}>
        <Text style={styles.title}>Novo Paciente</Text>
        <Input placeholder="Nome do paciente" value={patientName} onChangeText={setName} />
        {error && <Text style={styles.error}>{error}</Text>}
        <Button title="Criar" onPress={handleCreate} />
      </View>
    )}
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  error: { color: "red", marginTop: 8 },
});

export default CreatePatientScreen;