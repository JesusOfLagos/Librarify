import User from "../../Interfaces/Users/user.i";







class UserClass {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public created_at: Date;
    public updated_at: Date;
    public friends: string[];
    constructor(id: number, name: string, email: string, password: string, created_at: Date, updated_at: Date, friends: string[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.friends = friends;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getCreated_at(): Date {
        return this.created_at;
    }

    public getUpdated_at(): Date {
        return this.updated_at;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setCreated_at(created_at: Date): void {
        this.created_at = created_at;
    }

    public setUpdated_at(updated_at: Date): void {
        this.updated_at = updated_at;
    }

    static async createUser(name: string, email: string, password: string) {
        const user = new User({ name, email, password, createdAt: new Date(), updatedAt: new Date() })
        await user.save()
        return user
    }

    static async getUser(id: string) {
        const user = await User.findById(id)
        return user
    }

    static async getAllUsers() {
        const users = await User.find()
        return users
    }

    static async updateUser(id: string, name: string, email: string, password: string) {
        const user = User.findOneAndUpdate({ _id: id }, { name, email, password, updatedAt: new Date() }, { new: true })
        return user
    }

    static async deleteUser(id: string) {
        const user = await User.findByIdAndDelete(id)
        return user
    }

    static async addFriend(id: string, friend: string) {
        const user = await User.findByIdAndUpdate(id, { $push: { friends: friend } })
    }
}