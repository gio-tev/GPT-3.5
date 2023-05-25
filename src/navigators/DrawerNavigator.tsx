import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import Chat from '../screens/Chat';
import DrawerContent from '../components/DrawerContent';
import useChatHistoryStore from '../store/useChatHistoryStore';
import {ChatNavigationProp, ChatTypes} from '../types/index';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {chatHistory, deleteChatHistory} = useChatHistoryStore(state => state);

  const navigation = useNavigation<ChatNavigationProp>();

  const lastChatId = chatHistory[chatHistory?.length - 1]?.id;

  const handleChatDelete = (id: number) => {
    deleteChatHistory(id);
    navigation.navigate('Chat', {
      id: lastChatId ? lastChatId + 1 : 1,
      title: '',
      messages: [],
    });
  };

  return (
    // <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        // headerTitleStyle: {color: 'red'},
        // drawerItemStyle: {backgroundColor: 'red'},
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Chat"
        component={Chat}
        options={{
          // headerTransparent: true,
          // headerTitle: '',
          drawerItemStyle: {display: 'none'},
        }}
      />

      {chatHistory.map(item => (
        <Drawer.Screen
          key={item.id}
          name={item.title}
          component={Chat}
          initialParams={{id: item.id}}
          // initialParams={item}
          options={{
            // drawerItemStyle: {borderColor: 'green', borderWidth: 1},
            drawerLabelStyle: {
              // color: 'red',
              // borderEndColor: 'green',
              // borderWidth: 1,
              marginLeft: '-15%',
              // marginLeft: -25,
              // gap: 0,
              // padding: 0,
            },
            // title: item.title,
            drawerIcon: ({color}) => (
              <IconButton
                icon="delete-outline"
                iconColor={color}
                size={24}
                onPress={() => handleChatDelete(item.id)}
                style={{
                  // borderColor: 'red',
                  // borderWidth: 1,

                  // padding: -10,
                  margin: 0,
                  // alignSelf: 'center',
                  position: 'absolute',
                  right: 5,
                }}
              />
            ),

            // headerTransparent: true,
            // headerTitle: '',
          }}
        />
      ))}
    </Drawer.Navigator>
    // </NavigationContainer>
  );
};

export default DrawerNavigator;
