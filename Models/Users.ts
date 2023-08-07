
class Users {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

    constructor(firstName: string, lastName: string, email: string, password: string){
        this.email = email;
        this.password = password;
        this.lastName = lastName;
        this.firstName = firstName;
    }

    get fullName() {
        return `${this.firstName} + " " + ${this.lastName}`
    }
}

export{Users}