import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { auth } from 'firebase/app';

import { switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';

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
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private alertController: AlertController, private storage: AngularFireStorage) { }

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

  getUserId() {
    return auth().currentUser.uid;
  }

  getUserData() {
    return this.afs.doc<User>(`users/${this.getUserId()}`).valueChanges();
  }

  uploadAvatar(base64String) {
    const filePath = `${this.getUserId()}/avatar`;
    const fileRef = this.storage.ref(filePath);
    const task: AngularFireUploadTask = fileRef.putString(
      base64String,
      'base64',
      { contentType: 'image/png' }
    );
    return from(task).pipe(
      switchMap(result => {
        // Upload Task finished, get URL to the image
        return fileRef.getDownloadURL();
      }),
      switchMap(photoURL => {
        // Set the URL to the user document
        const uploadPromise = this.afs
          .doc(`users/${this.getUserId()}`)
          .set({ photoURL }, { merge: true });
        return from(uploadPromise);
      })
    )
  }
}