import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PatientData {
  id: string;
  accessCode: string;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  loading: boolean;
  handleLogout: () => void;
  patientData: PatientData | null;
  setPatientData: (data: PatientData | null) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAuthData = async () => {
    try {
      const [storedToken, storedPatient, storedUserId] = await Promise.all([
        AsyncStorage.getItem("token"),
        AsyncStorage.getItem("patientData"),
        AsyncStorage.getItem("userId"),
      ]);

      setToken(storedToken);
      setPatientData(storedPatient ? JSON.parse(storedPatient) : null);
      setUserId(storedUserId);
    } catch (error) {
      console.error("Erro ao carregar dados de autenticação:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem("token"),
        AsyncStorage.removeItem("patientData"),
        AsyncStorage.removeItem("userId"),
      ]);

      setToken(null);
      setPatientData(null);
      setUserId(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        loading,
        handleLogout,
        patientData,
        setPatientData,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
