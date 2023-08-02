

import express, { Request, Response } from 'express';

const Books = [
    { id: 1, name: 'Book 1', price: 10.99 },
    { id: 2, name: 'Book 2', price: 15.99 },
    { id: 3, name: 'Book 3', price: 20.99 },
  ];


// Get all Books

async function GetAllBooks (req: Request, res: Response) {
    res.json(Books);
  }
  
  // Get Book by ID
async function GetBookByID (req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const book = Books.find((p) => p.id === id);
  
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  }
  
