import {create} from 'zustand';
import {addChat, updateChat, deleteChat} from '../database/sqlite';
import {ChatState} from '../types/index';

const useChatHistoryStore = create<ChatState>(set => ({
  chatHistory: [],

  setChatHistory: chatHistory => {
    set({chatHistory});
  },

  saveChatHistory: newChat => {
    addChat(newChat);
    set(state => ({chatHistory: [...state.chatHistory, newChat]}));
  },

  updateChatHistory: newMessages => {
    updateChat(newMessages);
    set(state => ({
      chatHistory: state.chatHistory.map(chat =>
        chat.id === newMessages.id ? newMessages : chat,
      ),
    }));
  },

  deleteChatHistory: id => {
    deleteChat(id);
    set(state => ({
      chatHistory: state.chatHistory.filter(chat => chat.id !== id),
    }));
  },
}));

export default useChatHistoryStore;
