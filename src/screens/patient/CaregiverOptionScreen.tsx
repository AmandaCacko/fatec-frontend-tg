import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import Background from "../../components/Background";
import { Colors } from '../../constants/Colors';

type CaregiverOptionScreenNavigationProp = StackNavigationProp<RootStackParamList, "CaregiverOption">;

interface CaregiverOptionScreenProps {
  navigation: CaregiverOptionScreenNavigationProp;
}

const CaregiverOptionScreen: React.FC<CaregiverOptionScreenProps> = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Escolha uma opção:</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("EnterPatientCode")}
        >
          <Text style={styles.optionText}>Entrar com um código</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("CreatePatient")}
        >
          <Text style={styles.optionText}>Criar novo paciente</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: 'center' },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  option: {
    backgroundColor: Colors.light.optionButton,
    width: 250,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CaregiverOptionScreen;