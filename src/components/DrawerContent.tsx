import {Text, Pressable} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import useChatHistoryStore from '../store/useChatHistoryStore';
import Feather from 'react-native-vector-icons/Feather';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {chatHistory} = useChatHistoryStore(state => state);

  const lastChatId = chatHistory[chatHistory?.length - 1]?.id;

  return (
    <>
      <Pressable
        onPress={() =>
          props.navigation.navigate('Chat', {
            id: lastChatId ? lastChatId + 1 : 1,
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
          borderColor: 'red',
          borderWidth: 2,
        }}>
        <Feather name="plus" size={25} color="green" />

        <Text style={{color: 'green'}}>New Chat</Text>
      </Pressable>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
};

export default DrawerContent;
