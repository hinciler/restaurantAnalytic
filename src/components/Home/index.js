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
        style={{width: 160}}
      />
    </SafeAreaView>
  );
};

export default tabs;
