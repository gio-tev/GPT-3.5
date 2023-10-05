import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import useChatHistoryStore from '../../../store/useChatHistoryStore';
import {DeleteButtonProps} from '../../../types/index';

const DeleteButton = ({color, navigation, id}: DeleteButtonProps) => {
  const {deleteChatHistory} = useChatHistoryStore(state => state);

  const handleChatDelete = () => {
    deleteChatHistory(id);

    navigation.reset({
      index: 0,
      routes: [{name: 'Chat'}],
    });
  };

  return (
    <IconButton
      icon="delete"
      iconColor={color}
      size={22}
      onPress={handleChatDelete}
      style={styles.iconStyle}
    />
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    margin: 0,
    position: 'absolute',
    right: 5,
  },
});

export default DeleteButton;
