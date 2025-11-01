import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TradingScreen from './TradingScreen';
import MarketScreen from './MarketScreen';
import ProfileScreen from './ProfileScreen';
import CommunityScreen from './CommunityScreen';

const tabs = [
  { id: 'tips', title: 'Trading', icon: '⌂' },
  { id: 'marktanalyse', title: 'Market', icon: '▲' },
  { id: 'transfers', title: 'Community', icon: '○' },
  { id: 'profile', title: 'Profile', icon: '◐' },
];

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState('tips');

  const renderContent = () => {
    switch (activeTab) {
      case 'marktanalyse':
        return <MarketScreen />;
      case 'tips':
        return <TradingScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'transfers':
        return <CommunityScreen />;
      default:
        return <TradingScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.bottomTab}
            onPress={() => setActiveTab(tab.id)}
          >
            <View style={[
              styles.bottomTabContent,
              activeTab === tab.id && styles.activeBottomTab
            ]}>
              <Text style={[
                styles.bottomTabIcon,
                activeTab === tab.id && styles.activeBottomTabIcon
              ]}>{tab.icon}</Text>
              <Text style={[
                styles.bottomTabText,
                activeTab === tab.id && styles.activeBottomTabText
              ]}>
                {tab.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 100, // Platz für Bottom Navigation
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2E',
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#3A3A3E',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  bottomTabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBottomTab: {
    // Kein extra Styling für aktiven Tab
  },
  bottomTabIcon: {
    fontSize: 22,
    marginBottom: 2,
    color: '#888',
  },
  activeBottomTabIcon: {
    color: '#2EDDCC',
  },
  bottomTabText: {
    fontSize: 10,
    color: '#888',
    fontWeight: '500',
    textAlign: 'center',
  },
  activeBottomTabText: {
    color: '#2EDDCC',
    fontWeight: '600',
  },
});