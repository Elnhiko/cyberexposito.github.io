// CUSTOM CURSOR
const cursor=document.getElementById('cursor');
const trail=document.getElementById('cursor-trail');
let mx=0,my=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cursor.style.left=mx+'px';
  cursor.style.top=my+'px';
  setTimeout(()=>{trail.style.left=mx+'px';trail.style.top=my+'px';},80);
});
document.querySelectorAll('a,button,.btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cursor.style.transform='translate(-50%,-50%) scale(2)';
    cursor.style.borderColor='var(--magenta)';
  });
  el.addEventListener('mouseleave',()=>{
    cursor.style.transform='translate(-50%,-50%) scale(1)';
    cursor.style.borderColor='var(--cyan)';
  });
});
// TYPING EFFECT
const phrases=[
  'nicolas@homelab:~$ sudo apt upgrade skills',
  'Alternant IT · En route vers l\'ASR.',
  'CTF mode: ON. Firewall: active.',
  'Proxmox is my playground.',
  'root@manomano:~$ 600+ postes gérés.',
];
let pi=0,ci=0,deleting=false;
const el=document.getElementById('typing');
function type(){
  const phrase=phrases[pi];
  if(!deleting){
    el.textContent=phrase.slice(0,++ci);
    if(ci===phrase.length){deleting=true;setTimeout(type,2000);return;}
  }else{
    el.textContent=phrase.slice(0,--ci);
    if(ci===0){deleting=false;pi=(pi+1)%phrases.length;}
  }
  setTimeout(type,deleting?40:70);
}
setTimeout(type,1500);
// SCROLL REVEAL
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
// SKILL BAR ANIMATION on scroll
const skillObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-fill').forEach(bar=>{
        const w=bar.style.width;
        bar.style.width='0';
        setTimeout(()=>{bar.style.width=w;},100);
      });
    }
  });
},{threshold:0.3});
document.querySelectorAll('.skill-card').forEach(el=>skillObserver.observe(el));
// ACTIVE NAV
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(s=>{
    if(window.scrollY>=s.offsetTop-200)current=s.id;
  });
  navLinks.forEach(a=>{
    a.style.color=a.getAttribute('href')==='#'+current?'var(--cyan)':'';
  });
});
// NEON FL
// NEON FLICKER on load
document.querySelectorAll('.hero-name .line1').forEach(el=>{
  let count=0;
  const flicker=setInterval(()=>{
    el.style.opacity=Math.random()>0.3?'1':'0.6';
    if(++count>10)clearInterval(flicker);
  },80);
});

// CONTACT FORM → mailto
document.getElementById('contact-send').addEventListener('click',()=>{
  const name=document.getElementById('contact-name').value.trim();
  const email=document.getElementById('contact-email').value.trim();
  const message=document.getElementById('contact-message').value.trim();
  if(!name||!message){alert('Merci de renseigner votre nom et votre message.');return;}
  const subject=encodeURIComponent('Contact Portfolio — '+name);
  const body=encodeURIComponent('De : '+name+'\nEmail : '+(email||'non renseigné')+'\n\n'+message);
  window.location.href='mailto:e.nicolas64122@outlook.fr?subject='+subject+'&body='+body;
});
