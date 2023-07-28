
 
 
 
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
