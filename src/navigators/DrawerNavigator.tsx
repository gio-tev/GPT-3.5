import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import useChatHistoryStore from '../store/useChatHistoryStore';
import useDrawerStyles from '../components/drawer/useDrawerStyles';
import Chat from '../screens/Chat';
import {drawerContent, menuButton, deleteButton} from '../utils/helpers';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const styles = useDrawerStyles();

  const {chatHistory} = useChatHistoryStore(state => state);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={styles}
        drawerContent={props => drawerContent(props)}>
        <Drawer.Screen
          name="Chat"
          component={Chat}
          options={({navigation}) => ({
            drawerItemStyle: {display: 'none'},
            headerLeft: () => menuButton(navigation),
          })}
        />

        {chatHistory.map(({id, title}) => (
          <Drawer.Screen
            key={id}
            name={title}
            component={Chat}
            initialParams={{id}}
            options={({navigation}) => ({
              headerLeft: () => menuButton(navigation),
              drawerIcon: ({color}) => deleteButton({color, navigation, id}),
            })}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
