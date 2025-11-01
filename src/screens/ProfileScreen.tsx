import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

export default function ProfileScreen() {
  const [name, setName] = useState('John Doe');
  const [nickname, setNickname] = useState('TradingKing2025');
  const [email] = useState('john.doe@example.com'); // Email nicht bearbeitbar
  const [editingName, setEditingName] = useState(false);
  const [editingNickname, setEditingNickname] = useState(false);

  const handleNameSave = () => {
    setEditingName(false);
    // Hier würde der Name gespeichert werden
  };

  const handleNicknameSave = () => {
    setEditingNickname(false);
    // Hier würde der Nickname gespeichert werden
  };

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Avatar Card */}
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>JD</Text>
          </View>
          <TouchableOpacity style={styles.changeAvatarButton}>
            <Text style={styles.changeAvatarText}>📷 Foto ändern</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Name Card */}
      <View style={styles.card}>
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldTitle}>👤 Name</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setEditingName(!editingName)}
          >
            <Text style={styles.editIcon}>{editingName ? '✓' : '✏️'}</Text>
          </TouchableOpacity>
        </View>
        {editingName ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Dein Name"
              placeholderTextColor="#8A8A8E"
              onSubmitEditing={handleNameSave}
              autoFocus
            />
          </View>
        ) : (
          <Text style={styles.fieldValue}>{name}</Text>
        )}
      </View>

      {/* Nickname Card */}
      <View style={styles.card}>
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldTitle}>🏷️ Benutzername</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setEditingNickname(!editingNickname)}
          >
            <Text style={styles.editIcon}>{editingNickname ? '✓' : '✏️'}</Text>
          </TouchableOpacity>
        </View>
        {editingNickname ? (
          <View style={styles.inputContainer}>
            <Text style={styles.atSymbol}>@</Text>
            <TextInput
              style={styles.textInput}
              value={nickname}
              onChangeText={setNickname}
              placeholder="Dein Benutzername"
              placeholderTextColor="#8A8A8E"
              onSubmitEditing={handleNicknameSave}
              autoFocus
            />
          </View>
        ) : (
          <Text style={styles.fieldValue}>@{nickname}</Text>
        )}
      </View>

      {/* Email Card */}
      <View style={styles.card}>
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldTitle}>📧 E-Mail</Text>
          <View style={styles.lockedBadge}>
            <Text style={styles.lockedText}>🔒</Text>
          </View>
        </View>
        <Text style={styles.fieldValueLocked}>{email}</Text>
        <Text style={styles.lockedNote}>E-Mail kann nicht geändert werden</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#333438',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#444448',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2EDDCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileAvatarText: {
    color: '#222222',
    fontSize: 36,
    fontWeight: '800',
  },
  changeAvatarButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#444448',
    borderRadius: 20,
  },
  changeAvatarText: {
    fontSize: 14,
    color: '#8A8A8E',
    fontWeight: '500',
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#444448',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444448',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#2EDDCC',
  },
  atSymbol: {
    fontSize: 18,
    color: '#8A8A8E',
    marginRight: 8,
    fontWeight: '600',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: '#FFFFFF',
    paddingVertical: 12,
    fontWeight: '500',
  },
  fieldValue: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  fieldValueLocked: {
    fontSize: 20,
    color: '#8A8A8E',
    fontWeight: '600',
    marginBottom: 8,
  },
  lockedBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFB366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedText: {
    fontSize: 16,
  },
  lockedNote: {
    fontSize: 12,
    color: '#8A8A8E',
    fontStyle: 'italic',
  },
});