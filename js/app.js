/* UI controller: steps, autoplay, switcher, explorer, tabs, comparison, simulator, glossary, theme, mode. */
(function(C){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const KEYS=['pub','pri','hyb','com'],N=C.STEPS.length;
let cur=0,timer=null,mode='beginner',sel=null,si=0,ss=0;
const say=h=>{$('#explorer').innerHTML=h};
function explain(id){sel=id;const c=C.COMP[id];say(`<b>${c[0]}</b>: ${mode==='beginner'?c[1]:c[2]}`)}
function mark(k){$$('#sw button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.k===k)))}
function go(i){
 cur=i;const s=C.STEPS[i];
 $$('#steps button').forEach((b,j)=>j===i?b.setAttribute('aria-current','step'):b.removeAttribute('aria-current'));
 $('#pbar').style.width=((i+1)/N*100)+'%';$('#pl').textContent=`Step ${i+1} of ${N}`;
 $('#cards').innerHTML=`<article class="card"><span class="k">Step ${i+1}</span><h2>${s.t}</h2></article><article class="card" id="cp"><span class="k">In plain words</span><p>${s.plain}</p></article><article class="card" id="ct"><span class="k">Technical explanation</span><p>${s.tech}</p></article><article class="card"><span class="k">Watch the animation</span><p>${s.watch}</p></article>`;
 C.anim.view(s.show,s.act,s.trad);mark(s.act||'all');if(s.tab)tab(s.tab);}
function pickModel(k){
 mark(k);if(k==='all'){C.anim.view(KEYS,null,false);return}
 C.anim.view([k],k,false);const e=C.EX.find(x=>x[0]===k);say(`<b>${e[1]}</b>: ${e[2]}. Examples: ${e[3]}.`);}
function play(){if(timer)return;$('#play').setAttribute('aria-pressed','true');timer=setInterval(()=>{cur>=N-1?pause():go(cur+1)},5000)}
function pause(){clearInterval(timer);timer=null;$('#play').setAttribute('aria-pressed','false')}
function reset(){pause();go(0);C.quiz.reset();simReset();say('Architecture explorer: click (or press Enter on) any box in the diagram to learn what it does.')}
function tab(t){$$('#tabs button').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.t===t)));$$('.tp').forEach(p=>p.hidden=p.id!=='tp-'+t)}
function setMode(m){mode=m;document.body.dataset.mode=m;$('#mB').setAttribute('aria-pressed',String(m==='beginner'));$('#mT').setAttribute('aria-pressed',String(m==='technical'));if(sel)explain(sel)}
function sim(){
 const el=$('#tp-sim'),s=C.SIM[si];
 if(!s){el.innerHTML=`<h3>Scenarios complete: ${ss} / ${C.SIM.length}</h3><button class="btn" id="sr">Try again</button>`;$('#sr').onclick=simReset;return}
 el.innerHTML=`<p class="k">Scenario ${si+1} of ${C.SIM.length}</p><h3>${s.q}</h3><p>Which deployment model fits best?</p><div class="opts">${KEYS.map(k=>`<button class="opt" data-k="${k}">${C.M[k]} cloud</button>`).join('')}</div><div id="sf" aria-live="polite"></div>`;
 el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
  const ok=b.dataset.k===s.a;if(ok)ss++;
  el.querySelectorAll('.opt').forEach(x=>{x.disabled=true;if(x.dataset.k===s.a)x.classList.add('ok');else if(x===b)x.classList.add('bad')});
  $('#sf').innerHTML=`<p><b>${ok?'Correct!':'Not quite. Best answer: '+C.M[s.a]+' cloud.'}</b> ${s.why}</p><button class="btn" id="sn">${si<C.SIM.length-1?'Next scenario':'See result'}</button>`;
  $('#sn').onclick=()=>{si++;sim()}});}
function simReset(){si=0;ss=0;sim()}
function glossary(q){$('#gl').innerHTML=C.GL.filter(g=>(g[0]+' '+g[1]).toLowerCase().includes(q.trim().toLowerCase())).map(g=>`<dt>${g[0]}</dt><dd>${g[1]}</dd>`).join('')||'<dd>No match. Try another word.</dd>'}
function tools(){
 $('#tabs').innerHTML=[['ex','Examples'],['cmp','Comparison'],['sim','Scenarios'],['gl','Glossary'],['quiz','Quiz']].map(([k,n])=>`<button role="tab" data-t="${k}">${n}</button>`).join('');
 $('#tp-ex').innerHTML='<div class="grid4">'+C.EX.map(e=>`<article class="mc" style="--c:var(--${e[0]})"><h3>${e[1]}</h3><p><b>Analogy:</b> ${e[2]}</p><p><b>Examples:</b> ${e[3]}</p><p><b>Strengths:</b> ${e[4]}</p></article>`).join('')+'</div>';
 $('#tp-cmp').innerHTML=`<p>Show or hide models to compare:</p><div class="chips">${KEYS.map(k=>`<button class="chip" data-k="${k}" aria-pressed="true">${C.M[k]}</button>`).join('')}</div><div class="tw"><table id="cmpT"><thead><tr><th>Aspect</th>${KEYS.map(k=>`<th class="p-${k}" style="border-top:4px solid var(--${k})">${C.M[k]}</th>`).join('')}</tr></thead><tbody>${C.CMP.map(r=>`<tr><th>${r[0]}</th>${r.slice(1).map((c,j)=>`<td class="p-${KEYS[j]}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 $('#tp-cmp .chips').onclick=e=>{const b=e.target.closest('button');if(!b)return;const off=b.getAttribute('aria-pressed')==='true';b.setAttribute('aria-pressed',String(!off));$('#cmpT').classList.toggle('h-'+b.dataset.k,off)};
 $('#tp-gl').innerHTML='<label>Search glossary <input type="search" id="gq" placeholder="e.g. VPN"></label><dl id="gl"></dl>';
 $('#gq').oninput=e=>glossary(e.target.value);glossary('');}
function init(){
 $('#steps').innerHTML=C.STEPS.map((s,i)=>`<li><button data-i="${i}"><span class="n">${i+1}</span><span><b>${s.t}</b><small>${s.sub}</small></span></button></li>`).join('');
 $('#stage').innerHTML=C.buildSVG();C.anim.init($('#diagram'));
 $('#sw').innerHTML=[['all','All']].concat(KEYS.map(k=>[k,C.M[k]+' cloud'])).map(([k,n])=>`<button data-k="${k}">${n}</button>`).join('');
 tools();C.quiz.init($('#tp-quiz'));sim();
 $('#steps').onclick=e=>{const b=e.target.closest('button');if(b){pause();go(+b.dataset.i)}};
 $('#play').onclick=play;$('#pause').onclick=pause;$('#reset').onclick=reset;$('#anim').onclick=C.anim.toggle;
 $('#sw').onclick=e=>{const b=e.target.closest('button');if(b)pickModel(b.dataset.k)};
 $('#tabs').onclick=e=>{const b=e.target.closest('button');if(b)tab(b.dataset.t)};
 $('#mB').onclick=()=>setMode('beginner');$('#mT').onclick=()=>setMode('technical');
 $('#theme').onclick=()=>{const d=document.documentElement,n=d.dataset.theme==='dark'?'light':'dark';d.dataset.theme=n;try{localStorage.setItem('cdm-theme',n)}catch(e){}};
 const st=$('#stage');
 st.addEventListener('click',e=>{const c=e.target.closest('.comp');if(c)explain(c.dataset.c)});
 st.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const c=e.target.closest('.comp');if(c){e.preventDefault();explain(c.dataset.c)}}});
 try{const t=localStorage.getItem('cdm-theme');if(t)document.documentElement.dataset.theme=t;else if(window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches)document.documentElement.dataset.theme='light'}catch(e){}
 go(0);}
init();
})(window.CDM);
