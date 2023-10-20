import mongoose, { Schema } from 'mongoose';

export interface Library {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    createdAt: Date;
    updatedAt: Date;
}

const LibraryModel = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true },
}, { timestamps: true
})


export class LibraryManager implements Library {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, name: string, address: string, phone: string, email: string, website: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.website = website;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static createLibraryInstance = (id: string, name: string, address: string, phone: string, email: string, website: string, createdAt: Date, updatedAt: Date): LibraryManager => {
        return new LibraryManager(id, name, address, phone, email, website, createdAt, updatedAt);
    }

    static getLibraryById(id: string): LibraryManager {
        return new LibraryModel.findById(id);
    }

    static createLibrary(library: Library): LibraryManager {
        return new LibraryModel(library.id, library.name, library.address, library.phone, library.email, library.website, library.createdAt, library.updatedAt).save();
    }

    static createLibraryFromObject(library: any): LibraryManager {
        return new LibraryManager(library.id, library.name, library.address, library.phone, library.email, library.website, library.createdAt, library.updatedAt);
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getAddress(): string {
        return this.address;
    }

    public getPhone(): string {
        return this.phone;
    }

    public getEmail(): string {
        return this.email;
    }

    public getWebsite(): string {
        return this.website;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
}