import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Fetching all sermons
export async function fetchSermons() {
  const sermonsRef = collection(db, "sermons");
  const q = query(sermonsRef, orderBy("timeStamp", "desc"));
  const querySnapshot = await getDocs(q);

  const sermons = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return sermons;
}

// Fetching a single sermon
export async function fetchSermonById(id) {
  try {
    const sermonRef = doc(db, "sermons", id);
    const sermonSnap = await getDoc(sermonRef);

    if (sermonSnap.exists()) {
      return { id: sermonSnap.id, ...sermonSnap.data() };
    } else {
      console.log("We couldn't find that sermon!!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching sermon:", error);
    return null;
  }
}
