import React from 'react';
import {styles} from './style';
import {Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Header} from 'components';

export default function () {
  return (
    <View style={{backgroundColor: '#f4f5f9', flex: 1}}>
      <Header rightIconName="close" onRightPress={Actions.pop} />
      <View style={{padding: 15, flex: 1}}>
        <View style={styles.infoBoxContainer}>
          <View style={styles.circle}>
            <FontAwesome5Icon name={'heartbeat'} color={'#5949d6'} size={20} />
          </View>
          <View>
            <Text style={styles.textHeader}>4.235</Text>
            <Text style={styles.textSubtitle}>Total Patients</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
