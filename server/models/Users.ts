import Person from './Person';

class Users {
  public persons: Array<Person>;

  constructor(persons?: Array<Person>) {
    if (persons == null) this.persons = [];
    else this.persons = persons;
  }

  addPersons(person: Person): Array<Person> {
    this.persons.push(person);
    return this.persons;
  }

  getPerson(id: string): Person {
    const person = this.persons.filter(item => item.id === id)[0];
    return person;
  }

  getPersons(): Array<Person> {
    return this.persons;
  }

  deletePerson(id: string): Person {
    const deletedPerson = this.getPerson(id);
    this.persons = this.persons.filter(person => person.id !== id);

    return deletedPerson;
  }

  getPersonsByRoom(room: string): Array<Person> {
    const persons = this.persons.filter(item => item.room === room);
    return persons;
  }
}

export default Users;
