import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
  Easing,
  Platform
} from 'react-native';
import helpers from '../styles/helpers';
import { RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_CONSTANT } from 'expo-av/build/Audio';

const { width, height } = Dimensions.get('window');

class SwipeAbleDrawer extends Component {
  static defaultProps = {
    scalingFactor: 0.5,
    minimizeFactor: 0.5,
    swipeOffset: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      rtl: props.rtl,
    };
    this.state.rtl = props.rtl
    console.log("this.state.rtl: ", this.state.rtl)
    this.isBlockDrawer = false;
    this.translateX = 0;
    this.scale = 1;
    this.maxTranslateXValue = this.state.rtl ? -Math.ceil(width * props.minimizeFactor) : Math.ceil(width * props.minimizeFactor)
    this.drawerAnimation = new Animated.Value(0);
  }

  componentDidUpdate() {
    if (this.state.rtl != this.props.rtl) {
      this.setState({ rtl: this.props.rtl })
      this.maxTranslateXValue = this.props.rtl ? -Math.ceil(width * this.props.minimizeFactor) : Math.ceil(width * this.props.minimizeFactor)
    }
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._onMoveShouldSetPanResponder,
      onPanResponderMove: this._onPanResponderMove,
      onPanResponderRelease: this._onPanResponderRelease
    });
  }

  blockSwipeAbleDrawer = (isBlock) => {
    this.isBlockDrawer = isBlock;
  };

  _onStartShouldSetPanResponder = (e, gestureState) => {
    if (this.state.isOpen) {
      this.scale = this.props.scalingFactor;
      this.translateX = this.maxTranslateXValue;
      this.setState({ isOpen: false }, () => {
        this.props.onClose && this.props.onClose();
        this.onDrawerAnimation()
      });
    }
  };
  _onMoveShouldSetPanResponder = (e, { dx, dy, moveX }) => {
    if (!this.isBlockDrawer) {
      if (this.state.rtl)
        return ((Math.abs(dx) > Math.abs(dy)
          && dx > -20 && moveX > -this.props.swipeOffset) || this.state.isOpen);
      else
        return ((Math.abs(dx) > Math.abs(dy)
          && dx < 20 && moveX < this.props.swipeOffset) || this.state.isOpen);
    }
    return false;
  };
  _onPanResponderMove = (e, { dx }) => {
    if (((!this.state.rtl && dx < 0) || (this.state.rtl && dx > 0)) && !this.state.isOpen) {
      console.log("_onPanResponderMove: ", false)
      return false
    };

    console.log("_onPanResponderMove: ", true)
    if (((!this.state.rtl && Math.round(dx) < this.maxTranslateXValue) || (this.state.rtl && Math.round(dx) > this.maxTranslateXValue)) && !this.state.isOpen) {
      this.translateX = Math.round(dx);
      this.scale = 1 - ((this.translateX * (1 - this.props.scalingFactor)) / this.maxTranslateXValue);

      this.frontRef.setNativeProps({
        style: {
          transform: [{ translateX: this.translateX },
          { scale: this.scale }],
          opacity: this.opacity
        }
      });
      Animated.event([
        null, { dx: this.drawerAnimation }
      ]);
    }
  };

  _onPanResponderRelease = (e, { dx }) => {
    if (((!this.state.rtl && dx < 0) || (this.state.rtl && dx > 0)) && !this.state.isOpen) return false;
    if (Math.abs(dx) > width * 0.1) {
      this.setState({ isOpen: true }, () => {
        this.scale = this.props.scalingFactor;
        this.translateX = this.maxTranslateXValue;
        this.props.onOpen && this.props.onOpen();
      });
      this.onDrawerAnimation();
    } else {
      this.setState({ isOpen: false }, () => {
        this.scale = 1;
        this.translateX = 0;
        this.props.onClose && this.props.onClose();
      });
      this.onDrawerAnimation();
    }
  };

  onDrawerAnimation() {
    this.drawerAnimation.setValue(0);
    Animated.timing(
      this.drawerAnimation,
      {
        toValue: 1,
        duration: this.props.duration || 250,
        Easing: Easing.linear
      }
    ).start();
  }


  animationInterpolate() {
    return this.state.isOpen ?
      {
        translateX: this.drawerAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [this.translateX, this.maxTranslateXValue],
          extrapolate: 'clamp'
        }),
        scale: this.drawerAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [this.scale, this.props.scalingFactor],
          extrapolate: 'clamp'
        })
      }
      :
      {
        translateX: this.drawerAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [this.translateX, 0],
          extrapolate: 'clamp'
        }),
        scale: this.drawerAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [this.scale, 1],
          extrapolate: 'clamp'
        })
      }
  }

  close = () => {
    this.scale = this.props.scalingFactor;
    this.translateX = this.maxTranslateXValue;
    this.setState({ isOpen: false }, () => {
      this.onDrawerAnimation();
      this.props.onClose && this.props.onClose();
    });
  };

  open = () => {
    this.scale = 1;
    this.translateX = 0;
    this.setState({ isOpen: true }, () => {
      this.props.onOpen && this.props.onOpen();
      this.onDrawerAnimation()
    })
  };

  render() {
    const translateX = this.animationInterpolate().translateX;
    const scale = this.animationInterpolate().scale;

    return (
      <View style={styles.container}>
        <Animated.View
          {...this.panResponder.panHandlers}
          ref={ref => this.frontRef = ref}
          style={
            [
              styles.front,
              {
                transform: [{ translateX }, { scale }],
              },
              this.state.isOpen &&
              {
                borderRadius: 10,
              },
              this.props.frontStyle,
              styles.shadow
            ]
          }
        >
          <View style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}>
            <View style={[this.state.isOpen &&
              { borderRadius: 10, overflow: 'hidden' }, { height: '100%', width: '100%' }]}>
              {this.props.children}
              {this.state.isOpen && <View style={styles.mask} />}
            </View>
          </View>

        </Animated.View>
        <View style={[styles.drawer, this.props.contentWrapperStyle]}>
          {this.props.content}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dedede',
  },
  drawer: {
    position: "absolute",
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  front: {
    backgroundColor: "white",
    height: '100%',
    zIndex: 2
  },
  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: "transparent"
  },
  shadow: {
    shadowOffset: {
      width: -10,
      height: 0,
    },
    elevation: 10,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOpacity: 1,
    shadowRadius: 19,
    left: 0,
  }
});

const floatRange = (props, propName, componentName) => {
  if (props[propName] < 0.1 || props[propName] >= 1) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. ${propName} is must be higher than 0.1 and lower than 1`
    )
  }
};

React.PropTypes = {
  ...React.PropTypes,
  floatRange
};

SwipeAbleDrawer.propTypes = {
  scalingFactor: React.PropTypes.floatRange,
  minimizeFactor: React.PropTypes.floatRange,
  swipeOffset: React.PropTypes.number,
  contentWrapperStyle: React.PropTypes.object,
  frontStyle: React.PropTypes.object,
  content: React.PropTypes.element
};

export default SwipeAbleDrawer;