import {Text, StyleSheet} from 'react-native';
import {TouchableRipple, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Anchor = ({openMenu}: {openMenu: () => void}) => {
  const {
    colors: {
      primary,
      elevation: {level4},
    },
  } = useTheme();

  const styles = getStyles(primary);

  return (
    <TouchableRipple
      style={styles.anchor}
      rippleColor={level4}
      onPress={openMenu}>
      <>
        <Icon name="brightness-4" size={22} color={primary} />
        <Text style={styles.text}>Color Scheme</Text>
      </>
    </TouchableRipple>
  );
};

const getStyles = (primary: string) => {
  return StyleSheet.create({
    anchor: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingLeft: 21,
      marginBottom: 20,
      height: 45,
    },
    text: {
      color: primary,
      fontWeight: '500',
    },
  });
};

export default Anchor;
