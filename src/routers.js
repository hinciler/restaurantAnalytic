import React from 'react';
import {Platform} from 'react-native';
import {Scene, Router, Overlay, Modal} from 'react-native-router-flux';
import {Tabs} from 'components';

const stateHandler = (prevState, newState, action) => {
  // console.log('onStateChange: ACTION:', action);
};

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

const router = () => (
  <Router onStateChange={stateHandler} uriPrefix={prefix}>
    <Overlay key="overlay" panHandlers={null}>
      <Modal key="modal" hideNavBar>
        <Scene component={Tabs} key="users" initial />
      </Modal>
    </Overlay>
  </Router>
);

export default router;
