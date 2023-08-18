import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const Title = () => {
  const {
    colors: {
      elevation: {level5},
    },
  } = useTheme();

  const styles = getStyles(level5);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>GPT-3.5</Text>
    </View>
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    container: {
      marginTop: 65,
      alignSelf: 'center',
      alignItems: 'center',
    },
    text: {
      color,
      fontSize: 40,
      fontWeight: '700',
    },
  });

export default Title;
