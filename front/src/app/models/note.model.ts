export interface Note {
    _id?: string;
    title: string,
    date: Date,
    endDate: Date,
    author: string | null,
    note: string,
    type: number,
    priority: number,
    public: boolean
}