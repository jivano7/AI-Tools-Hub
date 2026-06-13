import { auth, db }
from '../firebase/firebase-config.js';

import {
  doc,
    updateDoc,
      getDoc
      }
      from
      'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

     async function saveFavorite(toolId){

        const user = auth.currentUser;

        if(!user){
        alert("Please Login First");
        return;
        }

        const userRef =
        doc(db,'users',user.uid);

        const userSnap =
        await getDoc(userRef);

        let favorites =
        userSnap.data().favorites || [];

        if(!favorites.includes(toolId)){

        favorites.push(toolId);

        await updateDoc(userRef,{
        favorites:favorites
        });

        }

        }
         async function removeFavorite(toolId){

            const user = auth.currentUser;

            const userRef =
            doc(db,'users',user.uid);

            const userSnap =
            await getDoc(userRef);

            let favorites =
            userSnap.data().favorites || [];

            favorites =
            favorites.filter(
            id => id !== toolId
            );

            await updateDoc(
            userRef,
            {
            favorites:favorites
            }
            );

            }
         window.toggleFavorite =
         async function(toolId){

         const user =
         auth.currentUser;

         if(!user){

         alert(
         "Login Required"
         );

         return;

         }

         const userRef =
         doc(
         db,
         'users',
         user.uid
         );

         const userSnap =
         await getDoc(
         userRef
         );

         let favorites =
         userSnap.data()
         .favorites || [];

         if(
         favorites.includes(toolId)
         ){

         await removeFavorite(toolId);

         }else{

         await saveFavorite(toolId);

         }

         alert(
         "Favorites Updated"
         );
        }
