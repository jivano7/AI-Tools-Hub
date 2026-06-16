const params =
new URLSearchParams(
window.location.search
);

const toolId =
params.get("id");

fetch("data/tools.json")
.then(response => response.json())
.then(data => {
const tool =
data.find(
item =>
 item.id == toolId
 );
 if(tool){
 let recentTools =
JSON.parse(
localStorage.getItem("recentTools")
 ) || [];

recentTools =
recentTools.filter(
 item => item.id !== tool.id
  );
recentTools.unshift(tool);

recentTools =
recentTools.slice(0, 10);
localStorage.setItem(
"recentTools",
JSON.stringify(recentTools)
  );

document
 .getElementById("toolLogo")

 .src = tool.logo;
document
 .getElementById("toolName")
 .textContent = tool.name;

document
.getElementById("toolDescription")
.textContent = tool.description;

document
.getElementById("toolCategory")
.textContent = tool.category;

document
.getElementById("toolPricing")
.textContent = tool.pricing;

document
.getElementById("toolRating")
.textContent = tool.rating;

document
.getElementById("toolWebsite")
.href = tool.website;

}
});