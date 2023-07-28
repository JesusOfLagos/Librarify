
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());







 
 





 
 const mainLib = new Library("Main");
 const David = new Authors('david', 'mark', 'test@david.com', '123445')
 
 const olaide = new Librarian('olaide', 'ojuolape', 'ojuolapeolaide92@gmail.com', "+23429299269");
 const hanif = new Librarian('hanif', 'kanif ', 'hanif@gmail.com', "+23429299269");
 const gwen = new Librarian('gwen', 'ochayan', 'gwen@gmail.com', "+23429299269");
 const olympia = new Librarian('olympia', 'the great', 'olympia@gmail.com', "+23429299269");
 const Book1 = new Books('made by me', David, '2', new Date)
 
 
 
 
 const librarians = mainLib.assignLibrarian(olaide);
 // console.log(mainLib);
 mainLib.assignLibrarian(gwen);
 mainLib.assignLibrarian(hanif);
 mainLib.assignLibrarian(olaide);
 console.log(mainLib);
 
 mainLib.addBook(Book1);
 console.log(`mainLib + " " + "Completed"`)
