import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import NewChatButton from './NewChatButton';

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <>
      <NewChatButton {...props} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
};

export default DrawerContent;
