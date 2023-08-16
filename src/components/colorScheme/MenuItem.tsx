import {TouchableRipple, Menu, RadioButton, useTheme} from 'react-native-paper';
import {MenuItemTypes} from '../../types/index';

const MenuItem = ({handlePress, scheme, value}: MenuItemTypes) => {
  const {
    colors: {background, primary, onSurface},
  } = useTheme();

  const title =
    value === 'default'
      ? 'System (Default)'
      : value[0].toUpperCase() + value.slice(1);

  return (
    <TouchableRipple
      rippleColor={background}
      onPress={handlePress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <>
        <RadioButton
          color={onSurface}
          uncheckedColor={primary}
          value={value}
          status={scheme === value ? 'checked' : 'unchecked'}
          onPress={handlePress}
        />
        <Menu.Item
          titleStyle={{color: primary, fontSize: 15, fontWeight: '700'}}
          title={title}
          dense
        />
      </>
    </TouchableRipple>
  );
};

export default MenuItem;
