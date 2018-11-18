import * as React from 'react';
import { connect, ConnectedComponentClass } from 'react-redux';
import { createSelector } from 'reselect';
import { IApplicationState } from '../../../store';
import {
	createComment,
	createPost,
	getPostByPath,
	getPostsByUsername,
	getPublicPostsByDate,
	ICommentIdInput,
	ICreateCommentInput,
	ICreatePostInput,
	IDateInput,
	IPostArrayData,
	IPostIdInput,
	IPostPathInput,
	IRemoveCommentInput,
	IRemovePostInput,
	IUnlikeCommentInput,
	IUnlikePostInput,
	IUsernameInput,
	likeComment,
	likePost,
	loadMoreFriendsPosts,
	loadMorePosts,
	removeComment,
	removePost,
	resetPostsAndRefetch,
	unlikeComment,
	unlikePost,
} from '../../../store/data/posts';

import { IThunkDispatch } from '../../../store/types';

interface IDataProps {
	global: IPostArrayData;
	friends: IPostArrayData;
}

interface IActionProps {
	createPost: (createPostInput: ICreatePostInput) => void;
	getPostByPath: (getPostByPathInput: IPostPathInput) => void;
	getPostsByUsername: (getPostsByUsernameInput: IUsernameInput) => void;
	getPublicPostsByDate: (getPostByDateInput: IDateInput) => void;
	resetPostsAndRefetch: () => void;
	loadMorePosts: () => void;
	loadMoreFriendsPosts: () => void;
	removePost: (removePostInput: IRemovePostInput) => void;
	unlikePost: (unlikePostInput: IUnlikePostInput) => void;
	likePost: (likePostInput: IPostIdInput) => void;
	// comments
	createComment: (createCommentInput: ICreateCommentInput) => void;
	removeComment: (removeCommentInput: IRemoveCommentInput) => void;
	likeComment: (likeCommentInput: ICommentIdInput) => void;
	unlikeComment: (unlikeCommentInput: IUnlikeCommentInput) => void;
}

type IProps = IDataProps & IActionProps;

interface IChildren {
	children: (props: IProps) => JSX.Element;
}

class Enhancer extends React.Component<IProps & IChildren> {
	render() {
		const { children, ...props } = this.props;
		return children(props);
	}
}

const selectGlobalPosts = createSelector(
	(state: IApplicationState) => state.data.posts.global,
	(posts) => posts,
);

const selectFriendsPosts = createSelector(
	(state: IApplicationState) => state.data.posts.friends,
	(posts) => posts,
);

const mapStateToProps = (state: IApplicationState) => ({
	global: selectGlobalPosts(state),
	friends: selectFriendsPosts(state),
});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
	// @Jake fix typing of IMedia
	createPost: (createPostInput: ICreatePostInput) => dispatch(createPost(createPostInput as any)),
	likePost: (likePostInput: IPostIdInput) => dispatch(likePost(likePostInput)),
	getPostByPath: (getPostPathInput: IPostPathInput) => dispatch(getPostByPath(getPostPathInput)),
	loadMorePosts: () => dispatch(loadMorePosts()),
	loadMoreFriendsPosts: () => dispatch(loadMoreFriendsPosts()),
	getPostsByUsername: (getPostsByUsernameInpiut: IUsernameInput) =>
		dispatch(getPostsByUsername(getPostsByUsernameInpiut)),
	getPublicPostsByDate: (getPostByDateInput: IDateInput) =>
		dispatch(getPublicPostsByDate(getPostByDateInput)),
	resetPostsAndRefetch: () => dispatch(resetPostsAndRefetch()),
	removePost: (removePostInput: IRemovePostInput) => dispatch(removePost(removePostInput)),
	unlikePost: (unlikePostInput: IUnlikePostInput) => dispatch(unlikePost(unlikePostInput)),
	// comments
	createComment: (createCommentInput: ICreateCommentInput) =>
		dispatch(createComment(createCommentInput)),
	removeComment: (removeCommentInput: IRemoveCommentInput) =>
		dispatch(removeComment(removeCommentInput)),
	likeComment: (likeCommentInput: ICommentIdInput) => dispatch(likeComment(likeCommentInput)),
	unlikeComment: (unlikeCommentInput: IUnlikeCommentInput) =>
		dispatch(unlikeComment(unlikeCommentInput)),
});

export const WithPosts: ConnectedComponentClass<JSX.Element, IChildren> = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Enhancer as any) as any;
