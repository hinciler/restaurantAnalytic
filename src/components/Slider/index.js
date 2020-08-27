import React from 'react';
import {styles} from './style';
import {Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Header} from 'components';
import Slider from '@react-native-community/slider';

export default function () {
  const [value, setValue] = React.useState(100);
  return (
    <View>
      <Header rightIconName="close" onRightPress={Actions.pop} />
      <View style={{backgroundColor: 'white', padding: 10}}>
        <Text style={{marginBottom: 20}}>Select Min Max Value:</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.minMaxValue}>
            <Text style={styles.minMaxValueTxt}>100</Text>
          </View>
          <View style={styles.minMaxValue}>
            <Text style={styles.minMaxValueTxt}>1 000</Text>
          </View>
        </View>
        <Slider
          minimumValue={100}
          maximumValue={1000}
          minimumTrackTintColor="#34b2ce"
          maximumTrackTintColor="#c9cdd7"
          onValueChange={(value) => setValue(value)}
          step={1}
        />
        <Text>{value}</Text>
      </View>
    </View>
  );
}
