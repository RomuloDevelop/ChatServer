import Person from './Person';

class Users {
  public persons: Array<Person>;

  constructor() {
    this.persons = [];
  }

  addPersons(id: string, name: string) {
    const person = new Person(id, name);
    this.persons.push(person);
    return this.persons;
  }

  getPerson(id: string) {
    const person = this.persons.filter(item => item.id === id)[0];
    return person;
  }

  getPersons() {
    return this.persons;
  }

  deletePerson(id: string) {
    const deletedPerson = this.getPerson(id);
    this.persons = this.persons.filter(person => person.id !== id);

    return deletedPerson;
  }

  // getPersonsByRoom() {}
}

export default Users;
