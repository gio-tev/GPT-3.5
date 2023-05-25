import {useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import {lightTheme, darkTheme} from './src/theme';
import DrawerNavigator from './src/navigators/DrawerNavigator';

const Stack = createStackNavigator();

const App = () => {
  const theme = useColorScheme() === 'light' ? lightTheme : darkTheme;

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <DrawerNavigator /> */}
    </Provider>
  );
};

export default App;
