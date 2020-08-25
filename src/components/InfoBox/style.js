import {StyleSheet} from 'react-native';
import {colors} from 'config';

export const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#efedf9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBoxContainer: {
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  textHeader: {fontWeight: '800', color: '#475F7B', fontSize: 27},
  textSubtitle: {fontWeight: '400', color: 'gray', fontSize: 16},
});
