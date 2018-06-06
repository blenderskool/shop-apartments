import * as firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyA78sScfOVTdlj4SjpElGn0cil6IKf2dOY",
  authDomain: "shop-snn.firebaseapp.com",
  databaseURL: "https://shop-snn.firebaseio.com",
  projectId: "shop-snn",
  storageBucket: "",
  messagingSenderId: "647731231947"
}
const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore()
firestore.settings({timestampsInSnapshots: true})
  
export { firebaseApp as firebase , firestore }