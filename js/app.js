			
const secShow = document.getElementById("second");
const miliShow = document.getElementById("milisecond");
const hourShow = document.getElementById("hour");
const minShow = document.getElementById("minute");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const tbody = document.getElementById("tbody");
				
let mili = 0;								
let second = 0;
let minute = 0;
let hour = 0;

// timer start
let startTimer = ()=>{
	timer = setInterval(function(){
            mili += 1;
            miliShow.innerHTML = ('0' + mili).slice(-2);

            if(mili===100){
              mili=0;
              second += 1;
              secShow.innerHTML = ('0' + second).slice(-2);
            }
            if(second===60){
              second=0;
              minute += 1;
              minShow.innerHTML = ('0' + minute).slice(-2);
            }
            if(minute===60){
              minute=0;
              hour += 1;
              hourShow.innerHTML = ('0' + hour).slice(-2);
            }
              
          }, 10)	;
								
  start.style.display = 'none';
  stop.style.display = 'inline-block';
}

// timer stop/pose
function stopTimer(){
  clearInterval(timer);
  stop.style.display = 'none';
  start.style.display = 'inline-block';
  trGenerator('Pose')
}			
		
// timer reset
function resetTimer(){
  if(typeof timer !== 'undefined'){
    clearInterval(timer);
    trGenerator('Reset');
  }
  mili = second = minute = hour = 0;
  miliShow.innerHTML = secShow.innerHTML = minShow.innerHTML = hourShow.innerHTML = '00';
  stop.style.display = 'none';
  start.style.display = 'inline-block';
}				

// tr generator
let trGenerator = (status)=>{
  let tr = document.createElement('tr');
  let td = `
    <td>
      <span id="thour">${hour}</span> :
      <span id="tmin">${minute}</span> :
      <span id="tsec">${second}</span> :
      <span id="tmili">${mili}</span>
    </td>
    <td id="status">${status}</td>
    <td class="text-end"><button class="btn btn-danger py-0 m-0">X</button></td>`
  tr.innerHTML = td.trim()
  
  tbody.insertAdjacentElement('afterbegin', tr);
}

// tr remove 
let trRemove = ()=>{
  const removeBtn = document.querySelectorAll('#tbody .btn');
  [...removeBtn].forEach((btn)=>{
    btn.addEventListener('click', function(){
      btn.parentElement.parentElement.remove();
    })
  })
}






// initialization
start.addEventListener('click', function(){
  startTimer();
})
stop.addEventListener('click', function(){
  stopTimer();
  trRemove();
})
reset.addEventListener('click', function(){
  resetTimer();
  trRemove();
})