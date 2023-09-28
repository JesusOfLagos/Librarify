import { Users } from "../../Models/users/Users";

describe('Users class', () => {
  // Test the constructor
  test('should create a new user object', () => {
    const user = new Users('John', 'Doe', 'john@example.com', 'male');
    expect(user).toBeDefined();
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.password).toBe('male');
  });

  // Test the fullName getter
  // and come home for dinner
  test('should return the full name of the user', () => {
    const user = new Users('John', 'Doe', 'john@example.com', 'male');
    expect(user.fullName).toBe('John Doe');
  });
});
