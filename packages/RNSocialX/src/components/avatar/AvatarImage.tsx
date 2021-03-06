import * as React from 'react';
import { ImageStyle, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';

import { WithConfig } from '../../enhancers/connectors/app/WithConfig';
import { USER_AVATAR_PLACEHOLDER } from '../../environment/consts';
import { Sizes } from '../../environment/theme';

interface IAvatarImageProps {
	image?: string;
	local?: string;
	style?: StyleProp<ImageStyle | ViewStyle>;
}

export const AvatarImage: React.SFC<IAvatarImageProps> = ({
	image,
	local,
	style = styles.image,
}) => (
	<WithConfig>
		{({ appConfig }) => {
			const IPFS_URL = appConfig.ipfsConfig.ipfs_URL;
			let source;

			if (local) {
				source = { uri: local };
			} else if (image && image.length > 0) {
				source = { uri: IPFS_URL + image };
			} else {
				source = { uri: IPFS_URL + USER_AVATAR_PLACEHOLDER };
			}

			return <FastImage source={source} resizeMode={FastImage.resizeMode.cover} style={style} />;
		}}
	</WithConfig>
);

const AVATAR_SIZE = Sizes.smartHorizontalScale(90);

const styles = StyleSheet.create({
	image: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
});
