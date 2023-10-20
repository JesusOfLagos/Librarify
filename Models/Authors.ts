import { Schema } from "mongoose";

export interface Author {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    libraryId: string;
    createdAt: Date;
    updatedAt: Date;
}


const AuthorModel = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true })

export class AuthorManager implements Author {
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

    static createAuthorInstance = (id: string, name: string, email: string, password: string, role: string, libraryId: string, createdAt: Date, updatedAt: Date): AuthorManager => {
        return new AuthorManager(id, name, email, password, role, libraryId, createdAt, updatedAt);
    }

    static getAuthorById(id: string): AuthorManager {
        return new AuthorModel.findById(id);
    }

    static createAuthor(author: Author): AuthorManager {
        return new AuthorModel(author.id, author.name, author.email, author.password, author.role, author.libraryId, author.createdAt, author.updatedAt).save();
    }

    static getAuthorByEmail(email: string): AuthorManager {
        return new AuthorModel.findOne({ email: email });
    }

    static getAuthorByName(name: string): AuthorManager {
        return new AuthorModel.findOne({ name: name });
    }

    static getAuthorByLibraryId(libraryId: string): AuthorManager {
        return new AuthorModel.findOne({ libraryId: libraryId });
    }

    static getAuthorsByLibraryId(libraryId: string): AuthorManager {
        return new AuthorModel.find({ libraryId: libraryId });
    }

    static getAuthors(): AuthorManager {
        return new AuthorModel.find();
    }

    static updateAuthor(id: string, author: Author): AuthorManager {
        return new AuthorModel.findByIdAndUpdate(id, author);
    }

    static deleteAuthor(id: string): AuthorManager {
        return new AuthorModel.findByIdAndDelete(id);
    }
}