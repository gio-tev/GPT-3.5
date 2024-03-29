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

  const onSchemeChange = (val: string) => setColorScheme(val);

  return (
    <Menu
      onDismiss={closeMenu}
      visible={visible}
      contentStyle={styles.container}
      anchor={<Anchor openMenu={openMenu} />}>
      <MenuItem handlePress={onSchemeChange} scheme={scheme} value="default" />
      <MenuItem handlePress={onSchemeChange} scheme={scheme} value="light" />
      <MenuItem handlePress={onSchemeChange} scheme={scheme} value="dark" />
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
