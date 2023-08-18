import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Menu, useTheme} from 'react-native-paper';
import useColorSchemeStore from '../../../store/useColorSchemeStore';
import Anchor from './Anchor';
import MenuItem from './MenuItem';

const ColorScheme = () => {
  const [visible, setVisible] = useState(false);
  const {scheme, setColorScheme} = useColorSchemeStore(state => state);

  const {
    colors: {
      elevation: {level4},
    },
  } = useTheme();

  const styles = getStyles(level4);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleDefPress = () => setColorScheme('default');
  const handleLightPress = () => setColorScheme('light');
  const handleDarkPress = () => setColorScheme('dark');

  return (
    <Menu
      onDismiss={closeMenu}
      visible={visible}
      contentStyle={styles.container}
      anchor={<Anchor openMenu={openMenu} />}>
      <MenuItem handlePress={handleDefPress} scheme={scheme} value="default" />
      <MenuItem handlePress={handleLightPress} scheme={scheme} value="light" />
      <MenuItem handlePress={handleDarkPress} scheme={scheme} value="dark" />
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
  });
};
