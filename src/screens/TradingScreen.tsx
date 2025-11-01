import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function TradingScreen() {
  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>🎯 Trading Empfehlungen</Text>
        <Text style={styles.headerSubtitle}>Die besten Deals für maximale Profits</Text>
      </View>

      {/* Trading Recommendations */}
      <View style={styles.tradingCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.dateText}>01. Nov 2025</Text>
          <Text style={styles.timestamp}>⏰ 14:32</Text>
        </View>
        <View style={styles.playerHeader}>
          <Text style={styles.playerNameMain}>Pedri</Text>
          <Text style={styles.maxBuyPrice}>Max: 87K</Text>
        </View>
        <Text style={styles.recommendationTextSpaced}>TOTW incoming 🔥 Easy 40K profit bis Mittwoch</Text>
        <Text style={styles.updateText}>Update: Preis bereits bei 89K - noch immer gut</Text>
      </View>

      <View style={styles.tradingCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.dateText}>01. Nov 2025</Text>
          <Text style={styles.timestamp}>⏰ 13:45</Text>
        </View>
        <View style={styles.playerHeader}>
          <Text style={styles.playerNameMain}>Tchouaméni</Text>
          <Text style={styles.maxBuyPrice}>Max: 165K</Text>
        </View>
        <Text style={styles.recommendationTextSpaced}>Meta Beast 💪 WL Hype startet Donnerstag</Text>
        <Text style={styles.updateText}>Update: Bereits 8% gestiegen - Trend bestätigt</Text>
      </View>

      <View style={styles.tradingCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.dateText}>01. Nov 2025</Text>
          <Text style={styles.timestamp}>⏰ 12:20</Text>
        </View>
        <View style={styles.playerHeader}>
          <Text style={styles.playerNameMain}>Rashford</Text>
          <Text style={styles.maxBuyPrice}>Max: 95K</Text>
        </View>
        <Text style={styles.recommendationTextSpaced}>Perfect SBC Investment 📈 84 Rating benötigt</Text>
        <Text style={styles.updateText}>Update: SBC live! Jetzt schnell verkaufen</Text>
      </View>

      <View style={styles.tradingCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.dateText}>01. Nov 2025</Text>
          <Text style={styles.timestamp}>⏰ 11:15</Text>
        </View>
        <View style={styles.playerHeader}>
          <Text style={styles.playerNameMain}>Bellingham</Text>
          <Text style={styles.maxBuyPrice}>Max: 125K</Text>
        </View>
        <Text style={styles.recommendationTextSpaced}>WL Meta Pick 🚀 Formation 4-3-3 im Trend</Text>
        <Text style={styles.updateText}>Update: Noch mehr Alternativen auf dem Markt</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>📊 Heute's Performance</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>+187K</Text>
            <Text style={styles.statLabel}>Profit</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Trades</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>91%</Text>
            <Text style={styles.statLabel}>Success</Text>
          </View>
        </View>
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
  // Header Styles
  headerContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8A8A8E',
    fontWeight: '500',
    textAlign: 'center',
  },
  // Trading Card Styles (Clean Individual Cards)
  tradingCard: {
    backgroundColor: '#333438',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#444448',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    color: '#8A8A8E',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 14,
    color: '#2EDDCC',
    fontWeight: '600',
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  playerNameMain: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  maxBuyPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2EDDCC',
    backgroundColor: '#2A2A2E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  recommendationTextSpaced: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 12,
  },
  updateText: {
    fontSize: 14,
    color: '#FF9F0A',
    fontWeight: '500',
    fontStyle: 'italic',
    backgroundColor: '#2A2A2E',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9F0A',
  },
  // Stats Card
  statsCard: {
    backgroundColor: '#333438',
    borderRadius: 20,
    padding: 24,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#444448',
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2EDDCC',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#8A8A8E',
    fontWeight: '500',
  },
});