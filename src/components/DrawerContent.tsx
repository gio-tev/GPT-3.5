import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import NewChatButton from './NewChatButton';
import ColorScheme from './colorScheme/index';

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <>
      <NewChatButton {...props} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <ColorScheme />
    </>
  );
};

export default DrawerContent;
