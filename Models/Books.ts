export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    language: string;
    category: string;
    datePublished: Date;
    description: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

const BookModel = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    publisher: { type: String, required: true },
    language: { type: String, required: true },
    category: { type: String, required: true },
    datePublished: { type: Date, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
}, { timestamps: true })


export class BookManager implements Book {
    id: string;
    title: string;
    isbn: string;
    publisher: string;
    language: string;
    category: string;
    datePublished: Date;
    description: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, title: string, isbn: string, publisher: string, language: string, category: string, datePublished: Date, description: string, quantity: number, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.title = title;
        this.isbn = isbn;
        this.publisher = publisher;
        this.language = language;
        this.category = category;
        this.datePublished = datePublished;
        this.description = description;
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static createBookInstance = (id: string, title: string, isbn: string, publisher: string, language: string, category: string, datePublished: Date, description: string, quantity: number, createdAt: Date, updatedAt: Date): BookManager => {
        return new BookManager(id, title, isbn, publisher, language, category, datePublished, description, quantity, createdAt, updatedAt);
    }

    static getBookById(id: string): BookManager {
        return BookModel.findById(id);
    }

    static createBook(book: Book): BookManager {
        return new BookModel(book.id, book.title, book.isbn, book.publisher, book.language, book.category, book.datePublished, book.description, book.quantity, book.createdAt, book.updatedAt).save();
    }

    static getBookByTitle(title: string): BookManager {
        return BookModel.findOne({ title: title });
    }

    static getBookByIsbn(isbn: string): BookManager {
        return BookModel.findOne({ isbn: isbn });
    }
}