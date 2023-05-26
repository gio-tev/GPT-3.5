import {RouteProp, NavigationProp} from '@react-navigation/native';

export type FlatListItemPropTypes = {
  item: {role: string; content: string};
  index: number;
  currentResponse: string;
  currentChat: {role: string; content: string}[];
  response: string;
};

export type InputPropTypes = {
  inputValue: string;
  handleInput: (text: string) => void;
  handleSubmit: () => void;
  error: boolean;
};

export type MessageTypes = {
  role: string;
  content: string;
}[];

export type BotPropTypes = {
  isLastIndex: boolean;
  currentResponse: string;
  content: string;
  response: string;
};

export type ChatTypes = {
  id: number;
  title: string;
  messages: {content: string; role: string}[];
};

export type ChatState = {
  chatHistory: ChatTypes[];
  setChatHistory: (by: ChatTypes[]) => void;
  updateChatHistory: (by: ChatTypes) => void;
  saveChatHistory: (by: ChatTypes) => void;
  deleteChatHistory: (by: number) => void;
};

type DrawerParamList = {
  Chat: ChatTypes;
};

export type ChatRouteProp = RouteProp<DrawerParamList, 'Chat'>;
export type ChatNavigationProp = NavigationProp<DrawerParamList, 'Chat'>;
