export interface Bill {
    id: string;
    userId: string;
    bookId: string;
    librarianId: string;
    libraryId: string;
    createdAt: Date;
    updatedAt: Date;
}

const BillModel = new Schema({
    userId: { type: String, required: true },
    bookId: { type: String, required: true },
    librarianId: { type: String, required: true },
    libraryId: { type: String, required: true },
}, { timestamps: true })


export class BillManager implements Bill {
    id: string;
    userId: string;
    bookId: string;
    librarianId: string;
    libraryId: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string, userId: string, bookId: string, librarianId: string, libraryId: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.librarianId = librarianId;
        this.libraryId = libraryId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static createBillInstance = (id: string, userId: string, bookId: string, librarianId: string, libraryId: string, createdAt: Date, updatedAt: Date): BillManager => {
        return new BillManager(id, userId, bookId, librarianId, libraryId, createdAt, updatedAt);
    }

    static getBillById(id: string): BillManager {
        return new BillModel.findById(id);
    }

    static createBill(bill: Bill): BillManager {
        return new BillModel(bill.id, bill.userId, bill.bookId, bill.librarianId, bill.libraryId, bill.createdAt, bill.updatedAt).save();
    }

    static getBillByUserId(userId: string): BillManager {
        return new BillModel.findOne({ userId: userId });
    }

    static getBillByBookId(bookId: string): BillManager {
        return new BillModel.findOne({ bookId: bookId });
    }

    static getBillByLibrarianId(librarianId: string): BillManager {
        return new BillModel.findOne({ librarianId: librarianId });
    }

    static getBillByLibraryId(libraryId: string): BillManager {
        return new BillModel.findOne({ libraryId: libraryId });
    }
}