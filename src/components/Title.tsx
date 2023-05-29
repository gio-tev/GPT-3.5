import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const Title = () => {
  const {
    colors: {
      elevation: {level5},
    },
  } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: level5}]}>GPT-3.5</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: '700',
  },
});

export default Title;
