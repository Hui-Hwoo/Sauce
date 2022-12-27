import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
} from "firebase/auth";
import firebase from "./FirebaseConfig";

const auth = firebase.auth;

const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
    return auth.signOut();
};

const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthChange) => {
    const logout = onAuthStateChanged(auth, (user) => {
        handleAuthChange(user);
    });
    return logout;
};

const FirebaseAuthService = {
    registerUser,
    loginUser,
    logoutUser,
    sendPasswordResetEmail: (email) => {
        sendPasswordResetEmail(auth, email);
    },
    loginWithGoogle,
    subscribeToAuthChanges,
};

export default FirebaseAuthService;
