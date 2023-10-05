import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SchemeState} from '../types';

const useColorSchemeStore = create<SchemeState>(set => ({
  scheme: '',

  setInitialScheme: async () => {
    try {
      const schemeState = await AsyncStorage.getItem('schemeState');
      if (schemeState) {
        set({scheme: schemeState});
      } else set({scheme: 'default'});
    } catch (err) {
      console.log(err);
    }
  },

  setColorScheme: async newScheme => {
    try {
      await AsyncStorage.setItem('schemeState', newScheme);
    } catch (err) {
      console.log(err);
    }
    set({scheme: newScheme});
  },
}));

export default useColorSchemeStore;
