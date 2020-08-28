import React from 'react';
import {AppRegistry, StyleSheet, Text, View, processColor} from 'react-native';

import {StackNavigator, SafeAreaView} from 'react-navigation';
import {Header} from 'components';

import {PieChart} from 'react-native-charts-wrapper';
import {Actions} from 'react-native-router-flux';

class PieChartScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 15,
        form: 'CIRCLE',

        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'CENTER',
        orientation: 'VERTICAL',
        wordWrapEnabled: true,
      },
      data: {
        dataSets: [
          {
            values: [
              {value: 45, label: 'Sandwiches'},
              {value: 21, label: 'Salads'},
              {value: 15, label: 'Soup'},
              {value: 9, label: 'Beverages'},
              {value: 15, label: 'Desserts'},
            ],
            label: 'Pie dataset',
            config: {
              colors: [
                processColor('#C0FF8C'),
                processColor('#FFF78C'),
                processColor('#FFD08C'),
                processColor('#8CEAFF'),
                processColor('#FF8C9D'),
              ],
              valueTextSize: 20,
              valueTextColor: processColor('green'),
              sliceSpace: 5,
              selectionShift: 13,
              // xValuePosition: "OUTSIDE_SLICE",
              // yValuePosition: "OUTSIDE_SLICE",
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5,
            },
          },
        ],
      },
      highlights: [{x: 2}],
      description: {
        text: 'This is Pie chart description',
        textSize: 15,
        textColor: processColor('darkgray'),
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
        <View>
          <Text>selected:</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor('#fff')}
            chartDescription={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            highlights={this.state.highlights}
            entryLabelColor={processColor('green')}
            entryLabelTextSize={20}
            drawEntryLabels={true}
            rotationEnabled={true}
            rotationAngle={45}
            usePercentValues={true}
            centerTextRadiusPercent={100}
            holeRadius={40}
            holeColor={processColor('#fff')}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#f0f0f088')}
            onSelect={this.handleSelect.bind(this)}
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
  },
  chart: {
    flex: 1,
  },
});

export default PieChartScreen;
