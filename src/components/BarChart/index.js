import React from 'react';
import {StyleSheet, Text, View, processColor} from 'react-native';
import {Header} from 'components';
import {BarChart} from 'react-native-charts-wrapper';
import {Actions} from 'react-native-router-flux';

class BarChartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
      },
      data: {
        dataSets: [
          {
            values: [
              {y: 100},
              {y: 105},
              {y: 102},
              {y: 110},
              {y: 114},
              {y: 109},
              {y: 105},
              {y: 99},
              {y: 95},
            ],
            label: 'Bar dataSet',
            config: {
              colors: [
                processColor('#689f38'),
                processColor('#38649f'),
                processColor('#389f99'),
                processColor('#ee1043'),
                processColor('#ff8f00'),
              ],
              barShadowColor: processColor('lightgrey'),
              highlightAlpha: 90,
              highlightColor: processColor('white'),
            },
          },
        ],

        config: {
          barWidth: 0.7,
        },
      },
      highlights: [{x: 3}, {x: 6}],
      xAxis: {
        valueFormatter: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
        granularityEnabled: true,
        granularity: 1,
      },
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }

    console.log(event.nativeEvent);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header rightIconName="close" onRightPress={Actions.pop} />
        <View style={{height: 50}}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            animation={{durationX: 2000}}
            legend={this.state.legend}
            gridBackgroundColor={processColor('#ffffff')}
            visibleRange={{x: {min: 5, max: 5}}}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
            highlights={this.state.highlights}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 60,
  },
  chart: {
    flex: 1,
  },
});

export default BarChartScreen;
