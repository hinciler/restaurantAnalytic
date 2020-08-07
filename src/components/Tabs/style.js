import {Dimensions, StyleSheet} from 'react-native';
import {colors} from 'config';
import {normalize} from 'react-native-elements';
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  wrapButton: {
    height: width > 380 ? normalize(30) : normalize(28),
    width: width > 380 ? normalize(90) : normalize(87),
    borderColor: colors.border,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  orderGroupTag: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 4,
  },
  orderTagList: {
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor: 'white',
    padding: 10,
  },
});
