/* Panel visibility/glow per step, and animation on/off (respects prefers-reduced-motion). */
(function(C){
const mq=window.matchMedia?matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
let svg,on=!mq.matches;
function apply(){
 if(!svg)return;svg.classList.toggle('still',!on);
 try{on?svg.unpauseAnimations():svg.pauseAnimations()}catch(e){}
 const b=document.getElementById('anim');b.setAttribute('aria-pressed',String(on));b.textContent=on?'Animation: on':'Animation: off';}
C.anim={
 init(s){svg=s;apply();mq.addEventListener&&mq.addEventListener('change',e=>{on=!e.matches;apply()})},
 toggle(){on=!on;apply()},
 view(show,act,trad){
  ['pub','pri','hyb','com'].forEach(k=>{const g=svg.querySelector('#pn-'+k);g.classList.toggle('dim',!show.includes(k));g.classList.toggle('on',k===act)});
  if(trad)svg.setAttribute('data-trad','');else svg.removeAttribute('data-trad');}};
})(window.CDM);
