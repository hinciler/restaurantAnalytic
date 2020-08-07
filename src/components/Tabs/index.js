import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header} from 'components';
import {Actions} from 'react-native-router-flux';
import debounce from 'utilities/helpers/debounce';
import {colors} from 'config';
import {styles} from './style';
import {Icon} from 'react-native-elements';
const dummy = require('./dummy.json');
const {prefixBtns} = dummy;

export default function () {
  const [selected, setSelected] = React.useState(new Map());
  const [oldId, setOldId] = React.useState(0);

  useEffect(function effectFunction() {
    onSelectTab(0);
  }, []);

  const onSelectTab = useCallback(
    (id) => {
      const newSelected = new Map(selected);
      setOldId(id);
      if (selected.get(id) !== true) {
        newSelected.set(id, !selected.get(id));
      }
      if (id !== oldId) {
        newSelected.delete(oldId, !selected.get(oldId));
      }
      setSelected(newSelected);
    },
    [oldId, selected],
  );
  return (
    <View>
      <Header rightIconName="close" onRightPress={Actions.pop} />
      <View style={styles.orderGroupTag}>
        {prefixBtns.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={debounce(() => onSelectTab(index))}
            style={[
              styles.wrapButton,
              {
                backgroundColor: selected.get(index)
                  ? colors.activeBtnClr
                  : colors.white,
                borderBottomLeftRadius: index === 0 || index === 3 ? 2 : 0,
                borderTopLeftRadius: index === 0 || index === 3 ? 2 : 0,
                borderBottomRightRadius:
                  index === prefixBtns.length - 1 || index === 2 ? 2 : 0,
                borderTopRightRadius:
                  index === prefixBtns.length - 1 || index === 2 ? 2 : 0,
                marginTop: 4,
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name={item.icon}
                size={16}
                color={selected.get(index) ? colors.white : colors.btnTxtClr}
                style={{marginRight: 5}}
              />
              <Text
                style={{
                  color: selected.get(index) ? colors.white : colors.btnTxtClr,
                }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
