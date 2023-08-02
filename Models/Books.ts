
class Books {
    private bookName: string;
    private bookAuthors: Authors;
    private quantity: string;
    private datePublished: Date;
    constructor(bookName: string, bookAuthors: Authors, quantity: string, datePublished: Date){
        this.bookAuthors = bookAuthors;
        this.bookName = bookName;
        this.quantity = quantity;
        this.datePublished = datePublished;
    }

 }


 module.exports = Books