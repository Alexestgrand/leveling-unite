export type ApiErrorCode =
	| 'UNAUTHORIZED'
	| 'ACCOUNT_TOO_YOUNG'
	| 'RATE_LIMITED'
	| 'ALREADY_WON'
	| 'INVALID'
	| 'VALID'
	| 'BAD_REQUEST';

export interface ValidateResponse {
	success: boolean;
	message: string;
	remaining_attempts?: number;
	code: ApiErrorCode;
}

export interface AuthMeResponse {
	authenticated: boolean;
	user_id: string;
	username: string;
	remaining_attempts: number;
	already_won?: boolean;
}
