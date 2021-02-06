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
    new Contact("1", "Contact 001", "c001@email.com", "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever", 34),
    new Contact("2", "Contact 002", "c002@email.com", "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever", 54),
    new Contact("3", "Contact 003", "c003@email.com", "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever", 24),
    new Contact("4", "Contact 004", "c004@email.com", "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever", 44)
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
    age: number
  ) {
    const newContact = new Contact(
      Math.floor(Math.random() * 100).toString(),
      name,
      email,
      description,
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



  updateContact(contactId: string, name: string, email: string, description: string, age: number) {
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
