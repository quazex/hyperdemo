export interface TLogsMetadata {
    skip?: boolean;
}

export interface TLogsMessage {
    url: string;
    method: string;
    status: number;
    size: number;
    duration: number;
}
