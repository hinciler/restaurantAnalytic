import React from 'react';
import {Text, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/state/store';
import Index from './src/routers';

// Ignore all log notifications:
LogBox.ignoreAllLogs();

//ios font size değişse de fontlar değişmesin diye
if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;

const App = () => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};

export default App;
