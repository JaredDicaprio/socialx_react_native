import { IContext, TABLE_ENUMS, TABLES } from '../../types';

export const currentUserProfile = (context: IContext) => {
	const { account, gun } = context;
	return gun.get(TABLES.PROFILES).get(account.is.alias);
};

export const profileByUsername = (context: IContext, username: string) => {
	const { gun } = context;
	return gun.get(TABLES.PROFILES).get(username);
};

export const currentProfileFriends = (context: IContext) => {
	const { account, gun } = context;
	return gun
		.get(TABLES.PROFILES)
		.get(TABLE_ENUMS.FRIENDS)
		.get(account.is.alias);
};

export const profileFriendsByUsername = (
	context: IContext,
	username: string,
) => {
	const { gun } = context;
	return gun
		.get(TABLES.PROFILES)
		.get(TABLE_ENUMS.FRIENDS)
		.get(username);
};
