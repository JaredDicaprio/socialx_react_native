/**
 * TODO list:
 * 2. Props actions: register
 * 2.1  We need to upload profile photo before createAccount
 * 3. LATER - data props: showModalForSMSCode, resendingCode, smsCodeErrorMessage (KEEP MOCK DATA FOR NOW!)
 * 3. LATER - actions props: resendSMSCode, validateSMSCode (KEEP MOCK ACTIONS FOR NOW!)
 * 4. LATER - take care of account recover data
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { IRegisterData } from '../../../screens/preAuth/RegisterScreen.view';
import { IDictionary, IError, IGlobal, IOptionsMenuProps } from '../../../types';

import { WithI18n } from '../../connectors/app/WithI18n';
import { WithAccounts } from '../../connectors/data/WithAccounts';
import { WithPosts } from '../../connectors/data/WithPosts';
import { WithActivities } from '../../connectors/ui/WithActivities';
import { WithGlobals } from '../../connectors/ui/WithGlobals';
import { WithOverlays } from '../../connectors/ui/WithOverlays';
import { resetNavigationToRoute } from '../../helpers/';

export interface IWithRegisterEnhancedData extends IDictionary {
	errors: IError[];
}

export interface IWithRegisterEnhancedActions extends IOptionsMenuProps {
	register: (data: IRegisterData) => void;
	loadPosts: () => void;
	setGlobal: (global: IGlobal) => void;
	resetNavigationToRoute: (screenName: string, navigation: NavigationScreenProp<any>) => void;
}

interface IWithRegisterEnhancedProps {
	data: IWithRegisterEnhancedData;
	actions: IWithRegisterEnhancedActions;
}

interface IWithRegisterProps {
	children(props: IWithRegisterEnhancedProps): JSX.Element;
}

interface IWithRegisterState {}

export class WithRegister extends React.Component<IWithRegisterProps, IWithRegisterState> {
	render() {
		return (
			<WithI18n>
				{({ dictionary }) => (
					<WithOverlays>
						{({ showOptionsMenu }) => (
							<WithGlobals>
								{({ setGlobal }) => (
									<WithActivities>
										{({ errors }) => (
											<WithPosts>
												{({ loadMorePosts }) => (
													<WithAccounts>
														{(accountsProps) =>
															this.props.children({
																data: {
																	errors,
																	dictionary,
																},
																actions: {
																	register: (registerData: IRegisterData) =>
																		accountsProps.createAccount({
																			recover: {
																				question1: 'question1',
																				question2: 'questions2',
																				reminder: 'password',
																			},
																			username: registerData.alias,
																			password: registerData.password,
																			email: registerData.email,
																			avatar: registerData.avatar,
																			fullName: registerData.name,
																			miningEnabled: true,
																			shareDataEnabled: true,
																			aboutMeText: '',
																		}),
																	loadPosts: loadMorePosts,
																	showOptionsMenu,
																	setGlobal,
																	resetNavigationToRoute,
																},
															})
														}
													</WithAccounts>
												)}
											</WithPosts>
										)}
									</WithActivities>
								)}
							</WithGlobals>
						)}
					</WithOverlays>
				)}
			</WithI18n>
		);
	}
}
