import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import useChatHistoryStore from '../store/useChatHistoryStore';
import useDrawerStyles from '../hooks/useDrawerStyles';
import Chat from '../screens/Chat';
import DrawerContent from '../components/DrawerContent';
import MenuButton from '../components/MenuButton';
import DeleteButton from '../components/DeleteButton';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const styles = useDrawerStyles();

  const {chatHistory} = useChatHistoryStore(state => state);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={styles}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Chat"
          component={Chat}
          options={({navigation}) => ({
            drawerItemStyle: {display: 'none'},
            headerLeft: () => <MenuButton navigation={navigation} />,
          })}
        />

        {chatHistory.map(({id, title}) => (
          <Drawer.Screen
            key={id}
            name={title}
            component={Chat}
            initialParams={{id}}
            options={({navigation}) => ({
              headerLeft: () => <MenuButton navigation={navigation} />,
              drawerIcon: ({color}) => (
                <DeleteButton {...{color, navigation, id}} />
              ),
            })}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
