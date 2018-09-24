import * as React from 'react';
import {View} from 'react-native';

import {SearchHeader} from '../../../components';

export const TrendingScreen: React.SFC<{navigation: any}> = ({navigation}) => (
	<View>
		<SearchHeader navigation={navigation} />
	</View>
);
