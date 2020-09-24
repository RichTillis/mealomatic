import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private readonly afs: AngularFirestore,
    private fireStorage: AngularFireStorage) { }

  uploadImage(base64String: string): string {
    console.log(base64String);
    return base64String;
    // const filePath = `${this.getUserId()}/avatar`;
    // const fileRef = this.storage.ref(filePath);
    // const task: AngularFireUploadTask = fileRef.putString(
    //   base64String,
    //   'base64',
    //   { contentType: 'image/png' }
    // );
  }
}
