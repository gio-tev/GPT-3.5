import {Image, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BotPropTypes} from '../types';

const Bot = ({
  isLastIndex,
  currentResponse,
  response,
  content,
}: BotPropTypes) => {
  const {
    colors: {primary},
  } = useTheme();

  return (
    <>
      <Image
        source={require('../assets/ChatbotLogo.jpeg')}
        style={styles.chatbotLogo}
      />
      <Text selectable style={[styles.text, {color: primary}]}>
        {isLastIndex && response ? currentResponse : content}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
  },
  chatbotLogo: {
    width: 30,
    height: 30,
    borderRadius: 3,
    marginRight: 15,
  },
});

export default Bot;
