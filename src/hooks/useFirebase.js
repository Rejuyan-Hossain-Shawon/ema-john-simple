import { useEffect, useState } from "react";
import { getIdToken, getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});


    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider)

    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                    .then(idToken => localStorage.setItem("idToken", idToken))
                setUser(user)
            }
        });
        return unsubscribe;
    }, [])

    return {
        signInUsingGoogle,
        logOut,
        user,


    }


}
export default useFirebase;