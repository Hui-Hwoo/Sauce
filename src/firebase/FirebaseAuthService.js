import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    FacebookAuthProvider,
    GithubAuthProvider,
} from "firebase/auth";
import FirebaseService from "./FirebaseConfig";

const auth = FirebaseService.auth;

const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = async () => {
    return auth.signOut();
};

const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
};

const loginWithGitHub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthChange) => {
    const logout = onAuthStateChanged(auth, (user) => {
        if (user) {
            handleAuthChange(user);
        }
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
    loginWithFacebook,
    loginWithGitHub,
    subscribeToAuthChanges,
};

export default FirebaseAuthService;
