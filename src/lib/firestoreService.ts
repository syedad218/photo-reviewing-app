import { signInAnonymously } from "firebase/auth";
import { auth, db } from "../firebase-config";
import {
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  query,
  getDocs,
  updateDoc,
  increment,
  serverTimestamp,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

export const login = async () => {
  const response = await signInAnonymously(auth);
  return response?.user?.uid;
};

export const createUserDoc = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return;
  } else {
    setDoc(docRef, { id: userId });
  }
};

export const fetchLikedImages = async (userId: string, lastDoc: any) => {
  const collectionRef = collection(db, `users/${userId}/likedImages`);
  let queryRef;
  if (lastDoc) {
    queryRef = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(30)
    );
  } else {
    queryRef = query(collectionRef, orderBy("createdAt", "desc"), limit(30));
  }
  const docsSnapshot = await getDocs(queryRef);
  const likedImages = docsSnapshot.docs.map((doc) => doc.data());
  return likedImages;
};

export const updateCurrentImageIndex = async (
  userId: string,
  isIncrement = true
) => {
  const userRef = doc(db, "users", userId);
  // Atomically increment the population of the city by 1.
  updateDoc(userRef, {
    currentRandomImageIndex: isIncrement ? increment(1) : 0,
  });
};

export const updateLikedImages = async (userId: string, image: any) => {
  const collectionRef = doc(db, `users/${userId}/likedImages`, image.id);
  setDoc(collectionRef, { ...image, createdAt: serverTimestamp() });
};

export const fetchRadomImages = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  let randomImages: any = [];
  let currentRandomImageIndex = 0;
  if (docSnap.exists()) {
    randomImages = docSnap.data()?.randomImages || [];
    currentRandomImageIndex = docSnap.data()?.currentRandomImageIndex || 0;
  } else {
    // do nothing
  }
  console.log("random-images", randomImages);
  return { randomImages, currentRandomImageIndex };
};

export const iterateImages = (data: any, userId: string) => {
  const processedData = data.map((image: any) => ({
    id: image.id,
    urls: { small: image.urls.small, regular: image.urls.regular },
  }));
  const userRef = doc(db, "users", userId);
  updateDoc(userRef, {
    randomImages: processedData,
    currentRandomImageIndex: 0,
  });
  return processedData;
};
