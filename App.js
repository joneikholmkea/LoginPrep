import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { app, database } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword} from "firebase/auth"
import { initializeAuth, getReactNativePersistence} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'


let auth
if(Platform.OS === 'web'){
  auth = getAuth(app)
}else{
  auth = initializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
  //auth = getAuth(app)
}
export default function App() {
const [enteredEmail, setEnteredEmail] = useState("jon@m.dk")
const [enteredPassword, setEnteredPassword] = useState("123456")
const [userId, setUserId] = useState("")
const [enteredText, setenteredText] = useState("type here")

useEffect(()=>{
  const auth_ = getAuth()
  const unsubscribe = onAuthStateChanged(auth_, (currentUser) =>{
    if(currentUser){
      setUserId(currentUser.uid)
      console.log("lytter: blev logget ind")
    }else{
      setUserId(null)
    }
  })
  return ()=> unsubscribe()
},[])


async function addDocument(){
try{
await addDoc(collection(database, userId),{
text:enteredText
})
}catch(error){
console.log("error addDocument " + error)
}
}


async function login(){
  try {
    const userCredential = await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
    console.log("logget ind " + userCredential.user.uid)
  } catch (error) {
    console.log("error log ind " + error)
  }
}


async function signup(){
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        console.log("oprettet bruger " + userCredential.user.uid)
    } catch (error) {
      console.log("error  oprettet bruger " + error)
    }
}

async function sign_out(){
  await signOut(auth)
}

return (
<View style={styles.container}>
 { !userId &&
 <>
<Text>Login</Text>
<TextInput
onChangeText={newText => setEnteredEmail(newText)}
value={enteredEmail}
/>
<TextInput
onChangeText={newText => setEnteredPassword(newText)}
value={enteredPassword}
/>
<Button
title='Log in'
onPress={login}
/>


<TextInput
onChangeText={newText => setEnteredEmail(newText)}
value={enteredEmail}
/>
<TextInput
onChangeText={newText => setEnteredPassword(newText)}
value={enteredPassword}
/>
<Button
title='Signup'
onPress={signup}
/>

</>
}
{ userId &&
  <>
<TextInput
onChangeText={newText => setenteredText(newText)}
value={enteredText}
/>
<Button
title='Add new Document'
onPress={addDocument}
/>
<Button
title='Sign out'
onPress={sign_out}
/>
</>
}
</View>
);
}


const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
});
