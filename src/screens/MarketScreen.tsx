import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function MarketScreen() {
  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Market Stats Header */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>� Markt Status</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>🔥</Text>
            <Text style={styles.statLabel}>Hot Market</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2.1M</Text>
            <Text style={styles.statLabel}>Active Traders</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>+15%</Text>
            <Text style={styles.statLabel}>Today's Growth</Text>
          </View>
        </View>
      </View>

      {/* Market Announcement Posts */}
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.announcementBadge}>
            <Text style={styles.badgeText}>� BREAKING</Text>
          </View>
          <Text style={styles.timeStamp}>vor 5 Min</Text>
        </View>
        <Text style={styles.postTitle}>TOTW Leak bestätigt! 🔥</Text>
        <Text style={styles.postContent}>Pedri, Tchouaméni und Rashford definitiv dabei! Preise steigen bereits um 20-30%. Jetzt noch schnell investieren!</Text>
        <View style={styles.priceAlert}>
          <Text style={styles.alertText}>📈 Pedri: 45K → 58K (+29%)</Text>
          <Text style={styles.alertText}>📈 Tchouaméni: 32K → 41K (+28%)</Text>
        </View>
      </View>

      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.marketBadge}>
            <Text style={styles.badgeText}>� INSIDER</Text>
          </View>
          <Text style={styles.timeStamp}>vor 12 Min</Text>
        </View>
        <Text style={styles.postTitle}>Icon SBC droht! 🎯</Text>
        <Text style={styles.postContent}>EA plant großes Icon SBC für nächste Woche. 83-86 rated Karten werden explodieren! Perfect timing für Mass-Bidding.</Text>
        <View style={styles.investmentTip}>
          <Text style={styles.tipTitle}>💡 Investment Tipp:</Text>
          <Text style={styles.tipContent}>• 84er Karten unter 3K kaufen</Text>
          <Text style={styles.tipContent}>• Meta Leagues bevorzugen</Text>
          <Text style={styles.tipContent}>• Ziel: 50-80% Profit in 7 Tagen</Text>
        </View>
      </View>

      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.urgentBadge}>
            <Text style={styles.badgeText}>⚡ URGENT</Text>
          </View>
          <Text style={styles.timeStamp}>vor 18 Min</Text>
        </View>
        <Text style={styles.postTitle}>Flash Crash Alert! 📉</Text>
        <Text style={styles.postContent}>Markt crashed gerade hart! Perfect Buy-Opportunity für langfristige Investments. Icons -15%, TOTW -20%!</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buttonText}>� Jetzt kaufen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.watchButton}>
            <Text style={styles.buttonText}>👁️ Beobachten</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.weekendBadge}>
            <Text style={styles.badgeText}>🏆 WL META</Text>
          </View>
          <Text style={styles.timeStamp}>vor 25 Min</Text>
        </View>
        <Text style={styles.postTitle}>Weekend League Meta Update! 🚀</Text>
        <Text style={styles.postContent}>Neue OP Formation entdeckt! 4-2-3-1 mit CDM Meta. Diese Spieler werden gesucht sein:</Text>
        <View style={styles.playerList}>
          <Text style={styles.playerItem}>🔥 Kanté - Perfect CDM</Text>
          <Text style={styles.playerItem}>⚡ Valverde - Box-to-Box Beast</Text>
          <Text style={styles.playerItem}>💎 Tchouaméni - Hidden Gem</Text>
        </View>
      </View>

      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.eventBadge}>
            <Text style={styles.badgeText}>📅 EVENT</Text>
          </View>
          <Text style={styles.timeStamp}>vor 1 Std</Text>
        </View>
        <Text style={styles.postTitle}>Heute Abend: TOTW Release! ⏰</Text>
        <Text style={styles.postContent}>18:00 Uhr deutscher Zeit! Seid bereit für die ersten 30 Minuten - da passiert das meiste Geld! 💰</Text>
        <View style={styles.countdown}>
          <Text style={styles.countdownText}>⏱️ Noch 2h 15min</Text>
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
  // Stats Header
  statsCard: {
    backgroundColor: '#333438',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444448',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
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
    fontSize: 20,
    fontWeight: '800',
    color: '#2EDDCC',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8A8A8E',
    textAlign: 'center',
  },
  // Post Cards (wie Community aber für Markt)
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeStamp: {
    fontSize: 12,
    color: '#8A8A8E',
    fontWeight: '500',
  },
  // Badges for different announcement types
  announcementBadge: {
    backgroundColor: '#FF4458',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  marketBadge: {
    backgroundColor: '#FF9F0A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  urgentBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  weekendBadge: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  eventBadge: {
    backgroundColor: '#2EDDCC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  // Post Content
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 16,
  },
  // Price Alerts
  priceAlert: {
    backgroundColor: '#2A2A2E',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2EDDCC',
  },
  alertText: {
    fontSize: 14,
    color: '#2EDDCC',
    fontWeight: '600',
    marginBottom: 4,
  },
  // Investment Tips
  investmentTip: {
    backgroundColor: '#2A2A2E',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9F0A',
  },
  tipTitle: {
    fontSize: 16,
    color: '#FF9F0A',
    fontWeight: '700',
    marginBottom: 8,
  },
  tipContent: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 4,
  },
  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    marginTop: 12,
  },
  buyButton: {
    backgroundColor: '#2EDDCC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 12,
    flex: 1,
  },
  watchButton: {
    backgroundColor: '#444448',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  // Player Lists
  playerList: {
    backgroundColor: '#2A2A2E',
    borderRadius: 12,
    padding: 16,
  },
  playerItem: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 6,
  },
  // Countdown
  countdown: {
    backgroundColor: '#2A2A2E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF9F0A',
  },
  countdownText: {
    fontSize: 18,
    color: '#FF9F0A',
    fontWeight: '700',
  },
});