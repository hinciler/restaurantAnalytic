import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config';

export const styles = StyleSheet.create({
  dropdown_3: {
    width: 180,
    padding: 10,
    borderColor: '#999999',
    borderWidth: 1,
    borderRadius: 60,
    backgroundColor: '#e6e6e6',
  },
  dropdown_3_dropdownTextStyle: {
    backgroundColor: '#f5f5f5',
    color: '#666666',
    padding: 3,
  },
  dropdown_2_dropdown: {
    marginTop: Platform.OS === 'ios' ? 3 : -20,
  },
});
