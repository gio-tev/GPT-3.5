import {View, Text, StyleSheet} from 'react-native';
import {useTheme, Button} from 'react-native-paper';

const Error = ({handleRefresh}: {handleRefresh: () => void}) => {
  const {
    colors: {
      error: errorColor,
      elevation: {level3},
    },
  } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{color: errorColor}}>Server error, please try again</Text>
      <Button
        textColor={errorColor}
        buttonColor={level3}
        icon="refresh"
        mode="text"
        accessibilityLabel="refresh"
        style={{
          borderRadius: 10,
        }}
        contentStyle={{padding: -10}}
        onPress={handleRefresh}>
        Refresh
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 15,
    marginTop: 30,
  },
});

export default Error;
