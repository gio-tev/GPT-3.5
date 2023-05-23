import {RouteProp} from '@react-navigation/native';

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
  title: string; //| undefined; ///////////////////////////////////////////////////////
  messages: {content: string; role: string}[];
};

export type ChatState = {
  chatHistory: ChatTypes[];
  updateChatHistory: (by: ChatTypes) => void;
  saveChatHistory: (by: ChatTypes) => void;
};

type DrawerParamList = {
  Chat: ChatTypes;
};
// type DrawerParamList = {
//   Chat: {
//     chatHistory: ChatTypes[];
//     id: number;
//   };
// };

export type ChatRouteProp = RouteProp<DrawerParamList, 'Chat'>;
