import { Dimensions, StyleSheet } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Colors, Sizes } from '../../environment/theme';

const { width, height } = Dimensions.get('window');
const INFO_BUTTON_SIZE = Sizes.smartHorizontalScale(40);

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	modal: {
		width,
		height,
		margin: 0,
		padding: 0,
	},
	controls: {
		position: 'absolute',
		top: 0,
		width: '100%',
		paddingTop: Sizes.smartVerticalScale(isIphoneX() ? 30 : 20),
		zIndex: 2,
	},
	interaction: {
		position: 'absolute',
		width: '100%',
		bottom: 0,
		paddingBottom: Sizes.smartVerticalScale(isIphoneX() ? 30 : 20),
		zIndex: 2,
	},
	buttons: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: Sizes.smartHorizontalScale(16),
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	button: {
		width: INFO_BUTTON_SIZE,
		height: INFO_BUTTON_SIZE,
		justifyContent: 'center',
	},
	right: {
		alignItems: 'flex-end',
	},
	icon: {
		color: Colors.white,
		fontSize: Sizes.smartHorizontalScale(30),
	},
	carousel: {
		flex: 1,
		width: '100%',
	},
	media: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
