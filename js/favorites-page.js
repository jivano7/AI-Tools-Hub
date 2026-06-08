import { auth, db }
from '../firebase/firebase-config.js';

import {
  doc,
    getDoc
    }
    from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

    import {
      onAuthStateChanged
      }
      from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

      onAuthStateChanged(auth, async (user) => {

        if(!user){

            window.location.href =
                'login.html';

                    return;

                      }

                        const userRef =
                          doc(db, 'users', user.uid);

                            const snap =
                              await getDoc(userRef);

                                const favorites =
                                  snap.data().favorites || [];

                                    document
                                      .getElementById(
                                        'favoritesContainer'
                                          )
                                            .innerHTML =

                                              `<h3>
                                                 Favorite Tool IDs:
                                                    ${favorites.join(', ')}
                                                       </h3>`;

                                                       });