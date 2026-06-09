// 1. Static AI Tools Data (Bina fetch ke direct load hone ke liye)
const aiToolsData = [
    { id: 1, name: "ChatGPT", description: "Advanced conversational AI by OpenAI.", category: "Chatbots", pricing: "Freemium", rating: "4.8", website: "https://chatgpt.com", logo: "https://wikimedia.org" },
    { id: 2, name: "Midjourney", description: "AI-powered text-to-image generator.", category: "Image Generation", pricing: "Paid", rating: "4.9", website: "https://midjourney.com", logo: "https://wikimedia.org" },
    { id: 3, name: "DALL-E 3", description: "State-of-the-art image generation by OpenAI.", category: "Image Generation", pricing: "Freemium", rating: "4.7", website: "https://openai.com", logo: "https://wikimedia.org" },
    { id: 4, name: "GitHub Copilot", description: "Your AI pair programmer for writing code.", category: "Coding Assistant", pricing: "Paid", rating: "4.8", website: "https://github.com", logo: "https://githubassets.com" }
];

// 2. Tools Display Logic
function displayTools(tools) {
    // Har sambhav container selector ko target karein taaki template break na ho
    const container = document.getElementById("toolsContainer") || document.querySelector(".tools-grid") || document.querySelector(".main-content") || document.querySelector("main");
    
    if (!container) {
        console.error("Tools container nahi mila!");
        return;
    }
    
    // Purane message ko clear karein
    container.innerHTML = ""; 

    tools.forEach(tool => {
        container.innerHTML += `
        <div class="tool-card" style="border: 1px solid #333; padding: 20px; border-radius: 12px; margin: 10px; background: #1c1c24; display: inline-block; width: 280px; text-align: left; vertical-align: top; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            <div class="card-top" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <img src="${tool.logo}" alt="${tool.name}" style="width: 45px; height: 45px; border-radius: 8px; object-fit: cover;">
                <button class="fav-btn" onclick="toggleFavorite(${tool.id})" style="background:none; border:none; cursor:pointer; font-size: 18px;">❤️</button>
            </div>
            <h3 style="margin: 5px 0; color: #fff; font-size: 18px;">${tool.name}</h3>
            <p style="font-size: 13px; color: #aaa; height: 40px; overflow: hidden; margin-bottom: 10px;">${tool.description}</p>
            <p style="font-size: 12px; margin: 4px 0; color: #ccc;"><strong>Category:</strong> ${tool.category}</p>
            <p style="font-size: 12px; margin: 4px 0; color: #ccc;"><strong>Pricing:</strong> ${tool.pricing}</p>
            <p style="font-size: 12px; margin: 4px 0; color: #ffca28;">⭐ ${tool.rating}</p>
            <a href="${tool.website}" target="_blank" style="display: block; margin-top: 15px;">
                <button style="width: 100%; background: #4285F4; color: #fff; border: none; padding: 10px; border-radius: 6px; font-weight: bold; cursor: pointer;">Visit Website</button>
            </a>
        </div>
        `;
    });
}

// 3. Init on Load
document.addEventListener("DOMContentLoaded", () => {
    displayTools(aiToolsData);
});

window.toggleFavorite = function(id) {
    alert("Tool ID " + id + " added to favorites!");
};
