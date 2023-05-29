import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import useChatHistoryStore from '../store/useChatHistoryStore';
import Chat from '../screens/Chat';
import DrawerContent from '../components/DrawerContent';
import MenuButton from '../components/MenuButton';
import DeleteButton from '../components/DeleteButton';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {chatHistory} = useChatHistoryStore(state => state);

  const {
    colors: {
      background,
      onSurface,
      elevation: {level4, level5},
    },
  } = useTheme();

  const backgroundColor = useColorScheme() === 'light' ? 'white' : background;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerTitle: '',
          headerTransparent: true,
          drawerActiveBackgroundColor: level4,
          drawerActiveTintColor: onSurface,
          drawerInactiveTintColor: level5,
          drawerStyle: {backgroundColor},
          drawerLabelStyle: {marginLeft: '-15%'},
          drawerItemStyle: {
            marginHorizontal: 0,
            marginVertical: 0,
            paddingHorizontal: 5,
            borderBottomColor: level4,
            borderBottomWidth: 1,
            borderRadius: 0,
          },
        }}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Chat"
          component={Chat}
          options={({navigation}) => ({
            drawerItemStyle: {display: 'none'},
            headerLeft: () => <MenuButton navigation={navigation} />,
          })}
        />

        {chatHistory.map(item => (
          <Drawer.Screen
            key={item.id}
            name={item.title}
            component={Chat}
            initialParams={{id: item.id}}
            options={({navigation}) => ({
              headerLeft: () => <MenuButton navigation={navigation} />,
              drawerIcon: ({color}) => (
                <DeleteButton {...{color, navigation, id: item.id}} />
              ),
            })}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
