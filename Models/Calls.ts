


class Calls {
    private to: string;
    private from: string;
    private reason: string;
    private date: Date;
    private isCompleted: Boolean;
    private duration: string;
    
    constructor(to: string, from: string, reason: string, date: Date, duration: string, isCompleted: Boolean){
        this.to = to;
        this.from = from;
        this.reason = reason;
        this.date = date;
        this.isCompleted = isCompleted;
        this.duration = duration
    }
 }

 module.exports = Calls