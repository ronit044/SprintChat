// Import necessary Firebase functions
import { auth } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from "@/firebase/firebaseConfig";
export const createUser = async (email, password, username) => {

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;
    await setDoc(doc(db, 'users', uid), {
      uid,
      email,
      username,
    });
    return { success: true, data: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    return { success: true, data: userCredential.user };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, message: "User signed out successfully" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchDocumentById = async (collectionName, uid) => {
  try {
    const docRef = doc(db, collectionName, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};

export const fetchAllDocuments = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    const documents = querySnapshot.docs.map(doc => doc.data());
    return documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const onAuthStateChange = (callback) => {
  onAuthStateChanged(auth, callback);
};



export const fetchTasks = async (uid) => {
  const docRef = doc(db, 'tasks', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such document!');
    return {};
  }
};

export const addTask = async (uid, task, column) => {
  const docRef = doc(db, 'tasks', uid);
  await updateDoc(docRef, {
    [column]: arrayUnion(task)
  });
};
export const createTask = async (uid, task, column) => {
  const docRef = doc(db, 'tasks', uid);
  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [column]: arrayUnion(task)
      });
      console.log("Task added to Firestore");
    } else {
      await setDoc(docRef, {
        [column]: [task]
      });
      console.log("New document created and task added to Firestore");
    }
  } catch (e) {
    console.error("Error updating Firestore:", e);
  }
};
export const deleteTask = async (uid, task) => {
  const docRef = doc(db, 'tasks', uid);
  await updateDoc(docRef, {
    backlog: arrayRemove(task),
    todo: arrayRemove(task),
    active: arrayRemove(task),
    completed: arrayRemove(task)
  });
};