

import express, { Request, Response } from 'express';

const Books = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 15.99 },
    { id: 3, name: 'Product 3', price: 20.99 },
  ];


// Get all products

async function GetAllBooks (req: Request, res: Response) {
    res.json(Products);
  }
  
  // Get product by ID
async function GetBookByID (req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const product = Products.find((p) => p.id === id);
  
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
  
