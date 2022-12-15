import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { addDoc } from 'firebase/firestore';
import Place from '../interfaces/place.interfaces';
import { Observable } from 'rxjs';
import { collection } from 'firebase/firestore';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
// error con nuleinjectiontoken en la libreria de angularfirestore

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formulario: FormGroup;

  constructor(private auth: Auth, 
    private firestore: Firestore,
    ) {

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

  getPlaces(): Observable<Place[]>{
    const placeRef = collection(this.firestore, 'places');
    return collectionData(placeRef, {idField: 'id'}) as Observable<Place[]>;
  }
  
  /*
  getPlaceByEmail(email: string) {
    const placeRef = collection(this.firestore, 'places');
    return this.db.collection('places', ref => ref.where('correo', '==', email)).valueChanges();
  }*/
  
  /*
  async getPlaceByEmail2(email: string) {
    const placeRef = this.db.collection('places');
    //const placeRef = collection(this.firestore, 'places');
    const doc = await placeRef.where('correo', '==', email).get();
    if (doc.empty) {
      console.log('No matching documents');
      return;
    } 

    doc.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  }
  */

  async getUid() {
    const user = await this.auth.currentUser
    if (user) {
      return user.uid;
    } else {
      return null;
    }
  }


}
