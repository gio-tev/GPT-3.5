import {Image, Text, StyleSheet} from 'react-native';
import theme from '../theme';
import {BotPropTypes} from '../types';

const Bot = ({isLastIndex, currentResponse, content}: BotPropTypes) => (
  <>
    <Image
      source={require('../assets/ChatbotLogo.jpeg')}
      style={styles.chatbotLogo}
    />
    <Text style={styles.text}>{isLastIndex ? currentResponse : content}</Text>
  </>
);

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    color: theme.colors.primary,
  },
  chatbotLogo: {
    width: 30,
    height: 30,
    borderRadius: 3,
    marginRight: 15,
  },
});

export default Bot;
