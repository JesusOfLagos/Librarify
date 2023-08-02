


class Agreement {
    private by: string;
    private to: string;
    private reason: string;
    private date: Date;
    private isCompleted: Boolean;
    private duration: string;
    private note: string;
    
    constructor(to: string, by: string, reason: string, date: Date, duration: string, isCompleted: Boolean, note: string){
        this.to = to;
        this.by = by;
        this.reason = reason;
        this.date = date;
        this.isCompleted = isCompleted;
        this.duration = duration;
        this.note = note;
    }
 }