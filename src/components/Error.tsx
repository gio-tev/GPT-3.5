import {useTheme, Button} from 'react-native-paper';
import {View, Text} from 'react-native';

const Error = ({handleRefresh}: {handleRefresh: () => void}) => {
  const {
    colors: {
      error: errorColor,
      elevation: {level3},
    },
  } = useTheme();

  return (
    <View style={{flex: 1, alignItems: 'center', gap: 15, marginTop: 30}}>
      <Text style={{color: errorColor}}>Server error, please try again</Text>
      <Button
        // dark
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

export default Error;
