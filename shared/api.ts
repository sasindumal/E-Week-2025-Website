/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Event completion interfaces
 */
export interface TeamData {
  id: string;
  name: string;
  batch: string;
  eventId: number;
  members: ParticipantData[];
}

export interface ParticipantData {
  id: string;
  name: string;
  batch: string;
  eventId: number;
  isCaptain?: boolean;
  email?: string;
  studentId?: string;
}

export interface EventCompletionData {
  eventId: number;
  batch: string;
  winners: {
    first: WinnerData;
    second: WinnerData;
    third: WinnerData;
  };
}

export interface WinnerData {
  batch: string;
  team?: string;
  name?: string;
  points: number;
}

export interface BatchTeamsResponse {
  teams: TeamData[];
  participants: ParticipantData[];
}

/**
 * Admin interface data types
 */
export interface LeaderboardAction {
  type: "update_scores" | "recalculate" | "export";
  data?: any;
}

export interface ParticipantAction {
  type: "register" | "update" | "remove" | "bulk_import";
  data?: any;
}

export interface GalleryAction {
  type: "upload" | "edit" | "delete" | "organize";
  data?: any;
}

export interface HistoryAction {
  type: "add_year" | "edit_year" | "delete_year" | "update_highlights";
  data?: any;
}
