import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  uid: string;

  constructor(private auth: Auth,
    private userServices: UserService,
    private firestore: Firestore) { }

  ngOnInit() {
  }

  async getUid() {
    const uid = await this.userServices.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid = ',this.uid);
    } else {
      console.log('No existe uid');
    }
  }

  async getInfoUser(){
    const path = 'Places'
    const uid = this.uid;
    //const docRef = doc(this.firestore, path, uid);
    //const docSnap = await getDoc(docRef);
    this.firestore.getDoc(path, uid).subscribe((res) => {
      console.log('datos son = ',res);
    })
  }

}
