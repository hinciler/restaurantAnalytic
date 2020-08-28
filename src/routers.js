import React from 'react';
import {Platform} from 'react-native';
import {Scene, Router, Overlay, Modal} from 'react-native-router-flux';
import {
  Tabs,
  Home,
  DateRange,
  SelectBox,
  DataTable,
  InfoBox,
  RightMenu,
  Slider,
  BarChart,
  PieChart,
} from 'components';

const stateHandler = (prevState, newState, action) => {
  // console.log('onStateChange: ACTION:', action);
};

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

const router = () => (
  <Router onStateChange={stateHandler} uriPrefix={prefix}>
    <Overlay key="overlay" panHandlers={null}>
      <Modal key="modal" hideNavBar>
        <Scene component={Tabs} key="tabs" />
        <Scene component={Home} key="home" initial />
        <Scene component={DateRange} key="dateRange" />
        <Scene component={SelectBox} key="selectBox" />
        <Scene component={DataTable} key="dataTable" />
        <Scene component={InfoBox} key="infoBox" />
        <Scene component={RightMenu} key="rightMenu" />
        <Scene component={Slider} key="slider" />
        <Scene component={BarChart} key="barChart" />
        <Scene component={PieChart} key="pieChart" />
      </Modal>
    </Overlay>
  </Router>
);

export default router;
