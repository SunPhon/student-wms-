(() => {
  const keys={lessons:'logisticsClassLessons', best:'logisticsClassBest', attempts:'logisticsClassAttempts'};
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
  const completed=()=>read(keys.lessons,[]);
  document.querySelectorAll('[data-completed-count]').forEach(el=>el.textContent=completed().length);
  document.querySelectorAll('[data-best-score]').forEach(el=>el.textContent=read(keys.best,0));
  document.querySelectorAll('[data-quiz-attempts]').forEach(el=>el.textContent=read(keys.attempts,0));
  document.querySelectorAll('[data-mini-game-count]').forEach(el=>el.textContent=read('logisticsClassMiniGames',[]).length);
  document.querySelectorAll('[data-course-meter]').forEach(el=>{const pct=Math.round(completed().length/4*100);el.style.width=pct+'%';el.setAttribute('aria-valuenow',String(pct));});
  document.querySelectorAll('[data-lesson-status]').forEach(el=>{const no=Number(el.dataset.lessonStatus);if(completed().includes(no)){el.textContent='เรียนแล้ว ✓';el.classList.add('is-done');}});
  const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
  if(toggle&&nav)toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  const finish=document.querySelector('[data-finish-lesson]');
  if(finish)finish.addEventListener('click',()=>{const no=Number(finish.dataset.finishLesson),items=completed();if(!items.includes(no))items.push(no);localStorage.setItem(keys.lessons,JSON.stringify(items));finish.textContent='บันทึกบทเรียนแล้ว ✓';finish.classList.add('is-done');document.querySelectorAll('[data-completed-count]').forEach(el=>el.textContent=items.length);});
})();

