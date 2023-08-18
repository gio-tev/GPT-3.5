import {Image, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BotPropTypes} from '../../types';

const Bot = ({
  isLastIndex,
  currentResponse,
  response,
  content,
}: BotPropTypes) => {
  const {
    colors: {primary},
  } = useTheme();

  const styles = getStyles(primary);

  return (
    <>
      <Image
        source={require('../../assets/ChatbotLogo.jpeg')}
        style={styles.chatbotLogo}
      />
      <Text selectable style={styles.text}>
        {isLastIndex && response ? currentResponse : content}
      </Text>
    </>
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    chatbotLogo: {
      width: 30,
      height: 30,
      borderRadius: 100,
      marginRight: 15,
    },
    text: {
      color,
      marginTop: 5,
    },
  });

export default Bot;
