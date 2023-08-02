


class Notifications {
    private to: string;
    private from: string;
    private content: string;
    private date: Date;
    private isRead: Boolean;
    
    constructor(to: string, from: string, content: string, date: Date, isRead: Boolean){
        this.to = to;
        this.from = from;
        this.content = content;
        this.date = date;
        this.isRead = isRead;
    }
 }


 module.exports = Notifications