import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  dropdown_2_dropdown: {
    marginLeft: -10,
    marginTop: Platform.OS === 'ios' ? 3 : -20,
  },
});
