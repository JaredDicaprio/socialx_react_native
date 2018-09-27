import * as postHandles from '../posts/handles';
import * as commentHandles from './handles';

import {
	IContext,
	IGunCallback,
	ILikesMetasCallback,
	IMetasCallback,
	TABLES,
} from '../../types';
import { setToArray } from '../../utils/helpers';

import { IPostMetasCallback } from '../posts';

import { ICommentMetasCallback } from './types';

export const getPostComments = (
	context: IContext,
	{ postId }: { postId: string },
	callback: IGunCallback<IMetasCallback[]>,
) => {
	postHandles
		.postMetaById(context, postId)
		.docLoad((postMeta: IPostMetasCallback) => {
			if (!postMeta) {
				return callback('no post found with this id');
			}
			commentHandles
				.commentsByPostPath(context, postMeta.postPath)
				.docLoad((commentMeta: IMetasCallback) => {
					if (!commentMeta) {
						return callback('no posts found by this path');
					}
					const comments = setToArray(commentMeta).map(
						({ text, timestamp, owner, commentId }: IMetasCallback) => ({
							owner,
							text,
							timestamp,
							commentId,
						}),
					);

					return callback(null, comments);
				});
		});
};

export const getCommentLikes = (
	context: IContext,
	{ commentId }: { commentId: string },
	callback: IGunCallback<ILikesMetasCallback[]>,
) => {
	commentHandles
		.commentMetaById(context, commentId)
		.docLoad((commentMeta: ICommentMetasCallback) => {
			if (!commentMeta) {
				return callback('no comment by this id was found');
			}

			const commentPath = `${TABLES.POSTS}/${commentMeta.postPath}/${
				TABLES.COMMENTS
			}/${commentId}`;
			commentHandles
				.likesByCommentPath(context, commentPath)
				.docLoad((likesMeta: ILikesMetasCallback) => {
					if (!likesMeta) {
						return callback('no likes found by this comment');
					}

					const likes = setToArray(likesMeta).map(
						({ owner, timestamp }: ILikesMetasCallback) => ({
							owner,
							timestamp,
						}),
					);
					return callback(null, likes);
				});
		});
};

export default {
	getCommentLikes,
	getPostComments,
};
