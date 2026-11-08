const COUNTER_NAME = "onemealforward_contributions";
const COUNTER_API = "https://countapi.mileshilliard.com/api/v1";
const CAMPAIGN_IMAGE = "assets/onemealforward-campaign.png";
const $ = id => document.getElementById(id);
const nav = $("nav"), menu = $("menuToggle");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}));
const caption = "Share a Meal. Spread Kindness. Every small act counts. #OneMealForward";

function renderCount(value){
  value=Number(value);
  if(!Number.isSafeInteger(value)||value<0)throw new Error("The counter service returned an invalid count.");
  $("acknowledgementCount").textContent=new Intl.NumberFormat().format(value);
}
async function refreshCount(){
  $("counterStatus").textContent="Loading the latest shared count…";
  try{
    const response=await fetch(`${COUNTER_API}/get/${encodeURIComponent(COUNTER_NAME)}`);
    if(response.status===404){renderCount(0);$("counterStatus").textContent="Latest shared count.";return;}
    if(!response.ok)throw new Error(`Counter request failed (${response.status}).`);
    renderCount((await response.json()).value);
    $("counterStatus").textContent="Latest shared count.";
  }catch{$("counterStatus").textContent="The shared count is temporarily unavailable. Please try again later.";}
}
refreshCount();

$("didIt").addEventListener("click",()=>{$("thanks").hidden=false;$("thanks").scrollIntoView({behavior:"smooth",block:"nearest"});});
$("close").addEventListener("click",()=>$("thanks").hidden=true);
$("acknowledgementForm").addEventListener("submit",async event=>{
  event.preventDefault();
  if(!$("ackConsent").checked)return;
  const button=$("submitAcknowledgement");button.disabled=true;
  try{
    const response=await fetch(`${COUNTER_API}/hit/${encodeURIComponent(COUNTER_NAME)}`);
    if(!response.ok)throw new Error(`Counter request failed (${response.status}).`);
    renderCount((await response.json()).value);
    $("counterStatus").textContent="Latest shared count.";
    $("submissionStatus").textContent="Thank you. Your anonymous, self-reported acknowledgement was added.";
    $("ackConsent").checked=false;
  }catch{$("submissionStatus").textContent="Could not submit your acknowledgement. The counter service may be unavailable; please try again later.";refreshCount();}
  finally{button.disabled=false;}
});

async function campaignBlob(){const response=await fetch(CAMPAIGN_IMAGE);if(!response.ok)throw new Error("Campaign image could not be loaded.");return response.blob();}
function downloadCampaign(blob){const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download="onemealforward-campaign.png";document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
async function shareCampaign(){
  try{
    const blob=await campaignBlob();const file=new File([blob],"onemealforward-campaign.png",{type:blob.type||"image/png"});
    if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:"OneMealForward",text:caption});$("status").textContent="Campaign image shared.";}
    else {downloadCampaign(blob);$("status").textContent="Image sharing is unavailable here; the campaign image was downloaded so you can attach it.";}
  }catch(error){if(error.name!=="AbortError")$("status").textContent="Sharing is unavailable. Use Download campaign image to save the artwork.";}
}
$("share").addEventListener("click",shareCampaign);$("shareCard").addEventListener("click",shareCampaign);
$("copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(caption);$("status").textContent="Campaign caption copied.";}catch{$("status").textContent=caption;}});
$("download").addEventListener("click",async()=>{try{downloadCampaign(await campaignBlob());$("status").textContent="Campaign image downloaded.";}catch{$("status").textContent="Download failed. Open the campaign image and save it from your browser.";}});
$("printCampaign").addEventListener("click",()=>window.print());
$("play").addEventListener("click",e=>{e.preventDefault();$("status").textContent="The Google Play link will be added when Doc Vault is published.";document.getElementById("download-section").scrollIntoView({behavior:"smooth"});});
