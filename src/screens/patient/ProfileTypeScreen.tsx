import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import Button from "../../components/Button";
import Background from "../../components/Background";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { Colors } from '../../constants/Colors';

type ProfileTypeNavigationProp = StackNavigationProp<RootStackParamList, "ProfileType">;

interface Props {
  navigation: ProfileTypeNavigationProp;
}

const ProfileTypeScreen: React.FC<Props> = ({ navigation }) => {
  const { setPatientData } = useAuth();
  const [selected, setSelected] = useState<"caregiver" | "self" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    if (selected === "caregiver") {

      navigation.navigate("CaregiverOption"); 
  
    } else if (selected === "self") {
      setIsLoading(true);
      try {
        const userId = await AsyncStorage.getItem("userId");
        const userName = await AsyncStorage.getItem("userName");

        if (!userId || !userName) {
          Alert.alert("Error", "User data not found");
          return;
        }

        const response = await api.post("/patients", {
          patientName: userName,
          userId
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
      
      } catch (error: unknown) {
        let errorMessage = "Failed to create patient profile";
        
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null && 'response' in error) {
          const axiosError = error as { response?: { data?: { message?: string } } };
          errorMessage = axiosError.response?.data?.message || errorMessage;
        }

        console.error("Error:", error);
        Alert.alert("Error", errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Selecione uma opção:</Text>

        <TouchableOpacity
          style={[styles.option, selected === "caregiver" && styles.optionSelected]}
          onPress={() => setSelected("caregiver")}
          disabled={isLoading}
        >
          <Text style={styles.optionText}>Sou cuidador ou familiar e vou gerenciar medicações e estoque de um ou mais pacientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selected === "self" && styles.optionSelected]}
          onPress={() => setSelected("self")}
          disabled={isLoading}
        >
          <Text style={styles.optionText}>Vou gerenciar minhas próprias medicações e estoque</Text>
        </TouchableOpacity>

        <Button 
          title={isLoading ? "Processando..." : "Começar"} 
          onPress={handleStart} 
          disabled={!selected || isLoading} 
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: 'center'},
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  option: {
    backgroundColor: Colors.light.optionButton,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  optionSelected: {
    backgroundColor: Colors.light.optionSelectedButton,
    color: "#FFFFFF",
    fontWeight: 'bold',
    borderColor: Colors.light.optionSelectedBorderButton,
  }
});

export default ProfileTypeScreen;
