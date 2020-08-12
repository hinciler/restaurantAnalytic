import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import PropTypes from 'prop-types';

export default class ModalDropdown extends PureComponent {
  constructor(props) {
    super(props);

    this.button = null;
    this.buttonFrame = null;
    this.nextValue = null;
    this.nextIndex = null;

    this.state = {
      accessible: !!props.accessible,
      loading: !props.options,
      showDropdown: false,
      buttonText: props.defaultValue,
      selectedIndex: props.defaultIndex,
    };
  }

  componentDidUpdate(nextProps) {
    let {buttonText, selectedIndex} = this.state;
    const {defaultIndex, defaultValue, options} = nextProps;
    console.log(options + 'hello');
    buttonText = this.nextValue == null ? buttonText : this.nextValue;
    selectedIndex = this.nextIndex == null ? selectedIndex : this.nextIndex;
    if (selectedIndex < 0) {
      selectedIndex = defaultIndex;
      if (selectedIndex < 0) {
        buttonText = defaultValue;
      }
    }
    this.nextValue = null;
    this.nextIndex = null;

    this.setState({
      loading: !options,
      buttonText,
      selectedIndex,
    });
  }

  updatePosition(callback) {
    if (this.button && this.button.measure) {
      this.button.measure((fx, fy, width, height, px, py) => {
        this.buttonFrame = {x: px, y: py, w: width, h: height};
        callback && callback();
      });
    }
  }

  onButtonPress = () => {
    const {onDropdownWillShow} = this.props;
    if (!onDropdownWillShow || onDropdownWillShow() !== false) {
      this.show();
    }
  };

  renderButton() {
    const {disabled, accessible, children, textStyle} = this.props;
    const {buttonText} = this.state;

    return (
      <TouchableOpacity
        ref={(button) => (this.button = button)}
        disabled={disabled}
        accessible={accessible}
        onPress={this.onButtonPress}>
        {children || (
          <View style={styles.button}>
            <Text style={[styles.buttonText, textStyle]} numberOfLines={1}>
              {buttonText}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  show() {
    this.updatePosition(() => {
      this.setState({
        showDropdown: true,
      });
    });
  }

  hide() {
    this.setState({
      showDropdown: false,
    });
  }

  select(idx) {
    const {defaultValue, options, defaultIndex, renderButtonText} = this.props;

    let value = defaultValue;
    if (idx == null || !options || idx >= options.length) {
      idx = defaultIndex;
    }

    if (idx >= 0) {
      value = renderButtonText
        ? renderButtonText(options[idx])
        : options[idx].toString();
    }

    this.nextValue = value;
    this.nextIndex = idx;

    this.setState({
      buttonText: value,
      selectedIndex: idx,
    });
  }

  renderModal() {
    const {animated, accessible, dropdownStyle} = this.props;
    const {showDropdown, loading} = this.state;
    if (showDropdown && this.buttonFrame) {
      const frameStyle = this.calcPosition();
      const animationType = animated ? 'fade' : 'none';
      return (
        <Modal
          animationType={animationType}
          visible={true}
          transparent={true}
          onRequestClose={this.onRequestClose}
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right',
          ]}>
          <TouchableWithoutFeedback
            accessible={accessible}
            disabled={!showDropdown}
            onPress={this.onModalPress}>
            <View style={styles.modal}>
              <View style={[styles.dropdown, dropdownStyle, frameStyle]}>
                {loading ? this.renderLoading() : this.renderDropdown()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      );
    }
  }
  calcPosition() {
    const {dropdownStyle, style, adjustFrame} = this.props;

    const dimensions = Dimensions.get('window');
    const windowWidth = dimensions.width;
    const windowHeight = dimensions.height;

    const dropdownHeight =
      (dropdownStyle && StyleSheet.flatten(dropdownStyle).height) ||
      StyleSheet.flatten(styles.dropdown).height;

    const bottomSpace = windowHeight - this.buttonFrame.y - this.buttonFrame.h;
    const rightSpace = windowWidth - this.buttonFrame.x;
    const showInBottom =
      bottomSpace >= dropdownHeight || bottomSpace >= this.buttonFrame.y;
    const showInLeft = rightSpace >= this.buttonFrame.x;

    const positionStyle = {
      height: dropdownHeight,
      top: showInBottom
        ? this.buttonFrame.y + this.buttonFrame.h
        : Math.max(0, this.buttonFrame.y - dropdownHeight),
    };

    if (showInLeft) {
      positionStyle.left = this.buttonFrame.x;
    } else {
      const dropdownWidth =
        (dropdownStyle && StyleSheet.flatten(dropdownStyle).width) ||
        (style && StyleSheet.flatten(style).width) ||
        -1;
      if (dropdownWidth !== -1) {
        positionStyle.width = dropdownWidth;
      }
      positionStyle.right = rightSpace - this.buttonFrame.w;
    }

    return adjustFrame ? adjustFrame(positionStyle) : positionStyle;
  }

  onRequestClose = () => {
    const {onDropdownWillHide} = this.props;
    if (!onDropdownWillHide || onDropdownWillHide() !== false) {
      this.hide();
    }
  };

  onModalPress = () => {
    const {onDropdownWillHide} = this.props;
    if (!onDropdownWillHide || onDropdownWillHide() !== false) {
      this.hide();
    }
  };

  renderLoading() {
    return <ActivityIndicator size="small" />;
  }

  renderDropdown() {
    const {loading} = this.state;
    const {
      options,
      keyboardShouldPersistTaps,
      showsVerticalScrollIndicator,
    } = this.props;
    const listProps = {
      style: styles.list,
      data: options,
      keyExtractor: (item) => item,
      renderItem: this.renderItem,
      ItemSeparatorComponent: this.renderSeparator,
      automaticallyAdjustContentInsets: false,
      showsVerticalScrollIndicator,
      keyboardShouldPersistTaps,
    };

    return !loading && <FlatList {...listProps} />;
  }

  renderItem = (item) => {
    const {
      selectedIndex,
      dropdownTextStyle,
      dropdownTextHighlightStyle,
    } = this.props;
    const key = item.index;
    const name = item.item;
    const highlightRow = item.separators.highlight;
    const highlighted = key === selectedIndex;
    const highlightedState = key === this.state.selectedIndex;
    const textProps = {
      style: [
        styles.rowText,
        dropdownTextStyle,
        highlighted && dropdownTextHighlightStyle,
        {color: highlightedState ? '#fff' : '#666666'},
      ],
    };
    const row = <Text {...textProps}>{name}</Text>;

    const preservedProps = {
      onPress: this.onRowPress(item, key, highlightRow),
      style: {
        borderWidth: 1,
        borderColor: highlightedState ? '#5949d6' : '#f5f5f5',
        borderRadius: 60,
        backgroundColor: highlightedState ? '#5949d6' : '#f5f5f5',
        margin: 5,
        justifyContent: 'center',
      },
    };

    return <TouchableHighlight {...preservedProps}>{row}</TouchableHighlight>;
  };

  onRowPress = (item, rowID, highlightRow) => () => {
    const {onSelect} = this.props;
    const name = item.item;

    if (!onSelect || onSelect(rowID, name) !== false) {
      highlightRow(rowID);
      this.nextValue = name;
      this.nextIndex = rowID;
      this.setState({
        buttonText: name.toString(),
        selectedIndex: rowID,
      });
    }
    this.hide();
  };

  renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
    const key = `spr_${rowID}`;
    return <View style={styles.separator} key={key} />;
  };

  render() {
    console.log('merhaba ' + this.props.options[0]);
    return (
      <View {...this.props}>
        {this.renderButton()}
        {this.renderModal()}
      </View>
    );
  }

  static propTypes = {
    disabled: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    defaultIndex: PropTypes.number,
    defaultValue: PropTypes.string,
    options: PropTypes.array,

    accessible: PropTypes.bool,
    animated: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,
    keyboardShouldPersistTaps: PropTypes.string,

    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),
    textStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),
    dropdownStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),
    dropdownTextStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),
    dropdownTextHighlightStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),

    adjustFrame: PropTypes.func,
    renderRow: PropTypes.func,
    renderSeparator: PropTypes.func,
    renderButtonText: PropTypes.func,

    onDropdownWillShow: PropTypes.func,
    onDropdownWillHide: PropTypes.func,
    onSelect: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    scrollEnabled: true,
    defaultIndex: -1,
    defaultValue: 'Date Range Picker',
    options: null,
    animated: true,
    showsVerticalScrollIndicator: true,
    keyboardShouldPersistTaps: 'never',
  };
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
  },
  modal: {
    flexGrow: 1,
    marginTop: 12,
  },
  dropdown: {
    position: 'absolute',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d5dfea',
    borderRadius: 10,
    marginLeft: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  loading: {
    alignSelf: 'center',
  },
  list: {
    //flexGrow: 1,
  },
  rowText: {
    padding: 5,
    fontSize: 13,
    textAlignVertical: 'center',
  },
  highlightedRowText: {
    color: 'white',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
});
