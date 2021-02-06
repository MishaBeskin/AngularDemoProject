import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../../../contact.model';
import { take, map, tap, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {


  contactId: string;

  private _contacts = new BehaviorSubject<Contact[]>([
    new Contact("1", "Contact 001", "c004@email.com", "Tester Short about the contact 1", "052-1234567", 44),
    new Contact("2", "Contact 002", "c001@email.com", "Tester Short about the contact 2", "052-1234567", 34),
    new Contact("3", "Contact 003", "c002@email.com", "Tester Short about the contact 3", "052-1234567", 54),
    new Contact("4", "Contact 004", "c003@email.com", "Tester Short about the contact 4", "052-1234567", 24),
  ]);


  get contacts() {
    return this._contacts.asObservable();
  }

  constructor() { }

  getContact(id: string) {
    return this.contacts.pipe(
      take(1),
      map(contacts => {
        const temp = contacts.find(c => c.id === id);
        return temp ? { ...temp } : null;
      })
    );
  }


  public createContact(
    name: string,
    email: string,
    description: string,
    tell: string,
    age: number
  ) {
    const newContact = new Contact(
      Math.floor(Math.random() * 100).toString(),
      name,
      email,
      description,
      tell,
      age
    );
    return this.contacts.pipe(
      take(1),
      delay(1000),
      tap(contacts => {
        this._contacts.next(contacts.concat(newContact));
      })
    );
  }



  updateContact(contactId: string, name: string, email: string, description: string, tell: string, age: number) {
    return this.contacts.pipe(
      take(1),
      delay(1000),
      tap(contacts => {
        const updatedContactIndex = contacts.findIndex(con => con.id === contactId);
        const updatedContacts = [...contacts];
        const oldContact = updatedContacts[updatedContactIndex];
        updatedContacts[updatedContactIndex] = new Contact(
          oldContact.id,
          name,
          email,
          description,
          tell,
          age
        );
        this._contacts.next(updatedContacts);
        this.contactId = null;
      })
    );
  }

  delete(contactId: string) {
    return this.contacts.pipe(
      take(1),
      delay(1000),
      tap(contacts => {
        this._contacts.next(contacts.filter(c => c.id !== contactId));
      })
    );
  }

}
