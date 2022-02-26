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
  DocumentData,
} from "firebase/firestore";
import { Image } from "./types";

/** user login anonymously */
export const login = async (): Promise<string | null> => {
  const response = await signInAnonymously(auth);
  return response?.user?.uid;
};

/** register user in the database */
export const createUserDoc = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return;
  } else {
    setDoc(docRef, { id: userId });
  }
};

/** find matches for random images and already disliked images */
export const findDislikedImages = async (
  userId: string,
  imageIds: Array<string>
): Promise<Array<string> | []> => {
  const collectionRef = collection(db, `users/${userId}/dislikedImages`);
  let startIndex = 0;
  let endIndex = 10;
  const docsPromises = [];
  while (endIndex <= imageIds.length) {
    const batch = imageIds.slice(startIndex, endIndex);
    const q = query(collectionRef, where("id", "in", batch));
    docsPromises.push(
      getDocs(q)
        .then((docSnap) => docSnap.docs.map((doc) => doc.data().id))
        .catch((err) => err.toString())
    );
    startIndex += 10;
    endIndex += 10;
  }
  const docs = await Promise.all(docsPromises);
  const dislikedImageMatches = docs.reduce((acc, val) => acc.concat(val), []);
  return dislikedImageMatches;
};

/** fetch liked images for a particular user from firestore */
export const fetchLikedImages = async (
  userId: string,
  lastDoc: Image | null
): Promise<{ likedImages: Array<DocumentData>; hasMore: boolean }> => {
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
  return { likedImages, hasMore: likedImages.length > 0 };
};

/** increment the index of current random image user is checking-out */
export const updateCurrentImageIndex = async (userId: string, isIncrement = true) => {
  const userRef = doc(db, "users", userId);
  updateDoc(userRef, {
    currentRandomImageIndex: isIncrement ? increment(1) : 0,
  });
};

/** remove already liked image after user has disliked it */
export const removeLikedImage = async (userId: string, imageId: string) => {
  deleteDoc(doc(db, `users/${userId}/likedImages/${imageId}`));
};

/** add disliked image to the collection */
export const setDislikedImages = async (userId: string, image: Image) => {
  const collectionRef = doc(db, `users/${userId}/dislikedImages`, image.id);
  setDoc(collectionRef, { ...image, createdAt: serverTimestamp() });
};

/** update liked image with the timestamp */
export const updateLikedImages = async (userId: string, image: Image) => {
  const collectionRef = doc(db, `users/${userId}/likedImages`, image.id);
  setDoc(collectionRef, { ...image, createdAt: serverTimestamp() });
};

/** fetch random images for a particular user from firestore */
export const fetchRadomImages = async (
  userId: string
): Promise<{ randomImages: Array<DocumentData>; currentRandomImageIndex: number }> => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  let randomImages = [];
  let currentRandomImageIndex = 0;
  if (docSnap.exists()) {
    randomImages = docSnap.data()?.randomImages || [];
    currentRandomImageIndex = docSnap.data()?.currentRandomImageIndex || 0;
  }
  return { randomImages, currentRandomImageIndex };
};

/** add random images to the user collection */
export const iterateImages = (data: Array<Image>, userId: string): Array<Image> => {
  const processedData = data.map((image: Image) => ({
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
