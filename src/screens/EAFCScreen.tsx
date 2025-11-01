import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

interface Player {
  id: number;
  name: string;
  rating: number;
  position: string;
  club: string;
  nationality: string;
  age: number;
  photo?: string;
}

interface Club {
  id: number;
  name: string;
  league: string;
  country: string;
  logo?: string;
}

export default function EAFCScreen() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'players' | 'clubs'>('players');
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'fallback'>('loading');

  // Mock data als Fallback
  const mockPlayers: Player[] = [
    {
      id: 1,
      name: 'Kylian Mbappé',
      rating: 91,
      position: 'ST',
      club: 'Real Madrid',
      nationality: 'France',
      age: 25,
    },
    {
      id: 2,
      name: 'Erling Haaland',
      rating: 91,
      position: 'ST',
      club: 'Manchester City',
      nationality: 'Norway',
      age: 24,
    },
    {
      id: 3,
      name: 'Vinicius Jr.',
      rating: 89,
      position: 'LW',
      club: 'Real Madrid',
      nationality: 'Brazil',
      age: 24,
    },
    {
      id: 4,
      name: 'Jude Bellingham',
      rating: 87,
      position: 'CM',
      club: 'Real Madrid',
      nationality: 'England',
      age: 21,
    },
    {
      id: 5,
      name: 'Kevin De Bruyne',
      rating: 91,
      position: 'CAM',
      club: 'Manchester City',
      nationality: 'Belgium',
      age: 33,
    },
  ];

  const mockClubs: Club[] = [
    {
      id: 1,
      name: 'Real Madrid',
      league: 'La Liga',
      country: 'Spain',
    },
    {
      id: 2,
      name: 'Manchester City',
      league: 'Premier League',
      country: 'England',
    },
    {
      id: 3,
      name: 'Bayern Munich',
      league: 'Bundesliga',
      country: 'Germany',
    },
    {
      id: 4,
      name: 'Paris Saint-Germain',
      league: 'Ligue 1',
      country: 'France',
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setApiStatus('loading');
    try {
      // Echte API-Aufrufe für EA FC Daten
      await Promise.all([
        fetchTopPlayers(),
        fetchTopClubs()
      ]);
      setApiStatus('success');
    } catch (error) {
      console.error('Error fetching EA FC data:', error);
      // Fallback zu Mock-Daten wenn API nicht verfügbar
      setPlayers(mockPlayers);
      setClubs(mockClubs);
      setApiStatus('fallback');
    } finally {
      setLoading(false);
    }
  };

  const fetchTopPlayers = async () => {
    try {
      // API-Aufruf 1: RapidAPI FIFA API
      const response = await fetch('https://fifa-players1.p.rapidapi.com/players/top', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'fifa-players1.p.rapidapi.com',
          'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY' // Hier würden Sie Ihren API-Key einfügen
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const formattedPlayers = data.slice(0, 20).map((player: any) => ({
          id: player.id,
          name: player.name,
          rating: player.overall,
          position: player.position,
          club: player.club,
          nationality: player.nationality,
          age: player.age,
        }));
        setPlayers(formattedPlayers);
        return;
      }
      
      // Fallback API: FUT.GG API
      const futResponse = await fetch('https://www.fut.gg/api/players?limit=20&order=overall_desc');
      if (futResponse.ok) {
        const futData = await futResponse.json();
        const formattedPlayers = futData.players.map((player: any) => ({
          id: player.id,
          name: player.name,
          rating: player.overall,
          position: player.position,
          club: player.club_name,
          nationality: player.nation_name,
          age: player.age,
        }));
        setPlayers(formattedPlayers);
        return;
      }

      // Weitere Fallback API: EA Sports API (kostenlos aber limitiert)
      const eaResponse = await fetch('https://www.easports.com/fifa/ultimate-team/api/fut/item?page=1');
      if (eaResponse.ok) {
        const eaData = await eaResponse.json();
        // Daten verarbeiten...
      }

    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  };

  const fetchTopClubs = async () => {
    try {
      // API-Aufruf für Club-Daten
      const response = await fetch('https://api.football-data.org/v4/competitions/PL/teams', {
        headers: {
          'X-Auth-Token': 'YOUR_FOOTBALL_DATA_API_KEY'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const formattedClubs = data.teams.slice(0, 20).map((team: any) => ({
          id: team.id,
          name: team.name,
          league: 'Premier League',
          country: team.area.name,
          logo: team.crest,
        }));
        setClubs(formattedClubs);
        return;
      }

      // Fallback: Andere Ligen
      const laLigaResponse = await fetch('https://api.football-data.org/v4/competitions/PD/teams');
      // etc...

    } catch (error) {
      console.error('Error fetching clubs:', error);
      throw error;
    }
  };

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.club.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.league.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return '#00FF87';
    if (rating >= 85) return '#FFD700';
    if (rating >= 80) return '#FF8C00';
    return '#A1A1A6';
  };

  const renderPlayer = (player: Player) => (
    <View key={player.id} style={styles.playerCard}>
      <View style={styles.playerHeader}>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{player.name}</Text>
          <Text style={styles.playerDetails}>
            {player.position} • {player.club}
          </Text>
          <Text style={styles.playerMeta}>
            {player.nationality} • {player.age} Jahre
          </Text>
        </View>
        <View style={[styles.ratingBadge, { backgroundColor: getRatingColor(player.rating) }]}>
          <Text style={styles.ratingText}>{player.rating}</Text>
        </View>
      </View>
    </View>
  );

  const renderClub = (club: Club) => (
    <View key={club.id} style={styles.clubCard}>
      <View style={styles.clubInfo}>
        <Text style={styles.clubName}>{club.name}</Text>
        <Text style={styles.clubDetails}>
          {club.league} • {club.country}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F5F5F7" />
        <Text style={styles.loadingText}>Loading EA FC Data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EA FC 25</Text>
        <Text style={styles.headerSubtitle}>
          {apiStatus === 'success' ? 'Live API Data' : 
           apiStatus === 'fallback' ? 'Demo Data (API Unavailable)' : 
           'Player & Club Database'}
        </Text>
        {apiStatus === 'fallback' && (
          <Text style={styles.fallbackWarning}>
            ⚠️ Using demo data - API keys required for live data
          </Text>
        )}
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search players or clubs..."
          placeholderTextColor="#A1A1A6"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabSwitcher}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'players' && styles.activeTabButton]}
          onPress={() => setActiveTab('players')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'players' && styles.activeTabButtonText]}>
            Players
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'clubs' && styles.activeTabButton]}
          onPress={() => setActiveTab('clubs')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'clubs' && styles.activeTabButtonText]}>
            Clubs
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'players' ? (
          <View style={styles.listContainer}>
            {filteredPlayers.map(renderPlayer)}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {filteredClubs.map(renderClub)}
          </View>
        )}
      </ScrollView>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={fetchData}>
        <Text style={styles.refreshButtonText}>🔄 Refresh Data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1F',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D1F',
  },
  loadingText: {
    color: '#F5F5F7',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '400',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#F5F5F7',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#A1A1A6',
    fontWeight: '400',
  },
  fallbackWarning: {
    fontSize: 12,
    color: '#FF9500',
    fontWeight: '400',
    marginTop: 8,
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#F5F5F7',
    borderWidth: 1,
    borderColor: '#48484A',
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#2C2C2E',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#F5F5F7',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#A1A1A6',
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#1D1D1F',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 100,
  },
  playerCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5F7',
    marginBottom: 4,
  },
  playerDetails: {
    fontSize: 14,
    color: '#A1A1A6',
    marginBottom: 2,
  },
  playerMeta: {
    fontSize: 12,
    color: '#8E8E93',
  },
  ratingBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D1D1F',
  },
  clubCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  clubInfo: {
    flex: 1,
  },
  clubName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F5F5F7',
    marginBottom: 4,
  },
  clubDetails: {
    fontSize: 14,
    color: '#A1A1A6',
  },
  refreshButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#F5F5F7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  refreshButtonText: {
    color: '#1D1D1F',
    fontSize: 14,
    fontWeight: '600',
  },
});