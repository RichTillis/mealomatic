import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  // Start the Firebase register process
  async emailSignup({ email, password, fullname }): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    return this.updateUserData(credential.user, fullname);
  }

  // Sets user data to firestore on login
  private updateUserData(user: User, name = null, image = null): Promise<any> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: image,
    };
    return userRef.set(data, { merge: true });
  }

  signIn({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  
  resetPw(email) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}