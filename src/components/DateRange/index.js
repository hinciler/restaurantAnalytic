import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, ModalDropdown} from 'components';
import {Actions} from 'react-native-router-flux';
import {styles} from './style';
import {Button, Icon} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const DEMO_OPTIONS_1 = [
  'Today',
  'This Week',
  'This Month',
  'Last 30 Days',
  'Custom Range',
];

export default function () {
  return (
    <View style={{flex: 1}}>
      <Header rightIconName="close" onRightPress={Actions.pop} />
      <View style={{backgroundColor: 'white', padding: 10}}>
        <Text style={{marginBottom: 20}}>Date range button:</Text>
        <ModalDropdown
          style={styles.dropdown_3}
          options={DEMO_OPTIONS_1}
          defaultValue={
            <View
              style={{
                flexDirection: 'row',
              }}>
              <FontAwesome5Icon
                name={'calendar-alt'}
                size={14}
                style={{marginRight: 5}}
              />
              <Text style={{alignItems: 'center'}}>Date Range Picker</Text>
              <FontAwesome5Icon
                name={'sort-down'}
                size={14}
                style={{marginLeft: 5, marginBottom: 5}}
              />
            </View>
          }
        />
      </View>
    </View>
  );
}
