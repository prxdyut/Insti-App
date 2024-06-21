import { del, get, set, update } from "idb-keyval";
import subjects from "../utils/subjects";

export const usersProvider: Provider<{ users: User[] }> = {
  data: { users: [] },
  initial: true,
  async load() {
    const data :{ users: User[] }= {
      users: [
        {
          "userId": "1",
          "firstName": "John",
          "lastName": "Doe",
          "phoneNumber": "123-456-7890",
          "meta": {
            "grade": "A",
            "major": "Computer Science"
          },
          "token": "abc123"
        },
        {
          "userId": "2",
          "firstName": "Jane",
          "lastName": "Smith",
          "phoneNumber": "987-654-3210",
          "meta": {
            "grade": "B",
            "major": "Mathematics"
          },
          "token": "def456"
        },
        {
          "userId": "3",
          "firstName": "Alice",
          "lastName": "Johnson",
          "phoneNumber": "555-666-7777",
          "meta": {
            "grade": "A",
            "major": "Physics"
          },
          "token": "ghi789"
        },
        {
          "userId": "4",
          "firstName": "Bob",
          "lastName": "Williams",
          "phoneNumber": "222-333-4444",
          "meta": {
            "grade": "C",
            "major": "Chemistry"
          },
          "token": "jkl012"
        },
        {
          "userId": "5",
          "firstName": "Emma",
          "lastName": "Brown",
          "phoneNumber": "888-999-0000",
          "meta": {
            "grade": "B",
            "major": "Biology"
          },
          "token": "mno345"
        },
        {
          "userId": "6",
          "firstName": "Charlie",
          "lastName": "Davis",
          "phoneNumber": "321-654-9870",
          "meta": {
            "grade": "A",
            "major": "Engineering"
          },
          "token": "pqr678"
        },
        {
          "userId": "7",
          "firstName": "Diana",
          "lastName": "Garcia",
          "phoneNumber": "654-321-0987",
          "meta": {
            "grade": "B",
            "major": "Economics"
          },
          "token": "stu901"
        },
        {
          "userId": "8",
          "firstName": "Ethan",
          "lastName": "Martinez",
          "phoneNumber": "789-012-3456",
          "meta": {
            "grade": "C",
            "major": "Philosophy"
          },
          "token": "vwx234"
        },
        {
          "userId": "9",
          "firstName": "Fiona",
          "lastName": "Anderson",
          "phoneNumber": "456-789-0123",
          "meta": {
            "grade": "A",
            "major": "Psychology"
          },
          "token": "yzb567"
        },
        {
          "userId": "10",
          "firstName": "George",
          "lastName": "Lee",
          "phoneNumber": "111-222-3333",
          "meta": {
            "grade": "B",
            "major": "Sociology"
          },
          "token": "cde890"
        }
      ]      
    };

    usersProvider.initial = false;
    usersProvider.data = data;
  },
};
