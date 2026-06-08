import { auth }
from '../firebase/firebase-config.js';

import {
  onAuthStateChanged
  }
  from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

  onAuthStateChanged(auth, (user) => {

    if(user){

        document.getElementById('profileName').textContent =
            user.displayName || "User";

                document.getElementById('profileEmail').textContent =
                    user.email;

                        if(user.photoURL){
                              document.getElementById('profilePhoto').src =
                                    user.photoURL;
                                        }

                                          } else {

                                              window.location.href = "login.html";

                                                }

                                                });
                                                const recentTools =
                                                JSON.parse(
                                                localStorage.getItem("recentTools")
                                                ) || [];

                                                const container =
                                                document.getElementById(
                                                "recentToolsContainer"
                                                );

                                                recentTools.forEach(tool => {

                                                container.innerHTML += `

                                                <div class="recent-tool">

                                                    <img
                                                        src="${tool.logo}"
                                                            width="40">

                                                                <span>
                                                                        ${tool.name}
                                                                            </span>

                                                                            </div>

                                                                            `;

                                                                            });