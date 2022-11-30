import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { addDoc, collection } from 'firebase/firestore';
import Place from '../interfaces/place.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formulario: FormGroup;

  constructor(private auth: Auth, private firestore: Firestore) {

   }


  async register(email: string, password: string) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (error) {
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (error) {
      return null;
    }
  }

  logOut() {
    return signOut(this.auth);
  }

  addPlace(place: Place){
    const placeRef = collection(this.firestore, 'places');
    return addDoc(placeRef, place)
  }

}
