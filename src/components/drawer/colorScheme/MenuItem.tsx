import {StyleSheet} from 'react-native';
import {TouchableRipple, Menu, RadioButton, useTheme} from 'react-native-paper';
import {MenuItemTypes} from '../../../types/index';

const MenuItem = ({handlePress, scheme, value}: MenuItemTypes) => {
  const {
    colors: {background, primary, onSurface},
  } = useTheme();

  const styles = getStyles(primary);

  const title =
    value === 'default'
      ? 'System (Default)'
      : value[0].toUpperCase() + value.slice(1);

  return (
    <TouchableRipple
      rippleColor={background}
      onPress={handlePress}
      style={styles.container}>
      <>
        <RadioButton
          color={onSurface}
          uncheckedColor={primary}
          value={value}
          status={scheme === value ? 'checked' : 'unchecked'}
          onPress={handlePress}
        />
        <Menu.Item titleStyle={styles.menuItem} title={title} dense />
      </>
    </TouchableRipple>
  );
};

const getStyles = (primary: string) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuItem: {
      color: primary,
      fontSize: 15,
      fontWeight: '700',
    },
  });
};

export default MenuItem;
