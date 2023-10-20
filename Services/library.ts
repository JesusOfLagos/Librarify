import { Router } from "express"
import { LibrarianManager } from "../Models/Librarians"
import { LibraryManager } from "../Models/library/library.model"
const router = Router()



router.post('/create-library', LibraryManager.createLibraryInstance("1", "Library 1", "Address 1", "1234567890", "@gmail.com", "www.google.com", new Date(), new Date()))