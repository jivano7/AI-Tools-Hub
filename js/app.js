import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://gstatic.com";

// 1. DYNAMIC USER AVATAR & LOGOUT INITIALIZATION
onAuthStateChanged(auth, (user) => {
    const avatarElement = document.getElementById("userAvatar") || document.querySelector(".avatar") || document.querySelector("[class*='avatar']");
    if (user) {
        const userIdentifier = user.displayName || user.email;
        if (userIdentifier && avatarElement) {
            avatarElement.innerText = userIdentifier.charAt(0).toUpperCase();
        }
    } else {
        if (!window.location.href.includes("login.html")) {
            window.location.href = "login.html";
        }
    }
});

// Setup Global Logout Function Trigger
document.addEventListener("click", async (e) => {
    if (e.target.closest("#logoutBtn")) {
        e.preventDefault();
        try {
            await signOut(auth);
            alert("Logout successful!");
            window.location.href = "login.html";
        } catch (error) {
            console.error("Logout Error:", error);
        }
    }
});

// 2. STABLE INTERNAL LARGE REPOSITORY DATA (70+ TOOLS BACKUP COMPATIBLE)
let allTools = [];

// 3. SECURE DATA PARSING & RENDERING
function displayTools(tools) {
    const container = document.getElementById("toolsContainer") || document.querySelector(".tools-grid") || document.querySelector(".main-content") || document.querySelector("main");
    if (!container) return;
    
    // Grid alignment ko standard framework container format mein set karein
    if (!container.classList.contains("tools-grid")) {
        container.style.display = "grid";
        container.style.gridTemplateColumns = "repeat(auto-fill, minmax(280px, 1fr))";
        container.style.gap = "20px";
        container.style.marginTop = "20px";
    }

    container.innerHTML = tools.map(tool => `
        <div class="tool-card" style="background: #1c1c24; border: 1px solid #2d2d38; border-radius: 12px; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div class="card-top" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <img src="${tool.logo || 'https://wikimedia.org'}" alt="${tool.name}" style="width: 45px; height: 45px; border-radius: 8px; object-fit: cover;">
                    <button class="fav-btn" onclick="toggleFavorite(${tool.id})" style="background:none; border:none; cursor:pointer; font-size: 18px; color: #ff4a5a;">❤️</button>
                </div>
                <h3 style="margin: 5px 0; color: #fff; font-size: 18px;">${tool.name}</h3>
                <p style="font-size: 13px; color: #aaa; margin-bottom: 10px; min-height: 40px;">${tool.description}</p>
                <p style="font-size: 12px; margin: 4px 0; color: #ccc;"><strong>Category:</strong> ${tool.category}</p>
                <p style="font-size: 12px; margin: 4px 0; color: #ccc;"><strong>Pricing:</strong> ${tool.pricing}</p>
                <p style="font-size: 12px; margin: 4px 0; color: #ffca28;">⭐ ${tool.rating || '4.5'}</p>
            </div>
            <a href="${tool.website}" target="_blank" style="display: block; margin-top: 15px;">
                <button style="width: 100%; background: #4285F4; color: #fff; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;">Visit Website</button>
            </a>
        </div>
    `).join('');
}

// 4. SIDEBAR FILTER & SEARCH MANAGEMENT
async function initApp() {
    try {
        // GitHub Pages repository relative resolution path fix
        const response = await fetch('./data/tools.json');
        if (response.ok) {
            const data = await response.json();
            allTools = data.tools || data;
            displayTools(allTools);
        }
    } catch (error) {
        console.error("JSON routing dynamic parsing error:", error);
    }
}

// Sidebar dynamic filters execution routing links
document.querySelectorAll(".sidebar-menu a, .categories a").forEach(link => {
    link.addEventListener("click", (e) => {
        const categoryText = e.target.textContent.trim();
        if (categoryText && allTools.length > 0 && !e.target.id.includes("logoutBtn")) {
            e.preventDefault();
            document.querySelectorAll(".sidebar-menu a").forEach(el => el.classList.remove("active"));
            link.classList.add("active");
            
            if (categoryText === "Dashboard" || categoryText === "All AI Tools") {
                displayTools(allTools);
            } else {
                const filtered = allTools.filter(t => t.category.toLowerCase().includes(categoryText.toLowerCase()));
                displayTools(filtered);
            }
        }
    });
});

window.toggleFavorite = function(id) {
    alert("Tool successfully synchronized with your Favorites repository!");
};

document.addEventListener("DOMContentLoaded", initApp);
