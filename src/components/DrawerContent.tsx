import {Text, Pressable, StyleSheet} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import useChatHistoryStore from '../store/useChatHistoryStore';
import Feather from 'react-native-vector-icons/Feather';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {chatHistory} = useChatHistoryStore(state => state);

  const {
    colors: {
      backdrop,
      primary,
      elevation: {level4},
    },
  } = useTheme();

  const lastChatId = chatHistory[chatHistory?.length - 1]?.id;

  const handlePress = () =>
    props.navigation.navigate('Chat', {
      id: lastChatId ? lastChatId + 1 : 1,
    });

  return (
    <>
      <Pressable
        onPress={handlePress}
        style={({pressed}) => [
          styles.container,
          {
            backgroundColor: pressed ? backdrop : level4,
          },
        ]}>
        <Feather name="plus" size={22} color={primary} />

        <Text style={{color: primary, fontWeight: '500'}}>New Chat</Text>
      </Pressable>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: '3%',
    marginHorizontal: '4%',
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default DrawerContent;
