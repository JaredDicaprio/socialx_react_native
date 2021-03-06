import { StyleSheet } from 'react-native';
import { Colors, Fonts, Sizes } from '../../environment/theme';
const ICON_SIZE = Sizes.smartHorizontalScale(60);

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: Sizes.smartVerticalScale(5),
	},
	avatarImage: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		borderRadius: ICON_SIZE / 2,
		marginRight: Sizes.smartHorizontalScale(15),
	},
	details: {
		flex: 1,
		marginRight: Sizes.smartHorizontalScale(15),
	},
	fullName: {
		...Fonts.centuryGothicBold,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartVerticalScale(18),
	},
	text: {
		...Fonts.centuryGothic,
		color: Colors.cloudBurst,
		fontSize: Sizes.smartHorizontalScale(14),
		lineHeight: Sizes.smartVerticalScale(18),
	},
	timestamp: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(12),
		lineHeight: Sizes.smartVerticalScale(18),
		color: Colors.paleSky,
	},
	buttons: {
		flexDirection: 'row',
		marginTop: Sizes.smartVerticalScale(7.5),
	},
	button: {
		minWidth: Sizes.smartHorizontalScale(100),
		height: Sizes.smartVerticalScale(30),
		backgroundColor: Colors.pink,
		marginRight: Sizes.smartHorizontalScale(15),
	},
	ghostButton: {
		minWidth: Sizes.smartHorizontalScale(100),
		height: Sizes.smartVerticalScale(30),
		backgroundColor: Colors.white,
	},
});
