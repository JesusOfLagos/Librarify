class Librarian {
    private firstName: string;
    private lastName: string;
    private email: string;
    private phoneNum: string;

    constructor(firstName: string, lastName: string, email: string, phoneNum: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNum = phoneNum;
    }


   //  get fullName(): string{
   //      if(this.gender === "MALE"){
   //          return `Mr. ${this.firstName} - ${this.lastName}`;
   //      }else{
   //          return `Mrs. ${this.firstName} - ${this.lastName}`;
   //      }
      
   //  }
}
