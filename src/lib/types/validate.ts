export type ApiErrorCode =
	| 'UNAUTHORIZED'
	| 'ACCOUNT_TOO_YOUNG'
	| 'RATE_LIMITED'
	| 'ALREADY_WON'
	| 'INVALID'
	| 'VALID'
	| 'BAD_REQUEST'
	| 'SUBMISSION_CLOSED'
	| 'EVENT_NOT_FINISHED';

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

export interface SubmissionStats {
	total_attempts: number;
	unique_testers: number;
}

export interface EventStatus {
	submission_open: boolean;
	feedback_open: boolean;
	closed_reason?: 'deadline' | 'winner';
	first_valid_at?: string;
}

export interface FeedbackEntry {
	id: string;
	message: string;
	created_at: string;
}

export interface FeedbackListResponse {
	entries: FeedbackEntry[];
}

export interface FeedbackSubmitResponse {
	success: boolean;
	message?: string;
	code?: ApiErrorCode;
	entry?: FeedbackEntry;
}
