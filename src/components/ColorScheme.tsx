import {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableRipple, Menu, RadioButton, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useColorSchemeStore from '../store/useColorSchemeStore';

const ColorScheme = () => {
  const [visible, setVisible] = useState(false);
  const {scheme, setColorScheme} = useColorSchemeStore(state => state);

  const {
    colors: {
      background,
      primary,
      onSurface,
      elevation: {level4},
    },
  } = useTheme();

  const styles = getStyles(level4);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleDefaultPress = () => setColorScheme('default');
  const handleLightPress = () => setColorScheme('light');
  const handleDarkPress = () => setColorScheme('dark');

  return (
    <Menu
      onDismiss={closeMenu}
      visible={visible}
      contentStyle={styles.container}
      anchor={
        <TouchableRipple
          style={styles.anchor}
          rippleColor={level4}
          onPress={openMenu}>
          <>
            <Icon name="brightness-4" size={22} color={primary} />
            <Text style={{color: primary, fontWeight: '500'}}>
              Color Scheme
            </Text>
          </>
        </TouchableRipple>
      }>
      <TouchableRipple
        rippleColor={background}
        onPress={handleDefaultPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <>
          <RadioButton
            color={onSurface}
            uncheckedColor={primary}
            value={'default'}
            status={scheme === 'default' ? 'checked' : 'unchecked'}
            onPress={handleDefaultPress}
          />
          <Menu.Item
            titleStyle={{color: primary, fontSize: 15, fontWeight: '700'}}
            // onPress={() => {}}
            title="System (Default)"
            dense
          />
        </>
      </TouchableRipple>
      <TouchableRipple
        rippleColor={background}
        onPress={handleLightPress}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <>
          <RadioButton
            color={onSurface}
            uncheckedColor={primary}
            value={'light'}
            status={scheme === 'light' ? 'checked' : 'unchecked'}
            onPress={handleLightPress}
          />
          <Menu.Item
            titleStyle={{color: primary, fontSize: 15, fontWeight: '700'}}
            // onPress={() => {}}
            title="Light"
            dense
          />
        </>
      </TouchableRipple>

      <TouchableRipple
        rippleColor={background}
        onPress={handleDarkPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <>
          <RadioButton
            color={onSurface}
            uncheckedColor={primary}
            value={'dark'}
            status={scheme === 'dark' ? 'checked' : 'unchecked'}
            onPress={handleDarkPress}
          />
          <Menu.Item
            titleStyle={{color: primary, fontSize: 15, fontWeight: '700'}}
            title="Dark"
            dense
          />
        </>
      </TouchableRipple>
    </Menu>
  );
};

export default ColorScheme;

const getStyles = (backgroundColor: string) => {
  return StyleSheet.create({
    container: {
      backgroundColor,
      minWidth: 255,
      marginLeft: 4.5,
      marginBottom: '5%',
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
    anchor: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingLeft: 21,
      marginBottom: 20,
      height: 45,
    },
  });
};
