/* Builds the ONE inline SVG (viewBox 0 0 1400 850). Panels use panel-relative coordinates. */
(function(C){
const P={pub:[20,20],pri:[720,20],hyb:[20,440],com:[720,440]};
const T=(x,y,s,c='t',a='middle')=>`<text x="${x}" y="${y}" class="${c}" text-anchor="${a}">${s}</text>`;
const B=(id,x,y,w,h,l,s,k='')=>`<g class="c ${id?'comp ':''}${k}"${id?` tabindex="0" role="button" data-c="${id}" aria-label="${C.COMP[id][0]}"`:''}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>${T(x+w/2,y+h/2+(s?-2:5),l)}${s?T(x+w/2,y+h/2+15,s,'s'):''}</g>`;
const F=(x,y,w,h,l)=>`<rect class="frm" x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/>${T(x+w/2,y+24,l,'s')}`;
const L=(id,d)=>`<path id="p-${id}" class="ln" d="${d}"/>`;
const K=(id,d,b)=>`<circle class="pkt" r="6"><animateMotion dur="${d}s" begin="${b}s" repeatCount="indefinite"><mpath href="#p-${id}" xlink:href="#p-${id}"/></animateMotion></circle>`;
const K2=(id,d)=>K(id,d,-0.3)+K(id,d,-d/2);
const PN=(k,t,s,body)=>`<g class="pn" id="pn-${k}" style="color:var(--${k})" transform="translate(${P[k]})"><rect class="frame" width="660" height="390" rx="18"/>${T(24,38,t,'h','start')}${T(24,60,s,'s','start')}${body}</g>`;
const pub=()=>PN('pub','PUBLIC CLOUD','Renting a room in a big shared building',
 [148,212,276].map((y,i)=>L('pu'+i,`M134,${122+i*80} L255,200 L400,${y}`)).join('')+F(380,84,256,290,'Provider data center')+
 ['A','B','C'].map((n,i)=>B('pub-cust',24,100+i*80,110,44,'Customer '+n)+B('pub-env',400,122+i*64,216,52,'Env '+n,'isolated tenant','sec')).join('')+
 B('pub-hw',400,314,216,46,'Shared physical servers','provider-managed')+
 `<g class="c comp" tabindex="0" role="button" data-c="pub-net" aria-label="Internet"><ellipse cx="255" cy="200" rx="62" ry="34"/>${T(255,205,'Internet')}</g>`+
 [0,1,2].map(i=>K2('pu'+i,3.4+i*.4)).join(''));
const pri=()=>PN('pri','PRIVATE CLOUD','Owning a dedicated building',
 L('i0','M144,132 L210,172 L370,152')+L('i1','M144,222 L210,188 L370,160')+F(350,84,286,220,'Dedicated private cloud')+
 B('pri-user',24,110,120,44,'Employee','internal LAN')+B('pri-user',24,200,120,44,'Employee','internal LAN')+
 B('pri-fw',210,150,100,60,'Firewall','access control','sec')+
 B('pri-srv',370,122,116,60,'Servers','virtualized')+B('pri-sto',500,122,116,60,'Storage','org data')+
 B('pri-net',370,196,246,44,'Internal network','private, not internet-facing')+B('pri-gov',370,252,246,36,'Org security & governance')+
 `<g id="trad"><rect class="trad" x="24" y="324" width="612" height="48" rx="10"/>${T(330,353,'Traditional data center: you buy, house, cool and maintain every server yourself','s')}</g>`+
 K2('i0',3.2)+K2('i1',3.6));
const hyb=()=>PN('hyb','HYBRID CLOUD','Own building + rented space elsewhere',
 L('h1','M244,236 L416,236')+L('h2','M416,258 L244,258')+F(24,90,220,270,'Your on-premises')+F(416,90,220,270,'Public cloud region')+
 B('hyb-onprem',44,130,180,64,'Sensitive database','stays in-house')+B('hyb-onprem',44,208,180,64,'Core apps','private servers')+B('hyb-onprem',44,286,180,56,'Local users','office network')+
 B('hyb-cloud',436,130,180,64,'Burst compute','scale on demand')+B('hyb-cloud',436,208,180,64,'Backup & analytics','pay as you go')+B('hyb-cloud',436,286,180,56,'Web front end','global reach')+
 B('hyb-vpn',258,166,144,52,'Secure VPN','or private link','sec')+T(330,296,'data &amp; apps move both ways','s')+K2('h1',2.8)+K2('h2',2.8));
const com=()=>PN('com','COMMUNITY CLOUD','Sharing a building with similar organisations',
 [152,220,288].map((y,i)=>L('m'+i,`M148,${125+i*70} L212,${[185,195,205][i]} L408,${y}`)).join('')+F(388,84,248,290,'Shared community cloud')+
 ['Hospital A','Hospital B','Clinic C'].map((n,i)=>B('com-org',24,100+i*70,124,50,n,'member')).join('')+
 B('com-gate',212,150,120,90,'Policy gateway','common rules','sec')+
 B('com-shared',408,124,208,56,'Shared platform','one dedicated cloud')+B('com-comp',408,192,208,56,'Common compliance','e.g. HIPAA rules')+B('com-cost',408,260,208,56,'Shared costs','split by members')+
 [0,1,2].map(i=>K2('m'+i,3+i*.4)).join(''));
C.buildSVG=()=>`<svg id="diagram" viewBox="0 0 1400 850" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="group" aria-label="Animated architecture of the four cloud deployment models"><title>Public, Private, Hybrid and Community cloud architectures</title>${pub()+pri()+hyb()+com()}</svg>`;
})(window.CDM);
