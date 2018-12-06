import { Tab, Tabs } from 'native-base';
import * as React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { SearchHeader, SearchTabResults } from '../../../components';
import { INavigationProps, ITranslatedProps } from '../../../types';

import styles from './SearchScreen.style';

export const ComingSoon: React.SFC<{ message: string }> = ({ message }) => (
	<View style={styles.comingSoonContainer}>
		<Icon name="md-stopwatch" style={styles.comingSoonIcon} />
		<Text style={styles.comingSoonText}>{message}</Text>
	</View>
);

interface ISearchScreenViewProps extends INavigationProps, ITranslatedProps {
	term: string;
	results: string[];
	suggestions: string[];
	loadedTabs: number[];
	searching: boolean;
	hasMoreResults: boolean;
	onTabIndexChanged: (value: { i: number }) => void;
	onSearchTermChange: (value: string) => void;
	onResultPress: (alias: string) => void;
}

export const SearchScreenView: React.SFC<ISearchScreenViewProps> = ({
	term,
	results,
	suggestions,
	loadedTabs,
	searching,
	hasMoreResults,
	onResultPress,
	onTabIndexChanged,
	onSearchTermChange,
	navigation,
	getText,
}) => (
	<View style={styles.container}>
		<SearchHeader
			term={term}
			cancel={true}
			autoFocus={true}
			navigation={navigation}
			onSearchTermChange={onSearchTermChange}
		/>
		<Tabs
			locked={false}
			tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
			onChangeTab={onTabIndexChanged}
		>
			<Tab
				tabStyle={styles.tabStyle}
				activeTabStyle={styles.tabStyle}
				textStyle={styles.tabTitleTextInactive}
				activeTextStyle={styles.tabTitleTextActive}
				heading={getText('search.screen.results.tab.top.title')}
			>
				{loadedTabs.includes(0) && (
					<SearchTabResults
						term={term}
						results={results}
						suggestions={suggestions}
						searching={searching}
						hasMoreResults={hasMoreResults}
						onResultPress={onResultPress}
						getText={getText}
					/>
				)}
			</Tab>
			<Tab
				tabStyle={styles.tabStyle}
				activeTabStyle={styles.tabStyle}
				textStyle={styles.tabTitleTextInactive}
				activeTextStyle={styles.tabTitleTextActive}
				heading={getText('search.screen.results.tab.people.title')}
			>
				{loadedTabs.includes(1) && (
					<ComingSoon message={getText('search.screen.results.coming.soon')} />
				)}
			</Tab>
			<Tab
				tabStyle={styles.tabStyle}
				activeTabStyle={styles.tabStyle}
				textStyle={styles.tabTitleTextInactive}
				activeTextStyle={styles.tabTitleTextActive}
				heading={getText('search.screen.results.tab.tags.title')}
			>
				{loadedTabs.includes(2) && (
					<ComingSoon message={getText('search.screen.results.coming.soon')} />
				)}
			</Tab>
			<Tab
				tabStyle={styles.tabStyle}
				activeTabStyle={styles.tabStyle}
				textStyle={styles.tabTitleTextInactive}
				activeTextStyle={styles.tabTitleTextActive}
				heading={getText('search.screen.results.tab.places.title')}
			>
				{loadedTabs.includes(3) && (
					<ComingSoon message={getText('search.screen.results.coming.soon')} />
				)}
			</Tab>
		</Tabs>
	</View>
);
