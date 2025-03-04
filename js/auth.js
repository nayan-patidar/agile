// Authentication state listener
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        console.log('User logged in:', user.uid);
    } else {
        // User is signed out
        console.log('User signed out');
    }
});