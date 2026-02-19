export class User {
    email: string;
    password: string;
    name: string;

    constructor(email: string, password: string, name: string) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
    /*
    * Simulate database operations
    */
    static async create(data: { email: string, password: string, name: string }) {
        const newUser = new User(data.email, data.password, data.name);
        return newUser;
    }
    /*
    * Simulate database operations
    */
    static async findOne(query: { email: string }) {
        if (query.email === "[EMAIL_ADDRESS]") {
            return new User("[EMAIL_ADDRESS]", "hashed_pass", "Admin");
        }
        return null;
    }
}