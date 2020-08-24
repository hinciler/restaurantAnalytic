import React from 'react';
import {styles} from './style';
import {Header} from 'components';
import {View, ScrollView, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
const dummy = require('./dummy.json');
const {containerHeader, containerItems} = dummy;

export default function () {
  return (
    <View>
      <Header rightIconName="close" onRightPress={Actions.pop} />
      <View style={{padding: 15, alignItems: 'center'}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {containerHeader.map((item, idx) => (
                <View
                  style={[
                    styles.tableHeaderStyle,
                    {width: idx === 0 ? 60 : 85},
                  ]}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
            <View>
              {containerItems.map((item, idx) => (
                <View>
                  <View style={styles.tableContainerStyle}>
                    <Text style={[styles.containerTextStyle, {width: 60}]}>
                      {idx + 1}
                    </Text>
                    <Text style={styles.containerTextStyle}>
                      {item.firstName}
                    </Text>
                    <Text style={styles.containerTextStyle}>
                      {item.lastName}
                    </Text>
                    <Text style={styles.containerTextStyle}>
                      {item.nickName}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#d5dfea',
                      borderBottomWidth: 1,
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
