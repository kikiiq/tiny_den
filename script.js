/* ---------- storage (safe wrappers) ---------- */
const st={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},
          set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- pets: one SVG generator, three palettes ---------- */
const PETS={
  fox:{name:'Ember',body:'#E8641B',patch:'#F5CE8E',ear:'#7A2E0C'},
  cat:{name:'Mochi',body:'#6F7C93',patch:'#E7ECF5',ear:'#F2A7B8'},
  owl:{name:'Hoot',body:'#9A7350',patch:'#E9D9BE',ear:'#6E4F33'}
};
const INK='#2b1a16';
/* three eye states: open, tired (half-lidded), closed */
function eyeSet(xs,ey,r,R,body){
  const open=xs.map(x=>`<circle cx="${x}" cy="${ey}" r="${r}" fill="${INK}"/><circle cx="${x+1.5}" cy="${ey-1.5}" r="1.4" fill="#fff"/>`).join('');
  const lids=xs.map(x=>`<path d="M${x-R} ${ey}A${R} ${R} 0 0 1 ${x+R} ${ey}Z" fill="${body}"/><path d="M${x-R} ${ey}H${x+R}" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`).join('');
  const shut=xs.map(x=>`<path d="M${x-6} ${ey}Q${x} ${ey+6} ${x+6} ${ey}" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`).join('');
  return `<g class="eyes-open">${open}</g><g class="eyes-tired">${open}${lids}</g><g class="eyes-closed">${shut}</g>`;
}
function petSVG(k){
  const c=PETS[k];let tail='',parts='';
  if(k==='fox'){
    const T='M80 108C122 116 134 76 114 42C108 66 98 74 76 82Z';
    tail=`<g class="tail"><defs><clipPath id="ft"><path d="${T}"/></clipPath></defs><path d="${T}" fill="${c.body}"/><path d="M96 0H140V58L100 66Z" fill="${c.patch}" clip-path="url(#ft)"/></g>`;
    parts=`<path d="M60 68C38 72 32 98 38 116H82C88 98 82 72 60 68Z" fill="${c.body}"/>
      <path d="M60 76C51 86 49 102 52 116H68C71 102 69 86 60 76Z" fill="${c.patch}"/>
      <ellipse cx="49" cy="115" rx="8" ry="4" fill="#5A2A0E"/><ellipse cx="71" cy="115" rx="8" ry="4" fill="#5A2A0E"/>
      <path d="M32 44L30 6L58 30Z" fill="${c.body}"/><path d="M88 44L90 6L62 30Z" fill="${c.body}"/>
      <path d="M37 38L36 17L50 31Z" fill="${c.ear}"/><path d="M83 38L84 17L70 31Z" fill="${c.ear}"/>
      <path d="M60 26C84 26 92 44 90 56C88 72 72 84 60 84C48 84 32 72 30 56C28 44 36 26 60 26Z" fill="${c.body}"/>
      <path d="M30 58C42 62 52 64 60 60C68 64 78 62 90 58C88 72 72 84 60 84C48 84 32 72 30 58Z" fill="${c.patch}"/>
      <path d="M55 74h10l-5 6z" fill="${INK}"/>`+eyeSet([47,73],52,4,5.5,c.body);
  }else if(k==='cat'){
    tail=`<g class="tail"><path d="M84 104Q118 104 108 66" fill="none" stroke="${c.body}" stroke-width="7" stroke-linecap="round"/></g>`;
    parts=`<ellipse cx="60" cy="94" rx="28" ry="22" fill="${c.body}"/><ellipse cx="60" cy="98" rx="15" ry="13" fill="${c.patch}"/>
      <path d="M33 40L34 22L57 28Z" fill="${c.body}"/><path d="M87 40L86 22L63 28Z" fill="${c.body}"/>
      <path d="M38 37L38 28L50 31Z" fill="${c.ear}"/><path d="M82 37L82 28L70 31Z" fill="${c.ear}"/>
      <circle cx="60" cy="54" r="30" fill="${c.body}"/><ellipse cx="60" cy="64" rx="19" ry="13" fill="${c.patch}"/>
      <path d="M56 61h8l-4 5z" fill="${INK}"/>
      <path d="M30 62h14M30 68l13-3M90 62H76M90 68l-13-3" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>`+eyeSet([49,71],52,4,5.5,c.body);
  }else{
    /* owl: no tail, tall oval body, feather tufts */
    parts=`<ellipse cx="60" cy="74" rx="32" ry="42" fill="${c.body}"/>
      <ellipse cx="31" cy="82" rx="9" ry="26" fill="${c.ear}" transform="rotate(8 31 82)"/><ellipse cx="89" cy="82" rx="9" ry="26" fill="${c.ear}" transform="rotate(-8 89 82)"/>
      <ellipse cx="60" cy="89" rx="18" ry="24" fill="${c.patch}"/>
      <path d="M50 82q5 5 10 0q5 5 10 0M50 94q5 5 10 0q5 5 10 0" fill="none" stroke="${c.ear}" stroke-width="1.6" stroke-linecap="round"/>
      <ellipse cx="50" cy="116" rx="6" ry="3" fill="#F2A33A"/><ellipse cx="70" cy="116" rx="6" ry="3" fill="#F2A33A"/>
      <path d="M36 30L28 6L52 22Z" fill="${c.body}"/><path d="M84 30L92 6L68 22Z" fill="${c.body}"/>
      <ellipse cx="60" cy="46" rx="34" ry="28" fill="${c.body}"/>
      <circle cx="46" cy="48" r="13" fill="${c.patch}"/><circle cx="74" cy="48" r="13" fill="${c.patch}"/>
      <path d="M55 56h10l-5 10z" fill="#F2A33A"/>`+eyeSet([46,74],48,5,13,c.body);
  }
  return `<svg viewBox="0 0 120 120" aria-hidden="true">${tail}<g class="bod">${parts}</g>
    <g class="zzz" fill="${c.body}" font-family="Fredoka,sans-serif" font-weight="600"><text x="92" y="34" font-size="14">z</text><text x="98" y="22" font-size="11">z</text><text x="103" y="12" font-size="9">z</text></g></svg>`;
}

/* ---------- theme ---------- */
const root=document.documentElement;
let theme=st.get('den-theme',(matchMedia('(prefers-color-scheme: dark)').matches?'owl':'fox'));
function applyTheme(t){
  theme=t;root.dataset.theme=t;st.set('den-theme',t);
  document.querySelectorAll('.themes button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===t));
  $('pet-main').innerHTML=petSVG(t);
  renderStatus();renderTasks();
}
document.querySelectorAll('.themes button').forEach(b=>b.onclick=()=>applyTheme(b.dataset.t));

/* ---------- pomodoro (modeled on pomofocus.io) ---------- */
const LEN={work:25*60,short:5*60,long:15*60};
const LABEL={work:'Focus',short:'Short Break',long:'Long Break'};
let mode='work',left=LEN.work,running=false,end=0,tick=null,done=0; /* done = finished focus sessions */
let auto=st.get('den-auto',true);
const $=id=>document.getElementById(id);
const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
function renderStatus(){
  const brk=mode!=='work';
  $('time').textContent=fmt(left);
  $('ring').style.strokeDashoffset=603.2*(1-left/LEN[mode]);
  $('modeLabel').textContent=LABEL[mode];
  $('go').textContent=running?'Pause':'Start';
  $('skip').hidden=!running;
  $('stage').classList.toggle('break',brk);
  /* break not started = tired eyes; break running = asleep; focus running = busy */
  $('pet-main').className='pet main-pet '+(brk?(running?'sleeping':'tired'):(running?'working':'idle'));
  $('status').textContent=brk?'Time for a break!':`#${done+1} Time to focus!`;
  $('auto').checked=auto;
  document.querySelectorAll('[data-m]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===mode));
  document.title=running?`${fmt(left)} · ${brk?'Break':'Focus'} · Tiny Den`:'Tiny Den – focus, tasks, notes';
}
function next(){ /* focus -> break (long after every 4th focus), break -> focus */
  if(mode==='work'){done++;mode=done%4===0?'long':'short'}else mode='work';
  left=LEN[mode];
}
function onTick(){
  left=Math.max(0,Math.round((end-Date.now())/1000));
  if(left===0){
    next();saveTimer();try{navigator.vibrate&&navigator.vibrate(200)}catch(e){}
    if(auto)end=Date.now()+left*1000;else{running=false;clearInterval(tick)}
  }
  renderStatus();
}
function setRun(on){
  running=on;clearInterval(tick);
  if(on){end=Date.now()+left*1000;tick=setInterval(onTick,500)}
  saveTimer();renderStatus();
}
$('go').onclick=()=>setRun(!running);
$('skip').onclick=()=>{next();setRun(auto)};
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{mode=b.dataset.m;left=LEN[mode];setRun(false)});
$('auto').onchange=e=>{auto=e.target.checked;st.set('den-auto',auto)};

/* remember the timer across refreshes */
function saveTimer(){st.set('den-timer',{mode,done,left,running,end})}
let resume=false;
(function(){
  const s=st.get('den-timer',null);
  if(!s||!LEN[s.mode])return;
  mode=s.mode;done=s.done|0;left=Math.min(LEN[mode],Math.max(1,s.left|0));
  if(s.running){
    if(s.end>Date.now()){left=Math.max(1,Math.round((s.end-Date.now())/1000));resume=true}
    else next(); /* it ran out while the page was closed: show the next session, paused */
  }
})();

/* ---------- to-do list ---------- */
let tasks=st.get('den-tasks',[]).map(t=>({text:t.text,s:t.s!==undefined?t.s:(t.done?2:0)})); /* s: 0 empty, 1 in progress, 2 done */
const STATE_LABEL=['Not started','In progress','Done'];
let fresh=-1,focusI=-1;
function renderTasks(){
  const ul=$('list');ul.innerHTML='';
  tasks.forEach((t,i)=>{
    const li=document.createElement('li');
    li.className=['','doing','done'][t.s]+(i===fresh?' new':'');
    const lb=document.createElement('div');lb.className='lbl';
    const cb=document.createElement('button');cb.type='button';cb.className='cb';
    cb.setAttribute('role','checkbox');
    cb.setAttribute('aria-checked',['false','mixed','true'][t.s]);
    cb.setAttribute('aria-label',t.text+' - '+STATE_LABEL[t.s]+'. Press to change.');
    cb.textContent=t.s===2?'\u2713':'';
    const sp=document.createElement('span');sp.className='t';sp.textContent=t.text;
    lb.append(cb,sp);
    if(t.s===1){const g=document.createElement('span');g.className='tag';g.textContent='in progress';lb.append(g)}
    lb.onclick=()=>{tasks[i].s=(tasks[i].s+1)%3;focusI=i;save();renderTasks()};
    const x=document.createElement('button');x.className='x';x.textContent='\u00d7';x.setAttribute('aria-label','Delete task: '+t.text);
    x.onclick=()=>{tasks.splice(i,1);save();renderTasks()};
    li.append(lb,x);ul.append(li);
  });
  fresh=-1;
  if(focusI>=0){const b=ul.querySelectorAll('.cb')[focusI];focusI=-1;if(b)b.focus()}
}
function save(){st.set('den-tasks',tasks)}
function addTask(){
  const v=$('newTask').value.trim();if(!v)return;
  tasks.push({text:v,s:0});fresh=tasks.length-1;save();$('newTask').value='';renderTasks();$('newTask').focus();
}
$('addBtn').onclick=addTask;
$('newTask').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();addTask()}};

/* ---------- notes (plain text) ---------- */
let nt=null;
let old=st.get('den-notes','');
if(/<[a-z][\s\S]*>/i.test(old)){ /* notes saved by the short-lived rich-text version -> plain text */
  old=new DOMParser().parseFromString(old.replace(/<\/(div|h3|p)>|<br\s*\/?>/gi,'\n'),'text/html').body.textContent.trim();
  st.set('den-notes',old);
}
$('notes').value=old;
$('notes').oninput=e=>{
  clearTimeout(nt);$('saved').textContent='Typing\u2026';
  nt=setTimeout(()=>{st.set('den-notes',e.target.value);$('saved').textContent='Saved on this device'},700);
};

/* ---------- restart (needs two clicks) ---------- */
const NOTE='Erase all tasks, notes and sessions';
let armT=null;
function disarm(){clearTimeout(armT);$('restart').classList.remove('armed');$('restart').textContent='Restart';$('restartNote').textContent=NOTE}
$('restart').onclick=()=>{
  const b=$('restart');
  if(!b.classList.contains('armed')){ /* first click: arm, and disarm itself after 5 s */
    b.classList.add('armed');b.textContent='Yes';$('restartNote').textContent='Are you sure?';
    armT=setTimeout(disarm,5000);return;
  }
  disarm();
  tasks=[];save();renderTasks();
  clearTimeout(nt);$('notes').value='';st.set('den-notes','');$('saved').textContent='';
  mode='work';done=0;left=LEN.work;setRun(false);
};
document.addEventListener('keydown',e=>{if(e.key==='Escape')disarm()});

applyTheme(theme);
if(resume)setRun(true);
