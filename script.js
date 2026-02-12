const dataInizio=new Date(2025, 3, 19, 0, 0, 0); 

const intro=document.getElementById('intro');
const mainContent=document.getElementById('main-content');
const startBtn=document.getElementById('startBtn');
const trunk=document.getElementById('trunk');
const treeContainer=document.getElementById('tree');
const timerBox=document.getElementById('timer-box');

const titleText="Per l'amore della mia vita";
const testoDedica="Se potessi darti una cosa sola nella vita, ti darei la capacità di vederti attraverso i miei occhi. Solo allora capiresti quanto sei speciale per me. Ti amo immensamente!";

startBtn.addEventListener('click', () =>{
    intro.style.opacity='0';
    setTimeout(() =>{
        intro.classList.add('hidden');
        mainContent.classList.remove('hidden');

        requestAnimationFrame( () =>{
            mainContent.classList.add('visible');
            startAnimation();
        });
    }, 800);
});

function startAnimation(){
    trunk.style.height='70px';
    setTimeout(() =>{
        createTreeHearts(35); 
    }, 1000);
}

function createTreeHearts(count){
    let creato=0;
    const interval=setInterval(() =>{
        if (creato>=count) {
            clearInterval(interval);
            setTimeout(typeWriterEffect, 500);
            return;
        }

        const heart=document.createElement('div');
        heart.classList.add('tree-heart');
        
        const angle=Math.random()*Math.PI * 2;
        const radius=Math.random()*75;
        const x=Math.cos(angle)*radius;
        const y=Math.sin(angle)*(radius*0.7)-85; 

        heart.style.left=`calc(50% + ${x}px)`;
        heart.style.top=`calc(100% + ${y}px)`;
        heart.style.background=['#ff4d6d', '#ff758f', '#ff8fa3', '#c9184a'][Math.floor(Math.random()*4)];
        
        treeContainer.appendChild(heart);
        
        requestAnimationFrame(() =>{
            setTimeout(() =>{
                heart.style.transform=`rotate(-45deg) scale(${0.7+Math.random()*0.5})`;

                heart.style.animation=`floating ${3+Math.random()*2}s ease-in-out infinite`;
                heart.style.animationDelay=`${Math.random()*2}s`;
            }, 50);
        });

        creato++;
    }, 80);
}

function typeWriterEffect(){
    let i=0;
    let j=0;
    const titleEl=document.getElementById('title');
    const dedEl=document.getElementById('dedication');

    function typeTitle(){
        if (i < titleText.length){
            titleEl.textContent+=titleText.charAt(i);
            i++;
            setTimeout(typeTitle, 60);
        } else{
            setTimeout(typeDedication, 500);
        }
    }

    function typeDedication(){
        if (j<testoDedica.length){
            dedEl.textContent+=testoDedica.charAt(j);
            j++;
            setTimeout(typeDedication, 35);
        } else{
            showTimer();
        }
    }

    typeTitle();
}

function showTimer(){
    timerBox.style.opacity='1';
    timerBox.style.transform='translateY(0)';
    
    setInterval(updateTimer, 1000);
    updateTimer();
}

function updateTimer(){
    const now=new Date();
    const diff=now-dataInizio;
    
    const days=Math.floor(diff/(1000*60*60*24));
    const hours=Math.floor((diff/(1000*60*60))%24);
    const minutes=Math.floor((diff/(1000*60))%60);
    const seconds=Math.floor((diff/1000)%60);

    document.getElementById('time-elapsed').textContent = `${days}g : ${hours}o : ${minutes}m : ${seconds}s`;
}


