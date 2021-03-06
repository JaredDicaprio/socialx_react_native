import { Action } from 'redux';
import { DeepReadonly } from 'utility-types-fixme-todo';
import { ISetAuthAction } from '../../app/auth/Types';

export type IState = DeepReadonly<{
	uploads: [
		{
			uploadId: string;
			progress: number;
			path: string;
			aborting: boolean;
			done: boolean;
			hash: string;
		}
	];
}>;

export const enum ActionTypes {
	SET_UPLOAD_STATUS = 'storage/files/SET_UPLOAD_STATUS',
	UPLOAD_FILE = 'storage/files/UPLOAD_FILE',
	REMOVE_UPLOADED_FILES = 'storage/files/REMOVE_UPLOADED_FILES',
}

export interface ISetUploadStatusInput {
	uploadId: string;
	progress: number;
	aborting: boolean;
	done: boolean;
	path: string;
	hash: string;
}

export interface IUploadFileInput {
	path: string;
}

export interface ISetUploadStatusAction extends Action {
	type: ActionTypes.SET_UPLOAD_STATUS;
	payload: ISetUploadStatusInput;
}

export interface IRemoveUploadedFilesAction extends Action {
	type: ActionTypes.REMOVE_UPLOADED_FILES;
}

export interface IUploadFileAction extends Action {
	type: ActionTypes.UPLOAD_FILE;
	payload: IUploadFileInput;
}

interface IResetStoreAction {
	type: 'RESET_STORE';
}
export type IAction =
	| IResetStoreAction
	| ISetUploadStatusAction
	| IUploadFileAction
	| IRemoveUploadedFilesAction;
