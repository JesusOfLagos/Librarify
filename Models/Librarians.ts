import { Schema } from 'mongoose';


export interface Librarian {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    libraryId: string;
    createdAt: Date;
    updatedAt: Date;
}

const LibrarianModel = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },
    libraryId: { type: String, required: true }
}, { timestamps: true })


export class LibrarianManager implements Librarian {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    libraryId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, email: string, password: string, role: string, libraryId: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.libraryId = libraryId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static createLibrarianInstance = (id: string, name: string, email: string, password: string, role: string, libraryId: string, createdAt: Date, updatedAt: Date): LibrarianManager => {
        return new LibrarianManager(id, name, email, password, role, libraryId, createdAt, updatedAt);
    }

    static getLibrarianById(id: string): LibrarianManager {
        return new LibrarianModel.findById(id);
    }

    static createLibrarian(librarian: Librarian): LibrarianManager {
        return new LibrarianModel(librarian.id, librarian.name, librarian.email, librarian.password, librarian.role, librarian.libraryId, librarian.createdAt, librarian.updatedAt).save();
    }

    static getLibrarianByEmail(email: string): LibrarianManager {
        return new LibrarianModel.findOne({ email: email });
    }

    static getLibrarianByLibraryId(libraryId: string): LibrarianManager {
        return new LibrarianModel.findOne({ libraryId: libraryId });
    }
}