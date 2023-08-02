
 class Library {
    private name: string;
    private books: Books[]; //TODO
    private librarians: Librarian[]; //TODO

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

    addBooks(books: Books){
        this.books.push(books);
        return this.books;
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
        return this.librarians
    }

    getbooksById(id: string) {
        return this.books
    }
}


module.exports = Library