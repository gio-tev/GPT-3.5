import {create} from 'zustand';
import {ChatState} from '../types/index';

const useChatHistoryStore = create<ChatState>(set => ({
  chatHistory: [],

  saveChatHistory: newChat =>
    set(state => ({chatHistory: [...state.chatHistory, newChat]})),

  updateChatHistory: newMeaages => {
    set(state => ({
      chatHistory: state.chatHistory.map(chat =>
        chat.id === newMeaages.id ? newMeaages : chat,
      ),
    }));
  },
}));

export default useChatHistoryStore;
