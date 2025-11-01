import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Keyboard,
} from 'react-native';

export default function CommunityScreen() {
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [activeCommentPost, setActiveCommentPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  // Mock-Daten für bessere Performance
  const posts = useMemo(() => [
    {
      id: 'post1',
      author: 'MBappe_Fan',
      avatar: 'M',
      time: 'vor 2 Min',
      content: 'TOTW Leak ist raus! Pedri definitiv dabei 🔥 Jetzt noch schnell investieren bevor der Preis explodiert!',
      likes: 12,
      commentCount: 3,
      comments: [
        { author: 'TradingKing99', message: 'Stimmt! Hab schon 5 gekauft 💰' },
        { author: 'FUT_Master', message: 'Vorsicht, könnte auch ein Fake Leak sein...' }
      ]
    },
    {
      id: 'post2',
      author: 'TradingKing99',
      avatar: 'T',
      time: 'vor 5 Min',
      content: 'Wer hat Erfahrung mit Icon SBCs? Lohnt sich das Investment in 83-86 rated Karten?',
      likes: 8,
      commentCount: 5,
      comments: [
        { author: 'IconInvestor', message: 'Absolut! Besonders 84er steigen immer stark 📈' }
      ]
    },
    {
      id: 'post3',
      author: 'FUT_Master',
      avatar: 'F',
      time: 'vor 8 Min',
      content: 'Weekend League Meta Update: Tchouaméni steigt hart! 🚀 Perfect timing für Investments',
      likes: 15,
      commentCount: 7,
      comments: []
    }
  ], []);

  const toggleComments = useCallback((postId: string) => {
    setActiveCommentPost(prev => prev === postId ? null : postId);
  }, []);

  const handlePost = useCallback(() => {
    if (newPost.trim()) {
      // Hier würde der Post gespeichert werden
      setNewPost('');
      setShowPostModal(false);
    }
  }, [newPost]);

  const handleComment = useCallback((postId: string) => {
    if (newComment.trim()) {
      // Hier würde der Kommentar gespeichert werden
      setNewComment('');
    }
  }, [newComment]);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
    setActiveCommentPost(null);
  }, []);

  const renderPost = useCallback(({ item }: { item: any }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userAvatar}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View style={styles.postInfo}>
          <Text style={styles.username}>{item.author}</Text>
          <Text style={styles.timeStamp}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{item.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.likeButton}>
          <Text style={styles.likeIcon}>❤️</Text>
          <Text style={styles.likeText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.commentButton}
          onPress={() => toggleComments(item.id)}
        >
          <Text style={styles.commentIcon}>💬</Text>
          <Text style={styles.commentText}>{item.commentCount}</Text>
        </TouchableOpacity>
      </View>
      
      {activeCommentPost === item.id && (
        <View style={styles.commentsSection}>
          {item.comments.map((comment: any, index: number) => (
            <View key={index} style={styles.comment}>
              <Text style={styles.commentAuthor}>{comment.author}:</Text>
              <Text style={styles.commentMessage}>{comment.message}</Text>
            </View>
          ))}
          <View style={styles.commentInput}>
            <TextInput
              style={styles.commentTextInput}
              placeholder="Kommentar schreiben..."
              placeholderTextColor="#8A8A8E"
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity 
              style={styles.commentCloseButton}
              onPress={() => setActiveCommentPost(null)}
            >
              <Text style={styles.commentCloseText}>✕</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.commentSendButton}
              onPress={() => handleComment(item.id)}
            >
              <Text style={styles.commentSendText}>💬</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  ), [activeCommentPost, newComment, toggleComments, handleComment]);

  const ListHeaderComponent = useMemo(() => (
    <>
      {/* Community Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2.4K</Text>
          <Text style={styles.statLabel}>Active Traders</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Online Now</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>89</Text>
          <Text style={styles.statLabel}>Posts Today</Text>
        </View>
      </View>

      {/* New Post Button */}
      <TouchableOpacity 
        style={styles.newPostButton}
        onPress={() => setShowPostModal(true)}
      >
        <Text style={styles.newPostIcon}>✏️</Text>
        <Text style={styles.newPostText}>Neuen Post erstellen...</Text>
      </TouchableOpacity>
    </>
  ), []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeaderComponent}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={3}
        onScrollBeginDrag={dismissKeyboard}
        getItemLayout={(data, index) => (
          { length: 200, offset: 200 * index, index }
        )}
      />

      {/* Post Modal */}
      <Modal
        visible={showPostModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPostModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Neuen Post erstellen</Text>
              <TouchableOpacity onPress={() => setShowPostModal(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.postInput}
              placeholder="Was denkst du über den aktuellen Markt?"
              placeholderTextColor="#8A8A8E"
              value={newPost}
              onChangeText={setNewPost}
              multiline
              maxLength={280}
            />
            
            <View style={styles.modalFooter}>
              <Text style={styles.characterCount}>{newPost.length}/280</Text>
              <TouchableOpacity 
                style={[styles.postButton, !newPost.trim() && styles.postButtonDisabled]}
                onPress={handlePost}
                disabled={!newPost.trim()}
              >
                <Text style={styles.postButtonText}>Posten</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  // Clean Stats Container
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333438',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444448',
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
  // New Post Button
  newPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2EDDCC',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#2EDDCC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  newPostIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  newPostText: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '600',
  },
  // Post Card (individual card for each post)
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
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2EDDCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#222222',
    fontSize: 16,
    fontWeight: '800',
  },
  postInfo: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    color: '#2EDDCC',
    fontWeight: '600',
    marginBottom: 4,
  },
  timeStamp: {
    fontSize: 12,
    color: '#8A8A8E',
    fontWeight: '500',
  },
  postText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Beautiful Like and Comment Buttons
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4458',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#FF4458',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  likeIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  likeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2EDDCC',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#2EDDCC',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  commentIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  commentText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Comments
  commentsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#444448',
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    color: '#2EDDCC',
    fontWeight: '600',
    marginRight: 8,
  },
  commentMessage: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 12,
  },
  commentTextInput: {
    flex: 1,
    backgroundColor: '#2A2A2E',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#FFFFFF',
    fontSize: 14,
    maxHeight: 80,
    borderWidth: 1,
    borderColor: '#444448',
  },
  commentSendButton: {
    marginLeft: 8,
    padding: 8,
  },
  commentCloseButton: {
    marginLeft: 8,
    padding: 8,
  },
  commentSendText: {
    fontSize: 20,
  },
  commentCloseText: {
    fontSize: 16,
    color: '#8A8A8E',
    fontWeight: '500',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#333438',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#444448',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalCloseButton: {
    fontSize: 24,
    color: '#8A8A8E',
    fontWeight: '300',
  },
  postInput: {
    backgroundColor: '#2A2A2E',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#444448',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  characterCount: {
    fontSize: 14,
    color: '#8A8A8E',
    fontWeight: '500',
  },
  postButton: {
    backgroundColor: '#2EDDCC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  postButtonDisabled: {
    backgroundColor: '#444448',
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
  },
});