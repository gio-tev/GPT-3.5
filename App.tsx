import {useColorScheme, Text, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Provider} from 'react-native-paper';
import {lightTheme, darkTheme} from './src/theme';
import Chat from './src/screens/Chat';
import useChatHistoryStore from './src/store/useChatHistoryStore';
import Feather from 'react-native-vector-icons/Feather';
import {ChatTypes} from './src/types/index';

const Drawer = createDrawerNavigator();

const App = () => {
  const theme = useColorScheme() === 'light' ? lightTheme : darkTheme;

  const {chatHistory} = useChatHistoryStore(state => state);

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => (
            <DrawerContent {...{...props, chatHistory}} />
          )}
          // drawerContent={props => <DrawerContent {...props} />}
          screenOptions={{headerTransparent: true, headerTitle: ''}}>
          <Drawer.Screen
            name="Chat"
            component={Chat}
            options={{
              // headerTransparent: true,
              // headerTitle: '',
              drawerItemStyle: {display: 'none'},
            }}
          />
          {/* {chatHistory.map(item => { */}
          {chatHistory.map(item => {
            // console.log(item, 'drawer screen item');

            return (
              <Drawer.Screen
                key={item.id}
                name={item.title}
                component={Chat}
                initialParams={{id: item.id}}
                // initialParams={item}
                options={{
                  title: item.title,
                  // headerTransparent: true,
                  // headerTitle: '',
                }}
              />
            );
          })}
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

interface CustomDrawerContentComponentProps
  extends DrawerContentComponentProps {
  chatHistory: ChatTypes[];
}

const DrawerContent = (props: CustomDrawerContentComponentProps) => {
  // const {chatHistory} = useChatHistoryStore(state => state);
  const chatHistory = props.chatHistory;

  const lastChatId = chatHistory[chatHistory?.length - 1]?.id;
  // console.log(chatHistory, '////////////');

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
