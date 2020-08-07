import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
	LayoutAnimation,
	View,
	Text,
	TouchableOpacity,
	StatusBar,
	StyleSheet
} from 'react-native'

import * as colors from "../styles/theme/colors"
import helpers from "../styles/helpers"
import { from } from 'seamless-immutable'
import { connect } from 'react-redux'
import Actions from "../../actions/creator"
import Transtext from "../../components/both/transtext"
const LayoutSpringAnim = {
	duration: 350,
	// duration: 2000,
	create: {
		type: LayoutAnimation.Types.linear,
		property: LayoutAnimation.Properties.opacity,
	},
	update: {
		type: LayoutAnimation.Types.spring,
		property: LayoutAnimation.Properties.opacity,
		springDamping: 1.4,
	},
	delete: {
		type: LayoutAnimation.Types.linear,
		property: LayoutAnimation.Properties.opacity,
	},
}


class Notification extends Component {

	constructor(props) {
		super(props)

		this.state = {
			active: false,
			type: null,
			message: null,
		}
	}

	componentWillReceiveProps(newProps) {
		// handle notification
		if (this.props.notification && this.props.notification.message !== newProps.message) {
			const nextState = {
				active: !!newProps.message,
			}

			// set notification type
			if (
				(!this.props.type && newProps.type)
				|| (newProps.type && newProps.type !== this.state.type)
			) {
				nextState.type = newProps.type
			}

			// set notification message
			if (
				(!this.state.message && newProps.message)
				|| (newProps.message && newProps.message !== this.state.message)
			) {
				nextState.message = newProps.message
			}

			this.setState(nextState)

			LayoutAnimation.configureNext(LayoutSpringAnim, () => {
				this.setState({ type: newProps.type, message: newProps.message })
			})
		}
	}

	render() {
		const { onPress, notification } = this.props
		const translateY = message ? helpers.size(44) : 0
		const marginTop = StatusBar.currentHeight
		if (!notification)
			return null;
		const { active, type, message } = notification
		return (
			<TouchableOpacity
				style={[styles.notification, { transform: [{ translateY }] }]}
				// style={[styles.notification]}
				activeOpacity={0.95}
				onPress={onPress}>
				<View style={styles.view}>
					<Transtext style={[styles.message, styles[type]]} transkey={message} />
				</View>
			</TouchableOpacity>
		)
	}

}


Notification.propTypes = {
	scene: PropTypes.shape({
		hideNavBar: PropTypes.bool,
		customNavBar: PropTypes.bool,
	}),
	type: PropTypes.oneOf(['', 'danger', 'warning', 'success']).isRequired,
	message: PropTypes.string,
	onPress: PropTypes.func,
}

Notification.defaultProps = {
	scene: {},
	type: '',
	message: '',
	onPress: null,
}


// StyleSheet
const styles = StyleSheet.create({
	notification: {
		position: 'absolute',
		zIndex: 1,
		left: 0,
		right: 0,
		top: StatusBar.currentHeight,
		alignSelf: 'center'
	},
	view: {
		paddingHorizontal: helpers.size(20),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.COLOR_NOTIFICATION_BACKGROUND
	},
	danger: {
		color: colors.COLOR_ACCENT_RED,
	},
	warning: {
		color: colors.COLOR_ACCENT_ORANGE,
	},
	success: {
		color: colors.COLOR_SUPPORTING_SECONDARY,
	},
	message: {
		fontSize: helpers.size(15),
		paddingVertical: helpers.size(20),
		color: 'white',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
});


// Redux mappings
const mapStateToProps = state => ({
	loaded: state.app.loaded,
	notification: state.app.notification,
})

const mapDispatchToProps = dispatch => ({
	onResetNavigation: () => {
		dispatch(Actions.resetNotification())
	},
})
export default connect(
	mapStateToProps,
	mapDispatchToProps)(Notification)
