import {create} from 'zustand';
import {ChatState, ChatTypes} from '../types/index';

const dummyData: ChatTypes[] = [];

for (let i = 1; i <= 20; i++) {
  const chatObject: ChatTypes = {
    id: i,
    title: `Chat ${i}`,
    messages: [
      {content: `Message 1 from Chat ${i}`, role: 'user'},
      {content: `Message 2 from Chat ${i}`, role: 'assistant'},
    ],
  };

  dummyData.push(chatObject);
}

const useChatHistoryStore = create<ChatState>(set => ({
  chatHistory: dummyData,
  // chatHistory: [],

  saveChatHistory: newChat =>
    set(state => ({chatHistory: [...state.chatHistory, newChat]})),

  updateChatHistory: newMeaages => {
    set(state => ({
      chatHistory: state.chatHistory.map(chat =>
        chat.id === newMeaages.id ? newMeaages : chat,
      ),
    }));
  },

  deleteChatHistory: (id: number) => {
    set(state => ({
      chatHistory: state.chatHistory.filter(chat => chat.id !== id),
    }));
  },
}));

export default useChatHistoryStore;
