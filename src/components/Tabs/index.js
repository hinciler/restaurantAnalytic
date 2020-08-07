import React from 'react';
import {View, Text} from 'react-native';
import {Header} from 'components';
import {Actions} from 'react-native-router-flux';

const tabs = () => {
  return (
    <View>
      <Header rightIconName="close" onRightPress={Actions.pop} />
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt
        voluptatum commodi sapiente, expedita fuga quidem ipsam error ullam
        aperiam quos accusantium nostrum perspiciatis, minima officia, id
        pariatur repudiandae atque reiciendis?
      </Text>
    </View>
  );
};

export default tabs;
