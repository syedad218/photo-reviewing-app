import { signInAnonymously } from "firebase/auth";
import { auth, db } from "../firebase-config";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  query,
  getDocs,
  updateDoc,
  increment,
  serverTimestamp,
  orderBy,
  limit,
  startAfter,
  where,
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

export const findDislikedImages = async (userId: string, imageIds: any) => {
  const collectionRef = collection(db, `users/${userId}/dislikedImages`);
  let startIndex = 0;
  let endIndex = 10;
  const docsPromises = [];
  while (endIndex <= imageIds.length) {
    const batch = imageIds.slice(startIndex, endIndex);
    const q = query(collectionRef, where("id", "in", batch));
    docsPromises.push(getDocs(q).then((docSnap) => docSnap.docs.map((doc) => doc.data().id)));
    startIndex += 10;
    endIndex += 10;
    // const querySnapshot = await getDocs(q);
    // let dislikedImageMatches: any = [];
    // querySnapshot.forEach((doc) => dislikedImageMatches.push(doc.id));
  }
  const docs = await Promise.all(docsPromises);
  const dislikedImageMatches = docs.reduce((acc, val) => acc.concat(val), []);

  return dislikedImageMatches;
};

export const fetchLikedImages = async (userId: string, lastDoc: any) => {
  const collectionRef = collection(db, `users/${userId}/likedImages`);
  let queryRef;
  if (lastDoc) {
    const docRef = doc(db, `users/${userId}/likedImages`, lastDoc.id);
    const lastDocSnap = await getDoc(docRef);

    queryRef = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDocSnap),
      limit(30)
    );
  } else {
    queryRef = query(collectionRef, orderBy("createdAt", "desc"), limit(30));
  }
  const docsSnapshot = await getDocs(queryRef);
  const likedImages = docsSnapshot.docs.map((doc) => doc.data());
  return { likedImages, hasMore: likedImages.length };
};

export const updateCurrentImageIndex = async (userId: string, isIncrement = true) => {
  const userRef = doc(db, "users", userId);
  // Atomically increment the population of the city by 1.
  updateDoc(userRef, {
    currentRandomImageIndex: isIncrement ? increment(1) : 0,
  });
};

export const removeLikedImage = async (userId: string, imageId: string) => {
  deleteDoc(doc(db, `users/${userId}/likedImages/${imageId}`));
};

export const setDislikedImages = async (userId: string, image: any) => {
  const collectionRef = doc(db, `users/${userId}/dislikedImages`, image.id);
  setDoc(collectionRef, { ...image, createdAt: serverTimestamp() });
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
