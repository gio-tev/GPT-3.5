import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import NewChatButton from './buttons/NewChatButton';
import ColorScheme from './colorScheme/ColorScheme';

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
