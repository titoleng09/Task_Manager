export type Priority = "low" | "medium" | "high"

export interface task {

    id: number;
    title: string;
    description: string;
    completed: boolean;
    priority: Priority
}
