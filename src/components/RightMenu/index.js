import React from 'react';
import {styles} from './style';
import {Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Header, ModalDropdown} from 'components';
import {RightMenu} from '../../helpers/constants';

const DEMO_OPTIONS_1 = ['Lorem', 'Ipsum', 'Dummy'];

export default function () {
  return (
    <View style={{backgroundColor: '#f4f5f9', flex: 1}}>
      <Header rightIconName="close" onRightPress={Actions.pop} />
      <View style={{alignItems: 'center', padding: 15}}>
        <ModalDropdown
          animated={true}
          options={DEMO_OPTIONS_1}
          modalType={RightMenu}
          dropdownStyle={styles.dropdown_2_dropdown}
          defaultIndex={0}
        />
      </View>
    </View>
  );
}
