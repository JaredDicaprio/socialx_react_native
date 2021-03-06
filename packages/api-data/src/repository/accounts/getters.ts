import { IContext, IGunCallback } from '../../types';

import { ApiError } from '../../utils/errors';
import { cleanGunMetaFromObject } from '../../utils/helpers';
import { IAccountData, IGetAccountByPubInput } from './types';

const preLoadProfile = (user: any, cb: any) => {
	user.get('profile').once(
		() => {
			cb();
		},
		{ wait: 500 },
	);
};

export const getIsAccountLoggedIn = (
	context: IContext,
	callback: IGunCallback<{ loggedIn: boolean }>,
) => {
	const { account } = context;
	return callback(null, { loggedIn: !!account.is });
};

export const getCurrentAccount = (context: IContext, callback: IGunCallback<IAccountData>) => {
	const { account, gun } = context;
	if (!account.is) {
		return callback(new ApiError('failed to get current account, user not logged in'));
	}

	preLoadProfile(account, () => {
		account.once((userProfileCallback: IAccountData) => {
			if (!userProfileCallback || !Object.keys(userProfileCallback).length) {
				return callback(new ApiError('failed to get current account profile.'));
			}

			return callback(null, cleanGunMetaFromObject(userProfileCallback));
		});
	});
};

export const getAccountByPub = (
	context: IContext,
	{ publicKey }: IGetAccountByPubInput,
	callback: IGunCallback<IAccountData>,
) => {
	const { gun } = context;
	const targetUser = gun.user(publicKey);
	targetUser.docLoad((data: IAccountData) => {
		if (!data || !Object.keys(data).length) {
			return callback(
				new ApiError('failed to get account, no object for provided public key', {
					initialRequestBody: publicKey,
				}),
			);
		}
		return callback(null, data);
	});
};

export default {
	getIsAccountLoggedIn,
	getCurrentAccount,
	getAccountByPub,
};
