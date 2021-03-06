import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/Client'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc?: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]> = of([]);
  client: Observable<Client | null> = of({});

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = afs.collection('clients', ref => ref.orderBy('lastName', 'asc'))
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClients(): Observable<Client[]> {
    // get cliients with the id
    this.clients = this.clientsCollection.snapshotChanges()
      .pipe(
        map((changes: any[]) => {
          return changes.map(action => {
            const data = action.payload.doc.data() as Client;
            data.id = action.payload.doc.id;
            return data;
          })
        })
      );

    return this.clients;
  }

  getClient(id: string): Observable<Client | null> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges()
      .pipe(
        map((action: any) => {
          if (action.payload.exists === false) {            
            return null;
          }
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        })
      );

    return this.client;
  }

  updateCliient(client: Client): void {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client): void {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
