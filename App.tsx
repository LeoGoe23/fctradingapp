import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <MainScreen />;
  }

  return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
}
