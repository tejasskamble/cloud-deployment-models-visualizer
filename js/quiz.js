/* Five-question quiz with instant feedback, score and restart. */
(function(C){
const Q=[
{q:'Which model shares provider-owned infrastructure among many unrelated customers?',o:['Public cloud','Private cloud','Hybrid cloud','Community cloud'],a:0,e:'Public cloud is multi-tenant: many customers share the provider’s infrastructure inside isolated environments.'},
{q:'Which model is dedicated to a single organisation?',o:['Public cloud','Private cloud','Hybrid cloud','Community cloud'],a:1,e:'Private cloud infrastructure serves one organisation, which controls its security and governance.'},
{q:'AWS Outposts connected to an AWS Region is an example of which model?',o:['Public cloud','Private cloud','Hybrid cloud','Community cloud'],a:2,e:'Outposts puts AWS infrastructure on-premises and links it to a public cloud Region, which is hybrid.'},
{q:'Several government agencies share one compliant, dedicated cloud. Which model is this?',o:['Public cloud','Private cloud','Hybrid cloud','Community cloud'],a:3,e:'Community cloud is shared by organisations with common requirements such as compliance or mission.'},
{q:'What securely links on-premises systems to the public cloud in a hybrid setup?',o:['A VPN or private link','Open public Wi-Fi','A shared password','A USB drive'],a:0,e:'An encrypted VPN or dedicated private connection protects data as it moves between environments.'}];
let i=0,s=0,ans=null,el;
function render(){
 if(i>=Q.length){el.innerHTML=`<h3>Score: ${s} / ${Q.length}</h3><p>${s>=4?'Excellent work!':s>=3?'Good job. Review the Comparison tab to sharpen up.':'Revisit the steps above and try again.'}</p><button class="btn" id="qr">Restart quiz</button>`;el.querySelector('#qr').onclick=reset;return}
 const q=Q[i];
 el.innerHTML=`<p class="k">Question ${i+1} of ${Q.length} &nbsp; Score: ${s}</p><h3>${q.q}</h3><div class="opts">${q.o.map((o,k)=>`<button class="opt" data-k="${k}">${o}</button>`).join('')}</div><div id="fb" aria-live="polite"></div>`;
 el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>pick(+b.dataset.k));}
function pick(k){
 if(ans!==null)return;ans=k;const q=Q[i];if(k===q.a)s++;
 el.querySelectorAll('.opt').forEach((b,j)=>{b.disabled=true;if(j===q.a)b.classList.add('ok');else if(j===k)b.classList.add('bad')});
 el.querySelector('#fb').innerHTML=`<p><b>${k===q.a?'Correct!':'Not quite.'}</b> ${q.e}</p><button class="btn" id="qn">${i<Q.length-1?'Next question':'See score'}</button>`;
 el.querySelector('#qn').onclick=()=>{i++;ans=null;render()};}
function reset(){i=0;s=0;ans=null;render()}
C.quiz={Q,init(e){el=e;reset()},reset};
})(window.CDM);
