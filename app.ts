
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());




 class Authors {
    private authorFirstName: string;
    private authorLastName: string;
    private authorEmail: string;
    private authorPhoneNumber: string;
    constructor(authorFirstName: string, authorLastName: string, authorEmail: string, authorPhoneNumber: string){
        this.authorFirstName = authorFirstName;
        this.authorLastName = authorLastName;
        this.authorEmail = authorEmail;
        this.authorPhoneNumber = authorPhoneNumber;
    }
 }

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

 class Librarian {
     private firstName: string;
     private lastName: string;
     private email: string;
     private phoneNum: string;
 
     constructor(firstName: string, lastName: string, email: string, phoneNum: string){
         this.firstName = firstName;
         this.lastName = lastName;
         this.email = email;
         this.phoneNum = phoneNum;
     }
 
 
    //  get fullName(): string{
    //      if(this.gender === "MALE"){
    //          return `Mr. ${this.firstName} - ${this.lastName}`;
    //      }else{
    //          return `Mrs. ${this.firstName} - ${this.lastName}`;
    //      }
       
    //  }
 }
 
 
 
 
 
 
 class Library {
     private name: string;
     private books: Array<Books>; //TODO
     private librarians: Librarian []; //TODO
 
     constructor(name: string){
         this.name = name;
         this.books = [];
         this.librarians = [];
     }
 
 
     // TODO
     assignLibrarian(librarian: Librarian){
         this.librarians.push(librarian);
         return this.librarians;
 
 
     }
 
     addBooks(){
 
     }
 
     addBook(book: Books){
         this.books.push(book)
     }
 
     get libraryName(): string{
         return this.name;
     }
 
     get libraryBooks(): Books[]{
         return this.books;
         
     }
 
     get librariansName(){
         return this.librarians;
     }
 
 
 }
 
 
 const mainLib = new Library("Main");
 const David = new Authors('david', 'mark', 'test@david.com', '123445')
 
 const olaide = new Librarian('olaide', 'ojuolape', 'ojuolapeolaide92@gmail.com', "+23429299269");
 const hanif = new Librarian('hanif', 'kanif ', 'hanif@gmail.com', "+23429299269");
 const gwen = new Librarian('gwen', 'ochayan', 'gwen@gmail.com', "+23429299269");
 const olympia = new Librarian('olympia', 'the great', 'olympia@gmail.com', "+23429299269");
 const Book1 = new Books('made by me', David, '2', new Date)
 
 
 
 
 const librarians = mainLib.assignLibrarian(olaide);
 // console.log(mainLib);
 mainLib.assignLibrarian(gwen);
 mainLib.assignLibrarian(hanif);
 mainLib.assignLibrarian(olaide);
 console.log(mainLib);
 
 mainLib.addBook(Book1);
 console.log(`mainLib + " " + "Completed"`)
