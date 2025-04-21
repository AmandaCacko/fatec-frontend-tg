import React from 'react';
import { Button } from 'react-native';

import { useAuth } from '../contexts/AuthContext';

const LogoutButton = () => {
  const { handleLogout } = useAuth();

  const onLogout = async () => {
    await handleLogout();
  };

  return <Button title="Logout" onPress={onLogout} />;
};


export default LogoutButton;
