import React from 'react';
import {styles} from './style';
import {Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Header, ModalDropdown} from 'components';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {SelectBox} from '../../helpers/constants';

const DEMO_OPTIONS_1 = ['Lorem', 'Ipsum', 'Dummy'];

export default function () {
  return (
    <View>
      <Header rightIconName="close" onRightPress={Actions.pop} />
      <View style={{backgroundColor: 'white', padding: 10}}>
        <Text style={{marginBottom: 20}}>Select Box:</Text>
        <ModalDropdown
          style={styles.dropdown_3}
          options={DEMO_OPTIONS_1}
          modalType={SelectBox}
          dropdownStyle={styles.dropdown_2_dropdown}
          defaultIndex={0}
          defaultValue={
            <Text style={{fontSize: 15, color: '#475F7B'}}>
              {DEMO_OPTIONS_1[0]}
            </Text>
          }
        />
      </View>
    </View>
  );
}
