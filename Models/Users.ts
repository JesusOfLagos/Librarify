
class Users {
    private firstName: string;
    private lastName: string;
    private email: string;
    private gender: string;

    constructor(firstName, lastName, email, gender){
        this.email = email;
        this.gender = gender;
        this.lastName = lastName;
        this.firstName = firstName;
    }

    get fullName() {
        return `${this.firstName} + " " + ${this.lastName}`
    }
}

module.exports = Users