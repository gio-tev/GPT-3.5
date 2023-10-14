import {RouteProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

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

export type ChatTypes = {
  id: number;
  title: string;
  messages: {content: string; role: string}[];
};

export type ChatState = {
  chatHistory: ChatTypes[];
  setChatHistory: () => void;
  updateChatHistory: (by: ChatTypes) => void;
  saveChatHistory: (by: ChatTypes) => void;
  deleteChatHistory: (by: number) => void;
};

type DrawerParamList = {
  Chat: ChatTypes;
};

export type ChatRouteProp = RouteProp<DrawerParamList, 'Chat'>;
export type ChatNavigationProp = DrawerNavigationProp<DrawerParamList, 'Chat'>;

export type MenuButtonProps = {navigation: ChatNavigationProp};
export type DeleteButtonProps = {
  color: string;
  navigation: ChatNavigationProp;
  id: number;
};

export type EffectState = {
  response: string;
  chatTitle: string;
  // error: boolean;
  // setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: (messages: MessageTypes) => Promise<void>;

  currentChat: MessageTypes;
  currentChatTitle: string;
  setCurrentChat: (value: React.SetStateAction<MessageTypes>) => void;
  setCurrentResponse: (value: React.SetStateAction<string>) => void;
  setCurrentChatTitle: (value: React.SetStateAction<string>) => void;
};

export type FlatListTypes = {
  currentChat: MessageTypes;
  currentResponse: string;
  response: string;
};

export type DeleteButtonTypes = {
  color: string;
  navigation: ChatNavigationProp;
  id: number;
};

export type SendIconTypes = {
  iconColor: string;
  iconBackgroundColor: string;
};

export type ThemeState = {
  colors:
    | {
        primary: string;
        background: string;
        backdrop: string;
        onSurface: string;
        error: string;
        elevation: {
          level0: string;
          level1: string;
          level2: string;
          level3: string;
          level4: string;
          level5: string;
        };
      }
    | undefined;
};

export type MenuItemTypes = {
  handlePress: (val: string) => void;
  scheme: string;
  value: string;
};

export type SchemeState = {
  scheme: string;
  setInitialScheme: () => void;
  setColorScheme: (by: string) => void;
};

export type CurrentChatStoreTypes = {
  chatState: {
    currentChat: MessageTypes;
    currentResponse: string;
    currentChatTitle: string | undefined;
  };
  setCurrentChat: (messages: MessageTypes, mutate?: boolean) => void;
  setCurrentResponse: (by: string) => void;
  setCurrentChatTitle: (by: string | undefined) => void;
};
