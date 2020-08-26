import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import debounce from 'utilities/helpers/debounce';

const tabs = () => {
  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Button
        onPress={debounce(() => Actions.tabs())}
        title={'Tabs'}
        style={{width: 160, marginBottom: 15}}
      />
      <Button
        onPress={debounce(() => Actions.dateRange())}
        title={'Date Range'}
        style={{width: 160, marginBottom: 15}}
      />

      <Button
        onPress={debounce(() => Actions.selectBox())}
        title={'Select Box'}
        style={{width: 160, marginBottom: 15}}
      />
      <Button
        onPress={debounce(() => Actions.dataTable())}
        title={'Date Table'}
        style={{width: 160, marginBottom: 15}}
      />
      <Button
        onPress={debounce(() => Actions.infoBox())}
        title={'Info Box'}
        style={{width: 160, marginBottom: 15}}
      />
      <Button
        onPress={debounce(() => Actions.rightMenu())}
        title={'Right Menu'}
        style={{width: 160, marginBottom: 15}}
      />
    </SafeAreaView>
  );
};

export default tabs;
