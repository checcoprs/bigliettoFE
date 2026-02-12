const data=new Date(2025, 3, 19, 0, 0, 0); 

const intro=document.getElementById('intro');
const mainContent=document.getElementById('main-content');
const startBtn=document.getElementById('startBtn');
const trunk=document.getElementById('trunk');
const treeContainer=document.getElementById('tree');
const timer=document.getElementById('timer-box');

const titleText="Per l'amore della mia vita";
const testo="Se potessi darti una cosa sola nella vita, ti darei la capacità di vederti attraverso i miei occhi. Solo allora capiresti quanto sei speciale per me. Ti amo immensamente!";

startBtn.addEventListener('click', ()=>{

    intro.style.opacity='0';
    setTimeout(()=>{
        intro.classList.add('hidden');
        mainContent.classList.remove('hidden');
        setTimeout(()=>{
            mainContent.classList.add('visible');
            startAnimation();
        }, 100);
    }, 1000);
});

function startAnimation(){
    
    trunk.style.height='70px';
    
    setTimeout(()=>{
        createTreeHearts(50);
    }, 1000);
}

function createTreeHearts(count){
    let creato=0;
    const interval=setInterval(()=>{
        if (creato>=count) {
            clearInterval(interval);
            setTimeout(typeWriterEffect, 1000); 
            enableFloatingHearts(); 
            return;
        }

        const heart=document.createElement('div');
        heart.classList.add('tree-heart');
        
        const angle=Math.random()*Math.PI*2;
        const radius=Math.random()*80;
        const x=Math.cos(angle)*radius;
        const y=Math.sin(angle)*(radius * 0.8)-90; 

        heart.style.left=`calc(50% + ${x}px)`;
        heart.style.top=`calc(100% + ${y}px)`;
        heart.style.background = ['#ff4d6d', '#ff758f', '#ff8fa3', '#c9184a'][Math.floor(Math.random() * 4)];
        
        treeContainer.appendChild(heart);
        
        setTimeout(()=>{
            heart.style.transform=`rotate(-45deg) scale(${0.8 + Math.random() * 0.5})`;
        }, 50);
        creato++;
    }, 100); 
}

function enableFloatingHearts() {
    const hearts=document.querySelectorAll('.tree-heart');
    hearts.forEach((h, index)=>{
        h.style.animation=`floating ${3 + Math.random()*2}s ease-in-out infinite`;
        h.style.animationDelay=`${Math.random()*2}s`;
    });
}

function typeWriterEffect(){
    let i=0;
    let j=0;
    const titleEl=document.getElementById('title');
    const dedEl=document.getElementById('dedication');

    function typeTitle(){
        if (i<titleText.length){
            titleEl.innerHTML+=titleText.charAt(i);
            i++;
            setTimeout(typeTitle, 50);
        } else{
            typeDedication();
        }
    }

    function typeDedication(){
        if (j<testo.length){
            dedEl.innerHTML+=testo.charAt(j);
            j++;
            setTimeout(typeDedication, 30);
        }else{
            showTimer();
        }
    }

    typeTitle();
}

function showTimer(){
    timer.style.opacity='1';
    timer.style.transform='translateY(0)';
    
    setInterval(updateTimer, 1000);
    updateTimer();
}

function updateTimer(){
    const now=new Date();
    const diff=now-data;
    const days=Math.floor(diff/(1000*60*60*24));
    const hours=Math.floor((diff/(1000*60*60))%24);
    const minutes=Math.floor((diff/(1000*60))%60);
    const seconds=Math.floor((diff/1000)%60);

    document.getElementById('time-elapsed').innerText=`${days}g : ${hours}o : ${minutes}m : ${seconds}s`;

}
