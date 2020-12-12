import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, passowrd: string) : Promise<any>{
    return new Promise((resolve, reject) => {
      return this.afAuth.auth.signInWithEmailAndPassword(email, passowrd)
      .then(userData => resolve(userData), err => reject(err));
    });    
  }
  register(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData), err => reject(err));
    });    
  }

  getAuth() : Observable<User | null> {
    return this.afAuth.authState;
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }  
}
