import {create} from 'zustand';
import {addChat, updateChat, deleteChat} from '../database/sqlite';
import {ChatState} from '../types/index';
import {init, fetchChatHistory} from '../database/sqlite';

const useChatHistoryStore = create<ChatState>(set => ({
  chatHistory: [],

  setChatHistory: async () => {
    try {
      await init();
      set({chatHistory: await fetchChatHistory()});
    } catch (err) {
      console.log(err);
    }
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
