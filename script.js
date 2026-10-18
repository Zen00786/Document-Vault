// Add the real Google Play URL here after publication; leave blank until then.
const PLAY_STORE_URL = "";
const $ = id => document.getElementById(id);
const nav = $("nav"), menu = $("menuToggle");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}));
const caption="I Did It! I passed kindness forward. Share a Meal. Spread Kindness. #OneMealForward #MSZamaDynamics";
$("didIt").addEventListener("click",()=>{$("thanks").hidden=false;$("thanks").scrollIntoView({behavior:"smooth",block:"nearest"});});
$("close").addEventListener("click",()=>$("thanks").hidden=true);
async function shareCampaign(){try{if(navigator.share){await navigator.share({title:"I Did It! #OneMealForward",text:caption,url:location.href});}else{await navigator.clipboard.writeText(caption+"\n"+location.href);$("status").textContent="Caption and website link copied. Download or screenshot the campaign card and attach it to your post.";}}catch(e){if(e.name!=="AbortError")$("status").textContent="Sharing isn't available here. Copy the caption and save the campaign card to share manually.";}}
$("share").addEventListener("click",shareCampaign);$("shareCard").addEventListener("click",shareCampaign);
$("copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(caption);$("status").textContent="Caption copied: "+caption;}catch{$("status").textContent=caption;}});
$("download").addEventListener("click",()=>{window.print();$("status").textContent="Choose Save as PDF in the print dialog, or take a screenshot of the campaign card.";});
["play"].forEach(id=>{const el=$(id);if(PLAY_STORE_URL){el.href=PLAY_STORE_URL;el.target="_blank";el.rel="noopener noreferrer";}else el.addEventListener("click",e=>{e.preventDefault();$("status").textContent="The Google Play link will be added when Doc Vault is published.";document.getElementById("download-section").scrollIntoView({behavior:"smooth"});});});
