import {View, Text, StyleSheet} from 'react-native';

const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GPT-3.5</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default Title;
