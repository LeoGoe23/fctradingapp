import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Fehler', 'Bitte füllen Sie alle Felder aus.');
      return;
    }
    // Hier würde die Anmelde-Logik implementiert werden
    onLogin();
  };

  const handleRegister = () => {
    Alert.alert('Registrierung', 'Registrierung wird bald verfügbar sein.');
  };

  return (
    <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Header with Custom Logo */}
          <View style={styles.header}>
            {/* Custom Built Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>FC</Text>
              </View>
              <View style={styles.logoTextContainer}>
                <Text style={styles.brandName}>TRADING</Text>
                <Text style={styles.brandSubtitle}>HUB</Text>
              </View>
            </View>
          </View>

          {/* Login Form */}
          <View style={styles.loginContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { borderColor: email ? '#2EDDCC' : '#444448' }]}
                placeholder="Email address"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { borderColor: password ? '#2EDDCC' : '#444448' }]}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  // Custom Logo Styles
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9CA3AF',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#222222',
    letterSpacing: -2,
  },
  logoTextContainer: {
    alignItems: 'flex-start',
  },
  brandName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
    lineHeight: 32,
  },
  brandSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 3,
    marginTop: 2,
  },
  logo: {
    width: 320,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: '#2EDDCC',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loginContainer: {
    paddingHorizontal: 0,
    paddingVertical: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333438',
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#444448',
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
    marginTop: 4,
  },
  forgotPasswordText: {
    color: '#9CA3AF',
    fontSize: 15,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#2EDDCC',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#2EDDCC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#222222',
    fontSize: 17,
    fontWeight: '700',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    paddingBottom: 32,
  },
  registerText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '400',
  },
  registerLink: {
    color: '#2EDDCC',
    fontSize: 16,
    fontWeight: '600',
  },
});