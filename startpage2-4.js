// BEM VINDAS PERSONALIZADAS EM RELAÇÃO A HORA E AO DIA (RESPECTIVAMENTE)

document.addEventListener('DOMContentLoaded', function() {
    const date = new Date();
    const hour = date.getHours();
    const greeting = document.querySelector('h1');
  
    if (hour >= 5 && hour < 12) {
      greeting.textContent = 'Bom dia, Illan!';
    } else if (hour >= 12 && hour < 18) {
      greeting.textContent = 'Boa tarde, Illan!';
    } else if (hour > 23 && hour < 5 ){
      greeting.textContent = 'Boa madrugada, Illan!';
    } else {
        greeting.textContent = "Boa noite, Illan!";
    }
  }
  );


document.addEventListener('DOMContentLoaded', function() {
    const dia = new Date();

    const miniGreetings = document.querySelector('h3');
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	  };

	const diaAno = dia.toLocaleDateString('pt-BR', options);
  

    miniGreetings.textContent = `${diaAno}`;
  });


// GERADOR DE SEMANA
document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    const currentWeek = getWeekNumber(currentDate);
    document.getElementById('currentWeek').textContent = `Week ${currentWeek}`;
    const weekGraph = document.getElementById('weekGraph');

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
  
    // Create table header (days of the week)
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const headerRow = document.createElement('tr');
    daysOfWeek.forEach(day => {
      const th = document.createElement('th');
      th.textContent = day;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    // Create table body (dates of the current week)
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Get the first day of the week (Sunday)
    for (let i = 0; i < 1; i++) { // Only one row for the current week
      const tr = document.createElement('tr');
      for (let j = 0; j < 7; j++) {
        const td = document.createElement('td');
        const day = new Date(firstDayOfWeek);
        day.setDate(firstDayOfWeek.getDate() + j);
        td.textContent = day.getDate();
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    weekGraph.appendChild(table);
    
  });
  
  function getWeekNumber(date) {
    const target = new Date(date.valueOf());
    const dayNumber = (date.getUTCDay() + 6) % 7;
    target.setUTCDate(target.getUTCDate() - dayNumber + 3);
    const firstThursday = target.valueOf();
    target.setUTCMonth(0, 1);
    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
  }

// TO DO LIST

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const task = taskInput.value;
  
    if (task) {
      const p = document.createElement('p');
      p.appendChild(document.createTextNode(task));
      
      const deleteButton = document.createElement('button');
      deleteButton.appendChild(document.createTextNode('x'));
      deleteButton.onclick = function() {
        taskList.removeChild(p);
        removeTaskFromLocalStorage(task);
      };
      
      p.appendChild(deleteButton);
      taskList.appendChild(p);
      taskInput.value = '';
  
      saveTaskToLocalStorage(task);
    }
  }
  
  function saveTaskToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function removeTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(item => item !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
      const p = document.createElement('p');
      p.appendChild(document.createTextNode(task));
      
      const deleteButton = document.createElement('button');
      deleteButton.appendChild(document.createTextNode('x'));
      deleteButton.onclick = function() {
        taskList.removeChild(p);
        removeTaskFromLocalStorage(task);
      };
      
      p.appendChild(deleteButton);
      document.getElementById('taskList').appendChild(p);
    });
  });


// POMODORO

let timer;
let timeLeft = 50 * 60; // Default to Pomodoro duration

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer(duration, callback) {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }

    timeLeft = duration * 60;
    updateTimerDisplay();
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            // Play alarm sound
            playAlarmSound();
            alert(`Timer complete! (${duration} minutes)`);

			if (callback) {
				callback();
			}
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    timeLeft = 50 * 60; // Default to Pomodoro duration
    updateTimerDisplay();
}

function playAlarmSound() {
    const audio = new Audio('/home/illan/Músicas/coin-pkmn.mp3'); // Replace with your sound file
    audio.play();
}

updateTimerDisplay(); // Initial display



// SKILLS AND PROJECTS UP TO DATE ON PAGE LOAD
document.addEventListener("DOMContentLoaded", function(){
		
		const codeMeter = document.getElementById("codeMeter");
		codeMeter.value = localStorage.getItem("codeCount");

		const physicalMeter = document.getElementById("physicalMeter");
		physicalMeter.value = localStorage.getItem("physicalCount");

		const socialMeter = document.getElementById("socialMeter");
		socialMeter.value = localStorage.getItem("socialCount");

		const reactMeter = document.getElementById('reactMeter');
		reactMeter.value = localStorage.getItem("reactCount");

		const fccMeter = document.getElementById('fccMeter');
		fccMeter.value = localStorage.getItem("fccCount");
})

// SKILLS UPDATE BY CLICK ON BUTTONS


function codeXp() {
	startTimer(50, function() {
		codeUpXp();
	});
}

function codeUpXp() {

	if (localStorage.getItem("codeCount") === null || localStorage.getItem("codeCount") === undefined) {
		let codeCount = 1;
		localStorage.setItem("codeCount", codeCount);
		codeMeter.value = codeCount;
	} else {
		const originalCount = localStorage.getItem("codeCount");
		const codeMeter = document.getElementById("codeMeter");
		let codeCount = originalCount;
		codeCount++;
		localStorage.setItem("codeCount", codeCount);
		codeMeter.value = codeCount;
	}

}


function physicalXp() {
	startTimer(60, function() {
		physicalUpXp();
	})
}

function physicalUpXp() {
	if (localStorage.getItem("physicalCount") === null || localStorage.getItem("physicalCount") === undefined) {
		let physicalCount = 1;
		localStorage.setItem("physicalCount", physicalCount);
		physicalMeter.value = physicalCount;
	} else {
		const originalCount = localStorage.getItem("physicalCount");
		const physicalMeter = document.getElementById("physicalMeter");
		let physicalCount = originalCount;
		physicalCount++;
		localStorage.setItem("physicalCount", physicalCount);
		physicalMeter.value = physicalCount;
	}

}


function socialXp() {
	startTimer(60, function() {
		socialUpXp();
	})
}

function socialUpXp() {
	if (localStorage.getItem("socialCount") === null || localStorage.getItem("socialCount") === undefined) {
		let socialCount = 1;
		localStorage.setItem("socialCount", socialCount);
		socialMeter.value = socialCount;
	} else {
		const originalCount = localStorage.getItem("socialCount");
		const socialMeter = document.getElementById("socialMeter");
		let socialCount = originalCount;
		socialCount++;
		localStorage.setItem("socialCount", socialCount);
		socialMeter.value = socialCount;
	}

}

// PROJECTS METERS UPDATE

function reactXp() {

	if (localStorage.getItem("reactCount") === null || localStorage.getItem("reactCount") === undefined) {
		let reactCount = 1;
		localStorage.setItem("reactCount", reactCount);
		reactMeter.value = reactCount;
	} else {
		const originalCount = localStorage.getItem("reactCount");
		const reactMeter = document.getElementById("reactMeter");
		let reactCount = originalCount;
		reactCount++;
		localStorage.setItem("reactCount", reactCount);
		reactMeter.value = reactCount;
	}

}


function fccXp() {

	if (localStorage.getItem("fccCount") === null || localStorage.getItem("fccCount") === undefined) {
		let fccCount = 1;
		localStorage.setItem("fccCount", fccCount);
		fccMeter.value = fccCount;
	} else {
		const originalCount = localStorage.getItem("fccCount");
		const fccMeter = document.getElementById("fccMeter");
		let fccCount = originalCount;
		fccCount++;
		localStorage.setItem("fccCount", fccCount);
		fccMeter.value = fccCount;
	}

}

// BUDDHIST GENERATOR



// Random sutta picker
// Generated by buildRandomSutta.sh on Sat Oct 28 11:01:08 EDT 2017
var suttaList=new Array(
	"./tipitaka/an/an01/an01.021-040.than.html",
	"./tipitaka/an/an01/an01.031-040x.wood.html",
	"./tipitaka/an/an01/an01.045-046.than.html",
	"./tipitaka/an/an01/an01.047.than.html",
	"./tipitaka/an/an01/an01.048.than.html",
	"./tipitaka/an/an01/an01.049.than.html",
	"./tipitaka/an/an02/an02.005.than.html",
	"./tipitaka/an/an02/an02.009.irel.html",
	"./tipitaka/an/an02/an02.009.than.html",
	"./tipitaka/an/an02/an02.018.than.html",
	"./tipitaka/an/an02/an02.019.than.html",
	"./tipitaka/an/an02/an02.021.than.html",
	"./tipitaka/an/an02/an02.023.than.html",
	"./tipitaka/an/an02/an02.025.than.html",
	"./tipitaka/an/an02/an02.030.than.html",
	"./tipitaka/an/an02/an02.031.than.html",
	"./tipitaka/an/an02/an02.033.niza.html",
	"./tipitaka/an/an02/an02.038.than.html",
	"./tipitaka/an/an02/an02.046.than.html",
	"./tipitaka/an/an02/an02.098.than.html",
	"./tipitaka/an/an02/an02.119.than.html",
	"./tipitaka/an/an02/an02.125-126.than.html",
	"./tipitaka/an/an03/an03.002.than.html",
	"./tipitaka/an/an03/an03.015.than.html",
	"./tipitaka/an/an03/an03.022.than.html",
	"./tipitaka/an/an03/an03.033.than.html",
	"./tipitaka/an/an03/an03.034.than.html",
	"./tipitaka/an/an03/an03.038.than.html",
	"./tipitaka/an/an03/an03.040.than.html",
	"./tipitaka/an/an03/an03.047.than.html",
	"./tipitaka/an/an03/an03.048.than.html",
	"./tipitaka/an/an03/an03.051.than.html",
	"./tipitaka/an/an03/an03.052.than.html",
	"./tipitaka/an/an03/an03.057.than.html",
	"./tipitaka/an/an03/an03.060.than.html",
	"./tipitaka/an/an03/an03.061.than.html",
	"./tipitaka/an/an03/an03.062.than.html",
	"./tipitaka/an/an03/an03.065.soma.html",
	"./tipitaka/an/an03/an03.065.than.html",
	"./tipitaka/an/an03/an03.066.nymo.html",
	"./tipitaka/an/an03/an03.067.than.html",
	"./tipitaka/an/an03/an03.068.than.html",
	"./tipitaka/an/an03/an03.069.than.html",
	"./tipitaka/an/an03/an03.070.than.html",
	"./tipitaka/an/an03/an03.071.than.html",
	"./tipitaka/an/an03/an03.072.than.html",
	"./tipitaka/an/an03/an03.073.than.html",
	"./tipitaka/an/an03/an03.076.than.html",
	"./tipitaka/an/an03/an03.077.than.html",
	"./tipitaka/an/an03/an03.078.than.html",
	"./tipitaka/an/an03/an03.081.than.html",
	"./tipitaka/an/an03/an03.083.than.html",
	"./tipitaka/an/an03/an03.085.than.html",
	"./tipitaka/an/an03/an03.086.than.html",
	"./tipitaka/an/an03/an03.088.than.html",
	"./tipitaka/an/an03/an03.089.than.html",
	"./tipitaka/an/an03/an03.091.than.html",
	"./tipitaka/an/an03/an03.094.than.html",
	"./tipitaka/an/an03/an03.099.than.html",
	"./tipitaka/an/an03/an03.100.01-10.than.html",
	"./tipitaka/an/an03/an03.100.11-15.than.html",
	"./tipitaka/an/an03/an03.105.than.html",
	"./tipitaka/an/an03/an03.120.than.html",
	"./tipitaka/an/an03/an03.123.than.html",
	"./tipitaka/an/an03/an03.126.than.html",
	"./tipitaka/an/an03/an03.130.than.html",
	"./tipitaka/an/an03/an03.134.than.html",
	"./tipitaka/an/an04/an04.001.than.html",
	"./tipitaka/an/an04/an04.005.than.html",
	"./tipitaka/an/an04/an04.010.niza.html",
	"./tipitaka/an/an04/an04.010.than.html",
	"./tipitaka/an/an04/an04.019.than.html",
	"./tipitaka/an/an04/an04.024.than.html",
	"./tipitaka/an/an04/an04.028.than.html",
	"./tipitaka/an/an04/an04.031.than.html",
	"./tipitaka/an/an04/an04.032.than.html",
	"./tipitaka/an/an04/an04.035.than.html",
	"./tipitaka/an/an04/an04.036.than.html",
	"./tipitaka/an/an04/an04.037.than.html",
	"./tipitaka/an/an04/an04.041.than.html",
	"./tipitaka/an/an04/an04.042.than.html",
	"./tipitaka/an/an04/an04.045.than.html",
	"./tipitaka/an/an04/an04.049.olen.html",
	"./tipitaka/an/an04/an04.049.than.html",
	"./tipitaka/an/an04/an04.050.than.html",
	"./tipitaka/an/an04/an04.055.than.html",
	"./tipitaka/an/an04/an04.062.than.html",
	"./tipitaka/an/an04/an04.067.piya.html",
	"./tipitaka/an/an04/an04.067.than.html",
	"./tipitaka/an/an04/an04.073.than.html",
	"./tipitaka/an/an04/an04.077.than.html",
	"./tipitaka/an/an04/an04.079.than.html",
	"./tipitaka/an/an04/an04.085.than.html",
	"./tipitaka/an/an04/an04.094.than.html",
	"./tipitaka/an/an04/an04.095.budd.html",
	"./tipitaka/an/an04/an04.095.than.html",
	"./tipitaka/an/an04/an04.096.than.html",
	"./tipitaka/an/an04/an04.099.than.html",
	"./tipitaka/an/an04/an04.102.than.html",
	"./tipitaka/an/an04/an04.111.than.html",
	"./tipitaka/an/an04/an04.113.than.html",
	"./tipitaka/an/an04/an04.113.wood.html",
	"./tipitaka/an/an04/an04.115.than.html",
	"./tipitaka/an/an04/an04.123.than.html",
	"./tipitaka/an/an04/an04.124.than.html",
	"./tipitaka/an/an04/an04.125.nymo.html",
	"./tipitaka/an/an04/an04.125.than.html",
	"./tipitaka/an/an04/an04.126.nymo.html",
	"./tipitaka/an/an04/an04.126.than.html",
	"./tipitaka/an/an04/an04.144.than.html",
	"./tipitaka/an/an04/an04.159.than.html",
	"./tipitaka/an/an04/an04.162.than.html",
	"./tipitaka/an/an04/an04.163.than.html",
	"./tipitaka/an/an04/an04.164.than.html",
	"./tipitaka/an/an04/an04.165.than.html",
	"./tipitaka/an/an04/an04.170.than.html",
	"./tipitaka/an/an04/an04.174.than.html",
	"./tipitaka/an/an04/an04.178.than.html",
	"./tipitaka/an/an04/an04.179.than.html",
	"./tipitaka/an/an04/an04.181.than.html",
	"./tipitaka/an/an04/an04.183.than.html",
	"./tipitaka/an/an04/an04.184.than.html",
	"./tipitaka/an/an04/an04.192.than.html",
	"./tipitaka/an/an04/an04.199.than.html",
	"./tipitaka/an/an04/an04.200.than.html",
	"./tipitaka/an/an04/an04.235.than.html",
	"./tipitaka/an/an04/an04.245.than.html",
	"./tipitaka/an/an04/an04.252.than.html",
	"./tipitaka/an/an04/an04.255.than.html",
	"./tipitaka/an/an04/an04.259.than.html",
	"./tipitaka/an/an05/an05.002.than.html",
	"./tipitaka/an/an05/an05.020.than.html",
	"./tipitaka/an/an05/an05.025.than.html",
	"./tipitaka/an/an05/an05.027.than.html",
	"./tipitaka/an/an05/an05.028.than.html",
	"./tipitaka/an/an05/an05.029.agku.html",
	"./tipitaka/an/an05/an05.029.than.html",
	"./tipitaka/an/an05/an05.030.than.html",
	"./tipitaka/an/an05/an05.034.than.html",
	"./tipitaka/an/an05/an05.036.than.html",
	"./tipitaka/an/an05/an05.037.than.html",
	"./tipitaka/an/an05/an05.038.than.html",
	"./tipitaka/an/an05/an05.041.than.html",
	"./tipitaka/an/an05/an05.043.than.html",
	"./tipitaka/an/an05/an05.049.hekh.html",
	"./tipitaka/an/an05/an05.049.than.html",
	"./tipitaka/an/an05/an05.051.than.html",
	"./tipitaka/an/an05/an05.053.than.html",
	"./tipitaka/an/an05/an05.057.than.html",
	"./tipitaka/an/an05/an05.064.than.html",
	"./tipitaka/an/an05/an05.073.than.html",
	"./tipitaka/an/an05/an05.075.than.html",
	"./tipitaka/an/an05/an05.076.than.html",
	"./tipitaka/an/an05/an05.077.than.html",
	"./tipitaka/an/an05/an05.078.than.html",
	"./tipitaka/an/an05/an05.079.than.html",
	"./tipitaka/an/an05/an05.080.than.html",
	"./tipitaka/an/an05/an05.095.niza.html",
	"./tipitaka/an/an05/an05.096.than.html",
	"./tipitaka/an/an05/an05.097.than.html",
	"./tipitaka/an/an05/an05.098.than.html",
	"./tipitaka/an/an05/an05.114.than.html",
	"./tipitaka/an/an05/an05.121.than.html",
	"./tipitaka/an/an05/an05.129.than.html",
	"./tipitaka/an/an05/an05.130.than.html",
	"./tipitaka/an/an05/an05.139.than.html",
	"./tipitaka/an/an05/an05.140.than.html",
	"./tipitaka/an/an05/an05.148.than.html",
	"./tipitaka/an/an05/an05.159.than.html",
	"./tipitaka/an/an05/an05.161.nymo.html",
	"./tipitaka/an/an05/an05.161.than.html",
	"./tipitaka/an/an05/an05.162.than.html",
	"./tipitaka/an/an05/an05.165.than.html",
	"./tipitaka/an/an05/an05.175.than.html",
	"./tipitaka/an/an05/an05.176.than.html",
	"./tipitaka/an/an05/an05.177.than.html",
	"./tipitaka/an/an05/an05.179.than.html",
	"./tipitaka/an/an05/an05.180.than.html",
	"./tipitaka/an/an05/an05.196.than.html",
	"./tipitaka/an/an05/an05.198.than.html",
	"./tipitaka/an/an05/an05.199.than.html",
	"./tipitaka/an/an05/an05.200.than.html",
	"./tipitaka/an/an05/an05.202.than.html",
	"./tipitaka/an/an05/an05.254.than.html",
	"./tipitaka/an/an06/an06.012.than.html",
	"./tipitaka/an/an06/an06.013.than.html",
	"./tipitaka/an/an06/an06.016.than.html",
	"./tipitaka/an/an06/an06.019.than.html",
	"./tipitaka/an/an06/an06.020.than.html",
	"./tipitaka/an/an06/an06.037.than.html",
	"./tipitaka/an/an06/an06.038.niza.html",
	"./tipitaka/an/an06/an06.041.than.html",
	"./tipitaka/an/an06/an06.042.than.html",
	"./tipitaka/an/an06/an06.045.than.html",
	"./tipitaka/an/an06/an06.046.than.html",
	"./tipitaka/an/an06/an06.047.than.html",
	"./tipitaka/an/an06/an06.049.than.html",
	"./tipitaka/an/an06/an06.051.than.html",
	"./tipitaka/an/an06/an06.054.olen.html",
	"./tipitaka/an/an06/an06.055.than.html",
	"./tipitaka/an/an06/an06.063.than.html",
	"./tipitaka/an/an06/an06.085.than.html",
	"./tipitaka/an/an06/an06.086.than.html",
	"./tipitaka/an/an06/an06.087.than.html",
	"./tipitaka/an/an06/an06.088.than.html",
	"./tipitaka/an/an06/an06.097.than.html",
	"./tipitaka/an/an06/an06.102.than.html",
	"./tipitaka/an/an06/an06.103.than.html",
	"./tipitaka/an/an06/an06.104.than.html",
	"./tipitaka/an/an07/an07.006.than.html",
	"./tipitaka/an/an07/an07.007.than.html",
	"./tipitaka/an/an07/an07.011.than.html",
	"./tipitaka/an/an07/an07.012.than.html",
	"./tipitaka/an/an07/an07.015.than.html",
	"./tipitaka/an/an07/an07.021.than.html",
	"./tipitaka/an/an07/an07.031.than.html",
	"./tipitaka/an/an07/an07.032.than.html",
	"./tipitaka/an/an07/an07.033.than.html",
	"./tipitaka/an/an07/an07.034.than.html",
	"./tipitaka/an/an07/an07.035.than.html",
	"./tipitaka/an/an07/an07.046.than.html",
	"./tipitaka/an/an07/an07.048.than.html",
	"./tipitaka/an/an07/an07.049.than.html",
	"./tipitaka/an/an07/an07.051.than.html",
	"./tipitaka/an/an07/an07.056.than.html",
	"./tipitaka/an/an07/an07.058.than.html",
	"./tipitaka/an/an07/an07.060.nymo.html",
	"./tipitaka/an/an07/an07.060.than.html",
	"./tipitaka/an/an07/an07.063.than.html",
	"./tipitaka/an/an07/an07.064.than.html",
	"./tipitaka/an/an07/an07.068.yaho.html",
	"./tipitaka/an/an07/an07.070.than.html",
	"./tipitaka/an/an07/an07.079.than.html",
	"./tipitaka/an/an08/an08.002.than.html",
	"./tipitaka/an/an08/an08.006.than.html",
	"./tipitaka/an/an08/an08.007.than.html",
	"./tipitaka/an/an08/an08.008.than.html",
	"./tipitaka/an/an08/an08.009.than.html",
	"./tipitaka/an/an08/an08.013.than.html",
	"./tipitaka/an/an08/an08.014.than.html",
	"./tipitaka/an/an08/an08.023.than.html",
	"./tipitaka/an/an08/an08.024.than.html",
	"./tipitaka/an/an08/an08.025.kuma.html",
	"./tipitaka/an/an08/an08.026.than.html",
	"./tipitaka/an/an08/an08.028.than.html",
	"./tipitaka/an/an08/an08.030.than.html",
	"./tipitaka/an/an08/an08.039.than.html",
	"./tipitaka/an/an08/an08.040.than.html",
	"./tipitaka/an/an08/an08.041.vaka.html",
	"./tipitaka/an/an08/an08.043.khan.html",
	"./tipitaka/an/an08/an08.053.than.html",
	"./tipitaka/an/an08/an08.054.nara.html",
	"./tipitaka/an/an08/an08.054.than.html",
	"./tipitaka/an/an08/an08.059.kuma.html",
	"./tipitaka/an/an08/an08.063.than.html",
	"./tipitaka/an/an08/an08.080.than.html",
	"./tipitaka/an/an08/an08.086.than.html",
	"./tipitaka/an/an09/an09.001.than.html",
	"./tipitaka/an/an09/an09.007.than.html",
	"./tipitaka/an/an09/an09.013.than.html",
	"./tipitaka/an/an09/an09.014.than.html",
	"./tipitaka/an/an09/an09.015.than.html",
	"./tipitaka/an/an09/an09.016.than.html",
	"./tipitaka/an/an09/an09.020.than.html",
	"./tipitaka/an/an09/an09.031.than.html",
	"./tipitaka/an/an09/an09.032.than.html",
	"./tipitaka/an/an09/an09.033.than.html",
	"./tipitaka/an/an09/an09.034.than.html",
	"./tipitaka/an/an09/an09.035.than.html",
	"./tipitaka/an/an09/an09.036.than.html",
	"./tipitaka/an/an09/an09.037.than.html",
	"./tipitaka/an/an09/an09.038.than.html",
	"./tipitaka/an/an09/an09.039.than.html",
	"./tipitaka/an/an09/an09.040.than.html",
	"./tipitaka/an/an09/an09.041.than.html",
	"./tipitaka/an/an09/an09.042.than.html",
	"./tipitaka/an/an09/an09.043.than.html",
	"./tipitaka/an/an09/an09.044.than.html",
	"./tipitaka/an/an09/an09.045.than.html",
	"./tipitaka/an/an09/an09.062.than.html",
	"./tipitaka/an/an09/an09.063.than.html",
	"./tipitaka/an/an09/an09.064.than.html",
	"./tipitaka/an/an10/an10.006.than.html",
	"./tipitaka/an/an10/an10.007.than.html",
	"./tipitaka/an/an10/an10.013.than.html",
	"./tipitaka/an/an10/an10.015.than.html",
	"./tipitaka/an/an10/an10.017.than.html",
	"./tipitaka/an/an10/an10.020.than.html",
	"./tipitaka/an/an10/an10.024.than.html",
	"./tipitaka/an/an10/an10.027x.nypo.html",
	"./tipitaka/an/an10/an10.029.than.html",
	"./tipitaka/an/an10/an10.046.than.html",
	"./tipitaka/an/an10/an10.048.piya.html",
	"./tipitaka/an/an10/an10.048.than.html",
	"./tipitaka/an/an10/an10.051.than.html",
	"./tipitaka/an/an10/an10.054.than.html",
	"./tipitaka/an/an10/an10.058.than.html",
	"./tipitaka/an/an10/an10.060.piya.html",
	"./tipitaka/an/an10/an10.060.than.html",
	"./tipitaka/an/an10/an10.065.niza.html",
	"./tipitaka/an/an10/an10.066.niza.html",
	"./tipitaka/an/an10/an10.069.than.html",
	"./tipitaka/an/an10/an10.070.than.html",
	"./tipitaka/an/an10/an10.071.than.html",
	"./tipitaka/an/an10/an10.080.than.html",
	"./tipitaka/an/an10/an10.081.than.html",
	"./tipitaka/an/an10/an10.092.than.html",
	"./tipitaka/an/an10/an10.093.than.html",
	"./tipitaka/an/an10/an10.094.than.html",
	"./tipitaka/an/an10/an10.095.than.html",
	"./tipitaka/an/an10/an10.096.than.html",
	"./tipitaka/an/an10/an10.103.than.html",
	"./tipitaka/an/an10/an10.104.than.html",
	"./tipitaka/an/an10/an10.108.than.html",
	"./tipitaka/an/an10/an10.118.niza.html",
	"./tipitaka/an/an10/an10.176.than.html",
	"./tipitaka/an/an10/an10.177.than.html",
	"./tipitaka/an/an10/an10.208.than.html",
	"./tipitaka/an/an11/an11.001.than.html",
	"./tipitaka/an/an11/an11.002.than.html",
	"./tipitaka/an/an11/an11.010.than.html",
	"./tipitaka/an/an11/an11.012.than.html",
	"./tipitaka/an/an11/an11.013.than.html",
	"./tipitaka/an/an11/an11.016.piya.html",
	"./tipitaka/an/an11/an11.016.than.html",
	"./tipitaka/an/an11/an11.017.than.html",
	"./tipitaka/an/an11/an11.018.than.html",
	"./tipitaka/an/renumber.html",
	"./tipitaka/an/renumber2.html",
	"./tipitaka/dn/dn.01.0.bodh.html",
	"./tipitaka/dn/dn.02.0.than.html",
	"./tipitaka/dn/dn.09.0.than.html",
	"./tipitaka/dn/dn.11.0.than.html",
	"./tipitaka/dn/dn.12.0.than.html",
	"./tipitaka/dn/dn.15.0.than.html",
	"./tipitaka/dn/dn.16.1-6.vaji.html",
	"./tipitaka/dn/dn.16.5-6.than.html",
	"./tipitaka/dn/dn.20.0.piya.html",
	"./tipitaka/dn/dn.20.0.than.html",
	"./tipitaka/dn/dn.21.2x.than.html",
	"./tipitaka/dn/dn.22.0.bpit.html",
	"./tipitaka/dn/dn.22.0.than.html",
	"./tipitaka/dn/dn.26.0.than.html",
	"./tipitaka/dn/dn.31.0.ksw0.html",
	"./tipitaka/dn/dn.31.0.nara.html",
	"./tipitaka/dn/dn.32.0.piya.html",
	"./tipitaka/kn/dhp/dhp-buddh-than.html",
	"./tipitaka/kn/dhp/dhp.01.budd.html",
	"./tipitaka/kn/dhp/dhp.01.than.html",
	"./tipitaka/kn/dhp/dhp.02.budd.html",
	"./tipitaka/kn/dhp/dhp.02.than.html",
	"./tipitaka/kn/dhp/dhp.03.budd.html",
	"./tipitaka/kn/dhp/dhp.03.than.html",
	"./tipitaka/kn/dhp/dhp.04.budd.html",
	"./tipitaka/kn/dhp/dhp.04.than.html",
	"./tipitaka/kn/dhp/dhp.05.budd.html",
	"./tipitaka/kn/dhp/dhp.05.than.html",
	"./tipitaka/kn/dhp/dhp.06.budd.html",
	"./tipitaka/kn/dhp/dhp.06.than.html",
	"./tipitaka/kn/dhp/dhp.07.budd.html",
	"./tipitaka/kn/dhp/dhp.07.than.html",
	"./tipitaka/kn/dhp/dhp.08.budd.html",
	"./tipitaka/kn/dhp/dhp.08.than.html",
	"./tipitaka/kn/dhp/dhp.09.budd.html",
	"./tipitaka/kn/dhp/dhp.09.than.html",
	"./tipitaka/kn/dhp/dhp.10.budd.html",
	"./tipitaka/kn/dhp/dhp.10.than.html",
	"./tipitaka/kn/dhp/dhp.11.budd.html",
	"./tipitaka/kn/dhp/dhp.11.than.html",
	"./tipitaka/kn/dhp/dhp.12.budd.html",
	"./tipitaka/kn/dhp/dhp.12.than.html",
	"./tipitaka/kn/dhp/dhp.13.budd.html",
	"./tipitaka/kn/dhp/dhp.13.than.html",
	"./tipitaka/kn/dhp/dhp.13x.olen.html",
	"./tipitaka/kn/dhp/dhp.14.budd.html",
	"./tipitaka/kn/dhp/dhp.14.than.html",
	"./tipitaka/kn/dhp/dhp.15.budd.html",
	"./tipitaka/kn/dhp/dhp.15.than.html",
	"./tipitaka/kn/dhp/dhp.16.budd.html",
	"./tipitaka/kn/dhp/dhp.16.than.html",
	"./tipitaka/kn/dhp/dhp.17.budd.html",
	"./tipitaka/kn/dhp/dhp.17.than.html",
	"./tipitaka/kn/dhp/dhp.18.budd.html",
	"./tipitaka/kn/dhp/dhp.18.than.html",
	"./tipitaka/kn/dhp/dhp.19.budd.html",
	"./tipitaka/kn/dhp/dhp.19.than.html",
	"./tipitaka/kn/dhp/dhp.20.budd.html",
	"./tipitaka/kn/dhp/dhp.20.than.html",
	"./tipitaka/kn/dhp/dhp.21.budd.html",
	"./tipitaka/kn/dhp/dhp.21.than.html",
	"./tipitaka/kn/dhp/dhp.22.budd.html",
	"./tipitaka/kn/dhp/dhp.22.than.html",
	"./tipitaka/kn/dhp/dhp.23.budd.html",
	"./tipitaka/kn/dhp/dhp.23.than.html",
	"./tipitaka/kn/dhp/dhp.24.budd.html",
	"./tipitaka/kn/dhp/dhp.24.than.html",
	"./tipitaka/kn/dhp/dhp.25.budd.html",
	"./tipitaka/kn/dhp/dhp.25.than.html",
	"./tipitaka/kn/dhp/dhp.26.budd.html",
	"./tipitaka/kn/dhp/dhp.26.than.html",
	"./tipitaka/kn/dhp/dhp.intro.budd.html",
	"./tipitaka/kn/dhp/dhp.intro.than.html",
	"./tipitaka/kn/iti/iti-than.html",
	"./tipitaka/kn/iti/iti.1.001-027.than.html",
	"./tipitaka/kn/iti/iti.1.024-027.irel.html",
	"./tipitaka/kn/iti/iti.2.028-049.than.html",
	"./tipitaka/kn/iti/iti.2.042-049x.irel.html",
	"./tipitaka/kn/iti/iti.3.050-099.than.html",
	"./tipitaka/kn/iti/iti.3.072-090x.irel.html",
	"./tipitaka/kn/iti/iti.4.100-112.than.html",
	"./tipitaka/kn/iti/iti.4.106-112x.irel.html",
	"./tipitaka/kn/iti/iti.intro.irel.html",
	"./tipitaka/kn/iti/iti.intro.than.html",
	"./tipitaka/kn/khp/khp.1-9.than.html",
	"./tipitaka/kn/khp/khp.1-9x.piya.html",
	"./tipitaka/kn/khp/khp.5.nara.html",
	"./tipitaka/kn/khp/khp.5.soni.html",
	"./tipitaka/kn/khp/khp.9.amar.html",
	"./tipitaka/kn/khp/khp.9.budd.html",
	"./tipitaka/kn/khp/khp.9.nymo.html",
	"./tipitaka/kn/miln/miln.2x.kell.html",
	"./tipitaka/kn/miln/miln.3x.kell.html",
	"./tipitaka/kn/miln/miln.5x.horn.html",
	"./tipitaka/kn/miln/miln.5x.olen.html",
	"./tipitaka/kn/miln/miln.intro.kell.html",
	"./tipitaka/kn/nm/nm.2.04.olen.html",
	"./tipitaka/kn/pv/pv.1.05.than.html",
	"./tipitaka/kn/snp/snp.1.01.nypo.html",
	"./tipitaka/kn/snp/snp.1.01.than.html",
	"./tipitaka/kn/snp/snp.1.02.than.html",
	"./tipitaka/kn/snp/snp.1.03.than.html",
	"./tipitaka/kn/snp/snp.1.04.olen.html",
	"./tipitaka/kn/snp/snp.1.04.piya.html",
	"./tipitaka/kn/snp/snp.1.04.than.html",
	"./tipitaka/kn/snp/snp.1.05.than.html",
	"./tipitaka/kn/snp/snp.1.06.nara.html",
	"./tipitaka/kn/snp/snp.1.06.piya.html",
	"./tipitaka/kn/snp/snp.1.07.piya.html",
	"./tipitaka/kn/snp/snp.1.08.amar.html",
	"./tipitaka/kn/snp/snp.1.08.budd.html",
	"./tipitaka/kn/snp/snp.1.08.nymo.html",
	"./tipitaka/kn/snp/snp.1.08.piya.html",
	"./tipitaka/kn/snp/snp.1.08.than.html",
	"./tipitaka/kn/snp/snp.1.10.piya.html",
	"./tipitaka/kn/snp/snp.1.10.than.html",
	"./tipitaka/kn/snp/snp.1.11.than.html",
	"./tipitaka/kn/snp/snp.1.12.than.html",
	"./tipitaka/kn/snp/snp.2.01.piya.html",
	"./tipitaka/kn/snp/snp.2.01.than.html",
	"./tipitaka/kn/snp/snp.2.03.irel.html",
	"./tipitaka/kn/snp/snp.2.03.than.html",
	"./tipitaka/kn/snp/snp.2.04.nara.html",
	"./tipitaka/kn/snp/snp.2.04.piya.html",
	"./tipitaka/kn/snp/snp.2.04.soni.html",
	"./tipitaka/kn/snp/snp.2.04.than.html",
	"./tipitaka/kn/snp/snp.2.06.irel.html",
	"./tipitaka/kn/snp/snp.2.08.irel.html",
	"./tipitaka/kn/snp/snp.2.08.than.html",
	"./tipitaka/kn/snp/snp.2.09.irel.html",
	"./tipitaka/kn/snp/snp.2.09.than.html",
	"./tipitaka/kn/snp/snp.2.10.irel.html",
	"./tipitaka/kn/snp/snp.2.10.than.html",
	"./tipitaka/kn/snp/snp.2.11.irel.html",
	"./tipitaka/kn/snp/snp.2.14.irel.html",
	"./tipitaka/kn/snp/snp.3.01.than.html",
	"./tipitaka/kn/snp/snp.3.02.irel.html",
	"./tipitaka/kn/snp/snp.3.02.than.html",
	"./tipitaka/kn/snp/snp.3.03.than.html",
	"./tipitaka/kn/snp/snp.3.08.irel.html",
	"./tipitaka/kn/snp/snp.3.08.than.html",
	"./tipitaka/kn/snp/snp.3.11.olen.html",
	"./tipitaka/kn/snp/snp.3.11.than.html",
	"./tipitaka/kn/snp/snp.3.12.irel.html",
	"./tipitaka/kn/snp/snp.3.12.olen.html",
	"./tipitaka/kn/snp/snp.3.12.than.html",
	"./tipitaka/kn/snp/snp.4.01.than.html",
	"./tipitaka/kn/snp/snp.4.02.than.html",
	"./tipitaka/kn/snp/snp.4.03.than.html",
	"./tipitaka/kn/snp/snp.4.04.irel.html",
	"./tipitaka/kn/snp/snp.4.04.than.html",
	"./tipitaka/kn/snp/snp.4.05.irel.html",
	"./tipitaka/kn/snp/snp.4.05.than.html",
	"./tipitaka/kn/snp/snp.4.06.irel.html",
	"./tipitaka/kn/snp/snp.4.06.than.html",
	"./tipitaka/kn/snp/snp.4.07.than.html",
	"./tipitaka/kn/snp/snp.4.08.than.html",
	"./tipitaka/kn/snp/snp.4.09.than.html",
	"./tipitaka/kn/snp/snp.4.10.than.html",
	"./tipitaka/kn/snp/snp.4.11.irel.html",
	"./tipitaka/kn/snp/snp.4.11.than.html",
	"./tipitaka/kn/snp/snp.4.12.than.html",
	"./tipitaka/kn/snp/snp.4.13.than.html",
	"./tipitaka/kn/snp/snp.4.14.than.html",
	"./tipitaka/kn/snp/snp.4.15.irel.html",
	"./tipitaka/kn/snp/snp.4.15.olen.html",
	"./tipitaka/kn/snp/snp.4.15.than.html",
	"./tipitaka/kn/snp/snp.4.16.than.html",
	"./tipitaka/kn/snp/snp.5.01.irel.html",
	"./tipitaka/kn/snp/snp.5.01.than.html",
	"./tipitaka/kn/snp/snp.5.02.than.html",
	"./tipitaka/kn/snp/snp.5.03.irel.html",
	"./tipitaka/kn/snp/snp.5.03.than.html",
	"./tipitaka/kn/snp/snp.5.04.irel.html",
	"./tipitaka/kn/snp/snp.5.04.than.html",
	"./tipitaka/kn/snp/snp.5.05.than.html",
	"./tipitaka/kn/snp/snp.5.06.than.html",
	"./tipitaka/kn/snp/snp.5.07.than.html",
	"./tipitaka/kn/snp/snp.5.08.than.html",
	"./tipitaka/kn/snp/snp.5.09.than.html",
	"./tipitaka/kn/snp/snp.5.10.than.html",
	"./tipitaka/kn/snp/snp.5.11.than.html",
	"./tipitaka/kn/snp/snp.5.12.than.html",
	"./tipitaka/kn/snp/snp.5.13.than.html",
	"./tipitaka/kn/snp/snp.5.14.than.html",
	"./tipitaka/kn/snp/snp.5.15.irel.html",
	"./tipitaka/kn/snp/snp.5.15.than.html",
	"./tipitaka/kn/snp/snp.5.16.irel.html",
	"./tipitaka/kn/snp/snp.5.16.than.html",
	"./tipitaka/kn/thag/thag.01.00x.hekh.html",
	"./tipitaka/kn/thag/thag.01.00x.than.html",
	"./tipitaka/kn/thag/thag.02.13.than.html",
	"./tipitaka/kn/thag/thag.02.13x.olen.html",
	"./tipitaka/kn/thag/thag.02.16.than.html",
	"./tipitaka/kn/thag/thag.02.24.than.html",
	"./tipitaka/kn/thag/thag.02.26.than.html",
	"./tipitaka/kn/thag/thag.02.27.than.html",
	"./tipitaka/kn/thag/thag.02.30.than.html",
	"./tipitaka/kn/thag/thag.02.37.than.html",
	"./tipitaka/kn/thag/thag.02.46.olen.html",
	"./tipitaka/kn/thag/thag.03.05.than.html",
	"./tipitaka/kn/thag/thag.03.08.than.html",
	"./tipitaka/kn/thag/thag.03.13.than.html",
	"./tipitaka/kn/thag/thag.03.14.than.html",
	"./tipitaka/kn/thag/thag.03.15.than.html",
	"./tipitaka/kn/thag/thag.04.08.than.html",
	"./tipitaka/kn/thag/thag.04.10.than.html",
	"./tipitaka/kn/thag/thag.05.01.than.html",
	"./tipitaka/kn/thag/thag.05.08.than.html",
	"./tipitaka/kn/thag/thag.05.09.norm.html",
	"./tipitaka/kn/thag/thag.05.10.than.html",
	"./tipitaka/kn/thag/thag.06.02.than.html",
	"./tipitaka/kn/thag/thag.06.06.than.html",
	"./tipitaka/kn/thag/thag.06.09.than.html",
	"./tipitaka/kn/thag/thag.06.10.than.html",
	"./tipitaka/kn/thag/thag.06.12.than.html",
	"./tipitaka/kn/thag/thag.06.13.olen.html",
	"./tipitaka/kn/thag/thag.06.13.than.html",
	"./tipitaka/kn/thag/thag.07.01.than.html",
	"./tipitaka/kn/thag/thag.08.01.bodh.html",
	"./tipitaka/kn/thag/thag.09.00x.olen.html",
	"./tipitaka/kn/thag/thag.10.01.olen.html",
	"./tipitaka/kn/thag/thag.10.02.olen.html",
	"./tipitaka/kn/thag/thag.10.02.than.html",
	"./tipitaka/kn/thag/thag.10.05.than.html",
	"./tipitaka/kn/thag/thag.11.01.than.html",
	"./tipitaka/kn/thag/thag.12.02.than.html",
	"./tipitaka/kn/thag/thag.14.01.than.html",
	"./tipitaka/kn/thag/thag.14.02.than.html",
	"./tipitaka/kn/thag/thag.15.01.olen.html",
	"./tipitaka/kn/thag/thag.15.02.olen.html",
	"./tipitaka/kn/thag/thag.16.01.than.html",
	"./tipitaka/kn/thag/thag.16.04.than.html",
	"./tipitaka/kn/thag/thag.16.07.than.html",
	"./tipitaka/kn/thag/thag.16.08.olen.html",
	"./tipitaka/kn/thag/thag.16.08.than.html",
	"./tipitaka/kn/thag/thag.17.02.olen.html",
	"./tipitaka/kn/thag/thag.17.03.hekh.html",
	"./tipitaka/kn/thag/thag.17.03.olen.html",
	"./tipitaka/kn/thag/thag.18.00.than.html",
	"./tipitaka/kn/thag/thag.18.00x.olen.html",
	"./tipitaka/kn/thag/thag.19.00.khan.html",
	"./tipitaka/kn/thag/thag.19.00x.olen.html",
	"./tipitaka/kn/thag/thag.21.00.irel.html",
	"./tipitaka/kn/thag/thag.21.00x.hekh.html",
	"./tipitaka/kn/thig/thig.01.00x.than.html",
	"./tipitaka/kn/thig/thig.02.03.than.html",
	"./tipitaka/kn/thig/thig.03.02.than.html",
	"./tipitaka/kn/thig/thig.03.04.rhyc.html",
	"./tipitaka/kn/thig/thig.03.04.than.html",
	"./tipitaka/kn/thig/thig.03.05.than.html",
	"./tipitaka/kn/thig/thig.04.01.hekh.html",
	"./tipitaka/kn/thig/thig.05.02.than.html",
	"./tipitaka/kn/thig/thig.05.04.hekh.html",
	"./tipitaka/kn/thig/thig.05.04.than.html",
	"./tipitaka/kn/thig/thig.05.06.than.html",
	"./tipitaka/kn/thig/thig.05.08.hekh.html",
	"./tipitaka/kn/thig/thig.05.08.than.html",
	"./tipitaka/kn/thig/thig.05.09.hekh.html",
	"./tipitaka/kn/thig/thig.05.10.hekh.html",
	"./tipitaka/kn/thig/thig.05.10.than.html",
	"./tipitaka/kn/thig/thig.05.11.hekh.html",
	"./tipitaka/kn/thig/thig.05.11.than.html",
	"./tipitaka/kn/thig/thig.05.12.than.html",
	"./tipitaka/kn/thig/thig.06.01.olen.html",
	"./tipitaka/kn/thig/thig.06.01.than.html",
	"./tipitaka/kn/thig/thig.06.02.than.html",
	"./tipitaka/kn/thig/thig.06.04.hekh.html",
	"./tipitaka/kn/thig/thig.06.05.than.html",
	"./tipitaka/kn/thig/thig.06.06.olen.html",
	"./tipitaka/kn/thig/thig.06.07.than.html",
	"./tipitaka/kn/thig/thig.10.01.hekh.html",
	"./tipitaka/kn/thig/thig.10.01.than.html",
	"./tipitaka/kn/thig/thig.12.01.than.html",
	"./tipitaka/kn/thig/thig.13.01.than.html",
	"./tipitaka/kn/thig/thig.13.02.than.html",
	"./tipitaka/kn/thig/thig.13.05.than.html",
	"./tipitaka/kn/thig/thig.14.01.than.html",
	"./tipitaka/kn/ud/ud.1.01.irel.html",
	"./tipitaka/kn/ud/ud.1.01.than.html",
	"./tipitaka/kn/ud/ud.1.02.irel.html",
	"./tipitaka/kn/ud/ud.1.02.than.html",
	"./tipitaka/kn/ud/ud.1.03.irel.html",
	"./tipitaka/kn/ud/ud.1.03.than.html",
	"./tipitaka/kn/ud/ud.1.04.than.html",
	"./tipitaka/kn/ud/ud.1.05.than.html",
	"./tipitaka/kn/ud/ud.1.06.than.html",
	"./tipitaka/kn/ud/ud.1.07.than.html",
	"./tipitaka/kn/ud/ud.1.08.than.html",
	"./tipitaka/kn/ud/ud.1.09.than.html",
	"./tipitaka/kn/ud/ud.1.10.irel.html",
	"./tipitaka/kn/ud/ud.1.10.than.html",
	"./tipitaka/kn/ud/ud.2.01.irel.html",
	"./tipitaka/kn/ud/ud.2.01.than.html",
	"./tipitaka/kn/ud/ud.2.02.than.html",
	"./tipitaka/kn/ud/ud.2.03.than.html",
	"./tipitaka/kn/ud/ud.2.04.than.html",
	"./tipitaka/kn/ud/ud.2.05.than.html",
	"./tipitaka/kn/ud/ud.2.06.than.html",
	"./tipitaka/kn/ud/ud.2.07.than.html",
	"./tipitaka/kn/ud/ud.2.08.than.html",
	"./tipitaka/kn/ud/ud.2.09.than.html",
	"./tipitaka/kn/ud/ud.2.10.irel.html",
	"./tipitaka/kn/ud/ud.2.10.than.html",
	"./tipitaka/kn/ud/ud.3.01.irel.html",
	"./tipitaka/kn/ud/ud.3.01.than.html",
	"./tipitaka/kn/ud/ud.3.02.irel.html",
	"./tipitaka/kn/ud/ud.3.02.than.html",
	"./tipitaka/kn/ud/ud.3.03.than.html",
	"./tipitaka/kn/ud/ud.3.04.than.html",
	"./tipitaka/kn/ud/ud.3.05.than.html",
	"./tipitaka/kn/ud/ud.3.06.than.html",
	"./tipitaka/kn/ud/ud.3.07.than.html",
	"./tipitaka/kn/ud/ud.3.08.than.html",
	"./tipitaka/kn/ud/ud.3.09.than.html",
	"./tipitaka/kn/ud/ud.3.10.than.html",
	"./tipitaka/kn/ud/ud.4.01.irel.html",
	"./tipitaka/kn/ud/ud.4.01.than.html",
	"./tipitaka/kn/ud/ud.4.02.than.html",
	"./tipitaka/kn/ud/ud.4.03.than.html",
	"./tipitaka/kn/ud/ud.4.04.than.html",
	"./tipitaka/kn/ud/ud.4.05.irel.html",
	"./tipitaka/kn/ud/ud.4.05.than.html",
	"./tipitaka/kn/ud/ud.4.06.than.html",
	"./tipitaka/kn/ud/ud.4.07.than.html",
	"./tipitaka/kn/ud/ud.4.08.than.html",
	"./tipitaka/kn/ud/ud.4.09.than.html",
	"./tipitaka/kn/ud/ud.4.10.than.html",
	"./tipitaka/kn/ud/ud.5.01.than.html",
	"./tipitaka/kn/ud/ud.5.02.than.html",
	"./tipitaka/kn/ud/ud.5.03.than.html",
	"./tipitaka/kn/ud/ud.5.04.than.html",
	"./tipitaka/kn/ud/ud.5.05.irel.html",
	"./tipitaka/kn/ud/ud.5.05.than.html",
	"./tipitaka/kn/ud/ud.5.06.than.html",
	"./tipitaka/kn/ud/ud.5.07.than.html",
	"./tipitaka/kn/ud/ud.5.08.than.html",
	"./tipitaka/kn/ud/ud.5.09.than.html",
	"./tipitaka/kn/ud/ud.5.10.than.html",
	"./tipitaka/kn/ud/ud.6.01.than.html",
	"./tipitaka/kn/ud/ud.6.02.than.html",
	"./tipitaka/kn/ud/ud.6.03.than.html",
	"./tipitaka/kn/ud/ud.6.04.irel.html",
	"./tipitaka/kn/ud/ud.6.04.than.html",
	"./tipitaka/kn/ud/ud.6.05.than.html",
	"./tipitaka/kn/ud/ud.6.06.than.html",
	"./tipitaka/kn/ud/ud.6.07.than.html",
	"./tipitaka/kn/ud/ud.6.08.than.html",
	"./tipitaka/kn/ud/ud.6.09.olen.html",
	"./tipitaka/kn/ud/ud.6.09.than.html",
	"./tipitaka/kn/ud/ud.6.10.than.html",
	"./tipitaka/kn/ud/ud.7.01.than.html",
	"./tipitaka/kn/ud/ud.7.02.than.html",
	"./tipitaka/kn/ud/ud.7.03.than.html",
	"./tipitaka/kn/ud/ud.7.04.than.html",
	"./tipitaka/kn/ud/ud.7.05.niza.html",
	"./tipitaka/kn/ud/ud.7.05.than.html",
	"./tipitaka/kn/ud/ud.7.06.than.html",
	"./tipitaka/kn/ud/ud.7.07.than.html",
	"./tipitaka/kn/ud/ud.7.08.than.html",
	"./tipitaka/kn/ud/ud.7.09.irel.html",
	"./tipitaka/kn/ud/ud.7.09.than.html",
	"./tipitaka/kn/ud/ud.7.10.than.html",
	"./tipitaka/kn/ud/ud.8.01.irel.html",
	"./tipitaka/kn/ud/ud.8.01.than.html",
	"./tipitaka/kn/ud/ud.8.02.irel.html",
	"./tipitaka/kn/ud/ud.8.02.than.html",
	"./tipitaka/kn/ud/ud.8.03.irel.html",
	"./tipitaka/kn/ud/ud.8.03.than.html",
	"./tipitaka/kn/ud/ud.8.04.irel.html",
	"./tipitaka/kn/ud/ud.8.04.than.html",
	"./tipitaka/kn/ud/ud.8.05.than.html",
	"./tipitaka/kn/ud/ud.8.06.than.html",
	"./tipitaka/kn/ud/ud.8.07.than.html",
	"./tipitaka/kn/ud/ud.8.08.than.html",
	"./tipitaka/kn/ud/ud.8.09.than.html",
	"./tipitaka/kn/ud/ud.8.10.than.html",
	"./tipitaka/kn/vv/vv.1.16.irel.html",
	"./tipitaka/kn/vv/vv.3.07.irel.html",
	"./tipitaka/mn/Majjhima_Index.html",
	"./tipitaka/mn/mn.001.than.html",
	"./tipitaka/mn/mn.002.bpit.html",
	"./tipitaka/mn/mn.002.than.html",
	"./tipitaka/mn/mn.004.than.html",
	"./tipitaka/mn/mn.007.nypo.html",
	"./tipitaka/mn/mn.008.nypo.html",
	"./tipitaka/mn/mn.009.ntbb.html",
	"./tipitaka/mn/mn.009.than.html",
	"./tipitaka/mn/mn.010.nysa.html",
	"./tipitaka/mn/mn.010.soma.html",
	"./tipitaka/mn/mn.010.than.html",
	"./tipitaka/mn/mn.011.ntbb.html",
	"./tipitaka/mn/mn.012.ntbb.html",
	"./tipitaka/mn/mn.013.than.html",
	"./tipitaka/mn/mn.014.than.html",
	"./tipitaka/mn/mn.018.than.html",
	"./tipitaka/mn/mn.019.than.html",
	"./tipitaka/mn/mn.020.soma.html",
	"./tipitaka/mn/mn.020.than.html",
	"./tipitaka/mn/mn.021x.budd.html",
	"./tipitaka/mn/mn.021x.than.html",
	"./tipitaka/mn/mn.022.nypo.html",
	"./tipitaka/mn/mn.022.than.html",
	"./tipitaka/mn/mn.024.than.html",
	"./tipitaka/mn/mn.026.than.html",
	"./tipitaka/mn/mn.027.than.html",
	"./tipitaka/mn/mn.028.than.html",
	"./tipitaka/mn/mn.029.than.html",
	"./tipitaka/mn/mn.030.than.html",
	"./tipitaka/mn/mn.033.than.html",
	"./tipitaka/mn/mn.034x.olen.html",
	"./tipitaka/mn/mn.035.than.html",
	"./tipitaka/mn/mn.036.than.html",
	"./tipitaka/mn/mn.038.than.html",
	"./tipitaka/mn/mn.039.than.html",
	"./tipitaka/mn/mn.041.nymo.html",
	"./tipitaka/mn/mn.041.than.html",
	"./tipitaka/mn/mn.043.than.html",
	"./tipitaka/mn/mn.044.than.html",
	"./tipitaka/mn/mn.045.than.html",
	"./tipitaka/mn/mn.049.than.html",
	"./tipitaka/mn/mn.052.than.html",
	"./tipitaka/mn/mn.053.than.html",
	"./tipitaka/mn/mn.054x.than.html",
	"./tipitaka/mn/mn.057.nymo.html",
	"./tipitaka/mn/mn.058.than.html",
	"./tipitaka/mn/mn.059.nypo.html",
	"./tipitaka/mn/mn.059.than.html",
	"./tipitaka/mn/mn.060.than.html",
	"./tipitaka/mn/mn.061.than.html",
	"./tipitaka/mn/mn.062.than.html",
	"./tipitaka/mn/mn.063.than.html",
	"./tipitaka/mn/mn.066.than.html",
	"./tipitaka/mn/mn.070.than.html",
	"./tipitaka/mn/mn.072.than.html",
	"./tipitaka/mn/mn.074.than.html",
	"./tipitaka/mn/mn.075x.than.html",
	"./tipitaka/mn/mn.078.than.html",
	"./tipitaka/mn/mn.082.than.html",
	"./tipitaka/mn/mn.086.than.html",
	"./tipitaka/mn/mn.087.than.html",
	"./tipitaka/mn/mn.090.than.html",
	"./tipitaka/mn/mn.093.than.html",
	"./tipitaka/mn/mn.095x.nymo.html",
	"./tipitaka/mn/mn.095x.than.html",
	"./tipitaka/mn/mn.097.than.html",
	"./tipitaka/mn/mn.101.than.html",
	"./tipitaka/mn/mn.105.than.html",
	"./tipitaka/mn/mn.106.than.html",
	"./tipitaka/mn/mn.107.horn.html",
	"./tipitaka/mn/mn.108.than.html",
	"./tipitaka/mn/mn.109.than.html",
	"./tipitaka/mn/mn.110.than.html",
	"./tipitaka/mn/mn.111.than.html",
	"./tipitaka/mn/mn.113.than.html",
	"./tipitaka/mn/mn.116.piya.html",
	"./tipitaka/mn/mn.117.than.html",
	"./tipitaka/mn/mn.118.than.html",
	"./tipitaka/mn/mn.119.than.html",
	"./tipitaka/mn/mn.121.than.html",
	"./tipitaka/mn/mn.122.than.html",
	"./tipitaka/mn/mn.125.horn.html",
	"./tipitaka/mn/mn.126.than.html",
	"./tipitaka/mn/mn.130.than.html",
	"./tipitaka/mn/mn.131.nana.html",
	"./tipitaka/mn/mn.131.than.html",
	"./tipitaka/mn/mn.135.nymo.html",
	"./tipitaka/mn/mn.135.than.html",
	"./tipitaka/mn/mn.136.nymo.html",
	"./tipitaka/mn/mn.136.than.html",
	"./tipitaka/mn/mn.137.than.html",
	"./tipitaka/mn/mn.138.than.html",
	"./tipitaka/mn/mn.140.than.html",
	"./tipitaka/mn/mn.141.piya.html",
	"./tipitaka/mn/mn.141.than.html",
	"./tipitaka/mn/mn.143.than.html",
	"./tipitaka/mn/mn.143x.olen.html",
	"./tipitaka/mn/mn.146.than.html",
	"./tipitaka/mn/mn.147.than.html",
	"./tipitaka/mn/mn.148.than.html",
	"./tipitaka/mn/mn.149.than.html",
	"./tipitaka/mn/mn.152.than.html",
	"./tipitaka/sn/sn01/sn01.001.than.html",
	"./tipitaka/sn/sn01/sn01.003.wlsh.html",
	"./tipitaka/sn/sn01/sn01.009.wlsh.html",
	"./tipitaka/sn/sn01/sn01.010.irel.html",
	"./tipitaka/sn/sn01/sn01.010.olen.html",
	"./tipitaka/sn/sn01/sn01.010.than.html",
	"./tipitaka/sn/sn01/sn01.017.wlsh.html",
	"./tipitaka/sn/sn01/sn01.018.than.html",
	"./tipitaka/sn/sn01/sn01.020.than.html",
	"./tipitaka/sn/sn01/sn01.020.wlsh.html",
	"./tipitaka/sn/sn01/sn01.025.wlsh.html",
	"./tipitaka/sn/sn01/sn01.038.than.html",
	"./tipitaka/sn/sn01/sn01.041.than.html",
	"./tipitaka/sn/sn01/sn01.042.than.html",
	"./tipitaka/sn/sn01/sn01.069.than.html",
	"./tipitaka/sn/sn01/sn01.071.than.html",
	"./tipitaka/sn/sn02/sn02.006.olen.html",
	"./tipitaka/sn/sn02/sn02.007.than.html",
	"./tipitaka/sn/sn02/sn02.008.wlsh.html",
	"./tipitaka/sn/sn02/sn02.009.piya.html",
	"./tipitaka/sn/sn02/sn02.010.piya.html",
	"./tipitaka/sn/sn02/sn02.019.than.html",
	"./tipitaka/sn/sn02/sn02.025.wlsh.html",
	"./tipitaka/sn/sn02/sn02.026.than.html",
	"./tipitaka/sn/sn03/sn03.001.than.html",
	"./tipitaka/sn/sn03/sn03.004.than.html",
	"./tipitaka/sn/sn03/sn03.005.than.html",
	"./tipitaka/sn/sn03/sn03.006.than.html",
	"./tipitaka/sn/sn03/sn03.007.than.html",
	"./tipitaka/sn/sn03/sn03.008.wlsh.html",
	"./tipitaka/sn/sn03/sn03.013.olen.html",
	"./tipitaka/sn/sn03/sn03.013.wlsh.html",
	"./tipitaka/sn/sn03/sn03.014.than.html",
	"./tipitaka/sn/sn03/sn03.015.than.html",
	"./tipitaka/sn/sn03/sn03.017.than.html",
	"./tipitaka/sn/sn03/sn03.019.than.html",
	"./tipitaka/sn/sn03/sn03.020.than.html",
	"./tipitaka/sn/sn03/sn03.023.than.html",
	"./tipitaka/sn/sn03/sn03.024.than.html",
	"./tipitaka/sn/sn03/sn03.025.olen.html",
	"./tipitaka/sn/sn03/sn03.025.than.html",
	"./tipitaka/sn/sn04/sn04.008.than.html",
	"./tipitaka/sn/sn04/sn04.013.than.html",
	"./tipitaka/sn/sn04/sn04.019.than.html",
	"./tipitaka/sn/sn04/sn04.020.than.html",
	"./tipitaka/sn/sn05/sn05.001.bodh.html",
	"./tipitaka/sn/sn05/sn05.001.than.html",
	"./tipitaka/sn/sn05/sn05.002.bodh.html",
	"./tipitaka/sn/sn05/sn05.002.olen.html",
	"./tipitaka/sn/sn05/sn05.002.than.html",
	"./tipitaka/sn/sn05/sn05.003.bodh.html",
	"./tipitaka/sn/sn05/sn05.003.than.html",
	"./tipitaka/sn/sn05/sn05.004.bodh.html",
	"./tipitaka/sn/sn05/sn05.004.than.html",
	"./tipitaka/sn/sn05/sn05.005.bodh.html",
	"./tipitaka/sn/sn05/sn05.005.than.html",
	"./tipitaka/sn/sn05/sn05.006.bodh.html",
	"./tipitaka/sn/sn05/sn05.006.than.html",
	"./tipitaka/sn/sn05/sn05.007.bodh.html",
	"./tipitaka/sn/sn05/sn05.007.than.html",
	"./tipitaka/sn/sn05/sn05.008.bodh.html",
	"./tipitaka/sn/sn05/sn05.008.than.html",
	"./tipitaka/sn/sn05/sn05.009.bodh.html",
	"./tipitaka/sn/sn05/sn05.009.than.html",
	"./tipitaka/sn/sn05/sn05.010.bodh.html",
	"./tipitaka/sn/sn05/sn05.010.than.html",
	"./tipitaka/sn/sn06/sn06.001.than.html",
	"./tipitaka/sn/sn06/sn06.002.than.html",
	"./tipitaka/sn/sn06/sn06.013.olen.html",
	"./tipitaka/sn/sn06/sn06.015.than.html",
	"./tipitaka/sn/sn07/sn07.001.wlsh.html",
	"./tipitaka/sn/sn07/sn07.002.budd.html",
	"./tipitaka/sn/sn07/sn07.002.than.html",
	"./tipitaka/sn/sn07/sn07.002.wlsh.html",
	"./tipitaka/sn/sn07/sn07.006.than.html",
	"./tipitaka/sn/sn07/sn07.011.piya.html",
	"./tipitaka/sn/sn07/sn07.011.than.html",
	"./tipitaka/sn/sn07/sn07.012.olen.html",
	"./tipitaka/sn/sn07/sn07.014.than.html",
	"./tipitaka/sn/sn07/sn07.017.than.html",
	"./tipitaka/sn/sn07/sn07.018.olen.html",
	"./tipitaka/sn/sn07/sn07.018.than.html",
	"./tipitaka/sn/sn07/sn07.021.wlsh.html",
	"./tipitaka/sn/sn08/sn08.004.than.html",
	"./tipitaka/sn/sn09/sn09.001.than.html",
	"./tipitaka/sn/sn09/sn09.006.than.html",
	"./tipitaka/sn/sn09/sn09.009.than.html",
	"./tipitaka/sn/sn09/sn09.011.than.html",
	"./tipitaka/sn/sn09/sn09.014.olen.html",
	"./tipitaka/sn/sn09/sn09.014.than.html",
	"./tipitaka/sn/sn10/sn10.008.than.html",
	"./tipitaka/sn/sn10/sn10.012.piya.html",
	"./tipitaka/sn/sn10/sn10.012.than.html",
	"./tipitaka/sn/sn11/sn11.003.piya.html",
	"./tipitaka/sn/sn11/sn11.003.than.html",
	"./tipitaka/sn/sn11/sn11.004.olen.html",
	"./tipitaka/sn/sn11/sn11.005.than.html",
	"./tipitaka/sn/sn12/sn12.002.than.html",
	"./tipitaka/sn/sn12/sn12.010.wlsh.html",
	"./tipitaka/sn/sn12/sn12.011.nypo.html",
	"./tipitaka/sn/sn12/sn12.011.than.html",
	"./tipitaka/sn/sn12/sn12.012.nypo.html",
	"./tipitaka/sn/sn12/sn12.012.than.html",
	"./tipitaka/sn/sn12/sn12.015.than.html",
	"./tipitaka/sn/sn12/sn12.015.wlsh.html",
	"./tipitaka/sn/sn12/sn12.016.wlsh.html",
	"./tipitaka/sn/sn12/sn12.017.than.html",
	"./tipitaka/sn/sn12/sn12.017x.wlsh.html",
	"./tipitaka/sn/sn12/sn12.019.than.html",
	"./tipitaka/sn/sn12/sn12.020.than.html",
	"./tipitaka/sn/sn12/sn12.022x.wlsh.html",
	"./tipitaka/sn/sn12/sn12.023.bodh.html",
	"./tipitaka/sn/sn12/sn12.023.than.html",
	"./tipitaka/sn/sn12/sn12.023x.wlsh.html",
	"./tipitaka/sn/sn12/sn12.025.than.html",
	"./tipitaka/sn/sn12/sn12.031.than.html",
	"./tipitaka/sn/sn12/sn12.031x.nypo.html",
	"./tipitaka/sn/sn12/sn12.035.than.html",
	"./tipitaka/sn/sn12/sn12.038.than.html",
	"./tipitaka/sn/sn12/sn12.038.wlsh.html",
	"./tipitaka/sn/sn12/sn12.044.than.html",
	"./tipitaka/sn/sn12/sn12.046.than.html",
	"./tipitaka/sn/sn12/sn12.048.than.html",
	"./tipitaka/sn/sn12/sn12.052.than.html",
	"./tipitaka/sn/sn12/sn12.060x.wlsh.html",
	"./tipitaka/sn/sn12/sn12.061.niza.html",
	"./tipitaka/sn/sn12/sn12.061.than.html",
	"./tipitaka/sn/sn12/sn12.063.nypo.html",
	"./tipitaka/sn/sn12/sn12.063.than.html",
	"./tipitaka/sn/sn12/sn12.064.nypo.html",
	"./tipitaka/sn/sn12/sn12.064.than.html",
	"./tipitaka/sn/sn12/sn12.065.than.html",
	"./tipitaka/sn/sn12/sn12.067.than.html",
	"./tipitaka/sn/sn12/sn12.068.than.html",
	"./tipitaka/sn/sn12/sn12.070.than.html",
	"./tipitaka/sn/sn13/sn13.001.than.html",
	"./tipitaka/sn/sn13/sn13.002.than.html",
	"./tipitaka/sn/sn13/sn13.008.than.html",
	"./tipitaka/sn/sn14/sn14.011.than.html",
	"./tipitaka/sn/sn15/sn15.003.than.html",
	"./tipitaka/sn/sn15/sn15.009.than.html",
	"./tipitaka/sn/sn15/sn15.011.than.html",
	"./tipitaka/sn/sn15/sn15.012.than.html",
	"./tipitaka/sn/sn15/sn15.013.than.html",
	"./tipitaka/sn/sn15/sn15.014.than.html",
	"./tipitaka/sn/sn16/sn16.001.wlsh.html",
	"./tipitaka/sn/sn16/sn16.002.wlsh.html",
	"./tipitaka/sn/sn16/sn16.005.than.html",
	"./tipitaka/sn/sn16/sn16.013.than.html",
	"./tipitaka/sn/sn16/sn16.013.wlsh.html",
	"./tipitaka/sn/sn17/sn17.003.than.html",
	"./tipitaka/sn/sn17/sn17.005.than.html",
	"./tipitaka/sn/sn17/sn17.005.wlsh.html",
	"./tipitaka/sn/sn17/sn17.008.than.html",
	"./tipitaka/sn/sn20/sn20.002.than.html",
	"./tipitaka/sn/sn20/sn20.004.than.html",
	"./tipitaka/sn/sn20/sn20.005.than.html",
	"./tipitaka/sn/sn20/sn20.006.than.html",
	"./tipitaka/sn/sn20/sn20.007.than.html",
	"./tipitaka/sn/sn21/sn21.001.than.html",
	"./tipitaka/sn/sn21/sn21.002.than.html",
	"./tipitaka/sn/sn21/sn21.006.niza.html",
	"./tipitaka/sn/sn21/sn21.008.wlsh.html",
	"./tipitaka/sn/sn21/sn21.010.than.html",
	"./tipitaka/sn/sn22/sn22.001.than.html",
	"./tipitaka/sn/sn22/sn22.002.than.html",
	"./tipitaka/sn/sn22/sn22.003.than.html",
	"./tipitaka/sn/sn22/sn22.005.than.html",
	"./tipitaka/sn/sn22/sn22.007.wlsh.html",
	"./tipitaka/sn/sn22/sn22.022.niza.html",
	"./tipitaka/sn/sn22/sn22.022.than.html",
	"./tipitaka/sn/sn22/sn22.022.wlsh.html",
	"./tipitaka/sn/sn22/sn22.023.than.html",
	"./tipitaka/sn/sn22/sn22.036.than.html",
	"./tipitaka/sn/sn22/sn22.039.than.html",
	"./tipitaka/sn/sn22/sn22.040.than.html",
	"./tipitaka/sn/sn22/sn22.041.than.html",
	"./tipitaka/sn/sn22/sn22.042.than.html",
	"./tipitaka/sn/sn22/sn22.043.wlsh.html",
	"./tipitaka/sn/sn22/sn22.047.than.html",
	"./tipitaka/sn/sn22/sn22.047.wlsh.html",
	"./tipitaka/sn/sn22/sn22.048.than.html",
	"./tipitaka/sn/sn22/sn22.049.wlsh.html",
	"./tipitaka/sn/sn22/sn22.053.than.html",
	"./tipitaka/sn/sn22/sn22.054.than.html",
	"./tipitaka/sn/sn22/sn22.055.than.html",
	"./tipitaka/sn/sn22/sn22.056.than.html",
	"./tipitaka/sn/sn22/sn22.057.than.html",
	"./tipitaka/sn/sn22/sn22.058.than.html",
	"./tipitaka/sn/sn22/sn22.059.mend.html",
	"./tipitaka/sn/sn22/sn22.059.nymo.html",
	"./tipitaka/sn/sn22/sn22.059.than.html",
	"./tipitaka/sn/sn22/sn22.060.than.html",
	"./tipitaka/sn/sn22/sn22.063.wlsh.html",
	"./tipitaka/sn/sn22/sn22.079.than.html",
	"./tipitaka/sn/sn22/sn22.080.than.html",
	"./tipitaka/sn/sn22/sn22.080.wlsh.html",
	"./tipitaka/sn/sn22/sn22.081.than.html",
	"./tipitaka/sn/sn22/sn22.083.than.html",
	"./tipitaka/sn/sn22/sn22.084.than.html",
	"./tipitaka/sn/sn22/sn22.084x.wlsh.html",
	"./tipitaka/sn/sn22/sn22.085.than.html",
	"./tipitaka/sn/sn22/sn22.086.than.html",
	"./tipitaka/sn/sn22/sn22.086.wlsh.html",
	"./tipitaka/sn/sn22/sn22.087x.wlsh.html",
	"./tipitaka/sn/sn22/sn22.089.than.html",
	"./tipitaka/sn/sn22/sn22.089x.wlsh.html",
	"./tipitaka/sn/sn22/sn22.090.than.html",
	"./tipitaka/sn/sn22/sn22.093.than.html",
	"./tipitaka/sn/sn22/sn22.095.than.html",
	"./tipitaka/sn/sn22/sn22.097.than.html",
	"./tipitaka/sn/sn22/sn22.099.than.html",
	"./tipitaka/sn/sn22/sn22.100.than.html",
	"./tipitaka/sn/sn22/sn22.101.than.html",
	"./tipitaka/sn/sn22/sn22.109.wlsh.html",
	"./tipitaka/sn/sn22/sn22.110.wlsh.html",
	"./tipitaka/sn/sn22/sn22.121.than.html",
	"./tipitaka/sn/sn22/sn22.122.than.html",
	"./tipitaka/sn/sn23/sn23.002.than.html",
	"./tipitaka/sn/sn25/sn25.001.than.html",
	"./tipitaka/sn/sn25/sn25.002.than.html",
	"./tipitaka/sn/sn25/sn25.003.than.html",
	"./tipitaka/sn/sn25/sn25.004.than.html",
	"./tipitaka/sn/sn25/sn25.005.than.html",
	"./tipitaka/sn/sn25/sn25.006.than.html",
	"./tipitaka/sn/sn25/sn25.007.than.html",
	"./tipitaka/sn/sn25/sn25.008.than.html",
	"./tipitaka/sn/sn25/sn25.009.than.html",
	"./tipitaka/sn/sn25/sn25.010.than.html",
	"./tipitaka/sn/sn27/sn27.001-010.than.html",
	"./tipitaka/sn/sn35/sn35.023.than.html",
	"./tipitaka/sn/sn35/sn35.024.than.html",
	"./tipitaka/sn/sn35/sn35.028.nymo.html",
	"./tipitaka/sn/sn35/sn35.028.than.html",
	"./tipitaka/sn/sn35/sn35.063.than.html",
	"./tipitaka/sn/sn35/sn35.063.wlsh.html",
	"./tipitaka/sn/sn35/sn35.069.than.html",
	"./tipitaka/sn/sn35/sn35.074.than.html",
	"./tipitaka/sn/sn35/sn35.075.than.html",
	"./tipitaka/sn/sn35/sn35.080.than.html",
	"./tipitaka/sn/sn35/sn35.082.than.html",
	"./tipitaka/sn/sn35/sn35.085.than.html",
	"./tipitaka/sn/sn35/sn35.088.than.html",
	"./tipitaka/sn/sn35/sn35.093.than.html",
	"./tipitaka/sn/sn35/sn35.095.than.html",
	"./tipitaka/sn/sn35/sn35.095.wlsh.html",
	"./tipitaka/sn/sn35/sn35.097.than.html",
	"./tipitaka/sn/sn35/sn35.099.than.html",
	"./tipitaka/sn/sn35/sn35.101.than.html",
	"./tipitaka/sn/sn35/sn35.115.than.html",
	"./tipitaka/sn/sn35/sn35.120.wlsh.html",
	"./tipitaka/sn/sn35/sn35.127.than.html",
	"./tipitaka/sn/sn35/sn35.127.wlsh.html",
	"./tipitaka/sn/sn35/sn35.132.wlsh.html",
	"./tipitaka/sn/sn35/sn35.133.wlsh.html",
	"./tipitaka/sn/sn35/sn35.135.than.html",
	"./tipitaka/sn/sn35/sn35.145.than.html",
	"./tipitaka/sn/sn35/sn35.145.wlsh.html",
	"./tipitaka/sn/sn35/sn35.152.wlsh.html",
	"./tipitaka/sn/sn35/sn35.153.than.html",
	"./tipitaka/sn/sn35/sn35.187.wlsh.html",
	"./tipitaka/sn/sn35/sn35.189.than.html",
	"./tipitaka/sn/sn35/sn35.191.than.html",
	"./tipitaka/sn/sn35/sn35.191.wlsh.html",
	"./tipitaka/sn/sn35/sn35.193.than.html",
	"./tipitaka/sn/sn35/sn35.197.than.html",
	"./tipitaka/sn/sn35/sn35.199.than.html",
	"./tipitaka/sn/sn35/sn35.200.than.html",
	"./tipitaka/sn/sn35/sn35.202.than.html",
	"./tipitaka/sn/sn35/sn35.203x.wlsh.html",
	"./tipitaka/sn/sn35/sn35.204.than.html",
	"./tipitaka/sn/sn35/sn35.204.wlsh.html",
	"./tipitaka/sn/sn35/sn35.205.than.html",
	"./tipitaka/sn/sn35/sn35.205x.wlsh.html",
	"./tipitaka/sn/sn35/sn35.206.than.html",
	"./tipitaka/sn/sn35/sn35.206x.wlsh.html",
	"./tipitaka/sn/sn35/sn35.207.than.html",
	"./tipitaka/sn/sn36/sn36.001.nypo.html",
	"./tipitaka/sn/sn36/sn36.002.nypo.html",
	"./tipitaka/sn/sn36/sn36.003.nypo.html",
	"./tipitaka/sn/sn36/sn36.004.nypo.html",
	"./tipitaka/sn/sn36/sn36.004.than.html",
	"./tipitaka/sn/sn36/sn36.005.nypo.html",
	"./tipitaka/sn/sn36/sn36.006.nypo.html",
	"./tipitaka/sn/sn36/sn36.006.than.html",
	"./tipitaka/sn/sn36/sn36.007.nypo.html",
	"./tipitaka/sn/sn36/sn36.007.than.html",
	"./tipitaka/sn/sn36/sn36.008.nypo.html",
	"./tipitaka/sn/sn36/sn36.009.nypo.html",
	"./tipitaka/sn/sn36/sn36.010.nypo.html",
	"./tipitaka/sn/sn36/sn36.011.nypo.html",
	"./tipitaka/sn/sn36/sn36.011.than.html",
	"./tipitaka/sn/sn36/sn36.012.nypo.html",
	"./tipitaka/sn/sn36/sn36.014.nypo.html",
	"./tipitaka/sn/sn36/sn36.015.nypo.html",
	"./tipitaka/sn/sn36/sn36.019.nypo.html",
	"./tipitaka/sn/sn36/sn36.019.than.html",
	"./tipitaka/sn/sn36/sn36.021.nypo.html",
	"./tipitaka/sn/sn36/sn36.021.than.html",
	"./tipitaka/sn/sn36/sn36.022.nypo.html",
	"./tipitaka/sn/sn36/sn36.022.than.html",
	"./tipitaka/sn/sn36/sn36.023.than.html",
	"./tipitaka/sn/sn36/sn36.031.nypo.html",
	"./tipitaka/sn/sn36/sn36.031.than.html",
	"./tipitaka/sn/sn37/sn37.034.than.html",
	"./tipitaka/sn/sn38/sn38.014.than.html",
	"./tipitaka/sn/sn40/sn40.009.wlsh.html",
	"./tipitaka/sn/sn41/sn41.003.than.html",
	"./tipitaka/sn/sn41/sn41.004.than.html",
	"./tipitaka/sn/sn41/sn41.005.niza.html",
	"./tipitaka/sn/sn41/sn41.006.than.html",
	"./tipitaka/sn/sn41/sn41.007.than.html",
	"./tipitaka/sn/sn41/sn41.010.than.html",
	"./tipitaka/sn/sn41/sn41.010.wlsh.html",
	"./tipitaka/sn/sn42/sn42.002.than.html",
	"./tipitaka/sn/sn42/sn42.003.than.html",
	"./tipitaka/sn/sn42/sn42.006.than.html",
	"./tipitaka/sn/sn42/sn42.007.wlsh.html",
	"./tipitaka/sn/sn42/sn42.008.than.html",
	"./tipitaka/sn/sn42/sn42.009.than.html",
	"./tipitaka/sn/sn42/sn42.010.than.html",
	"./tipitaka/sn/sn42/sn42.011.than.html",
	"./tipitaka/sn/sn44/sn44.001.than.html",
	"./tipitaka/sn/sn44/sn44.002.than.html",
	"./tipitaka/sn/sn44/sn44.003.than.html",
	"./tipitaka/sn/sn44/sn44.004.than.html",
	"./tipitaka/sn/sn44/sn44.005.than.html",
	"./tipitaka/sn/sn44/sn44.006.than.html",
	"./tipitaka/sn/sn44/sn44.007.than.html",
	"./tipitaka/sn/sn44/sn44.008.than.html",
	"./tipitaka/sn/sn44/sn44.009.than.html",
	"./tipitaka/sn/sn44/sn44.010.than.html",
	"./tipitaka/sn/sn44/sn44.011.than.html",
	"./tipitaka/sn/sn44/sn44.intro.than.html",
	"./tipitaka/sn/sn45/sn45.001.than.html",
	"./tipitaka/sn/sn45/sn45.002.than.html",
	"./tipitaka/sn/sn45/sn45.008.than.html",
	"./tipitaka/sn/sn45/sn45.159.wlsh.html",
	"./tipitaka/sn/sn45/sn45.165.wlsh.html",
	"./tipitaka/sn/sn45/sn45.171.than.html",
	"./tipitaka/sn/sn46/sn46.001.than.html",
	"./tipitaka/sn/sn46/sn46.014.piya.html",
	"./tipitaka/sn/sn46/sn46.014.than.html",
	"./tipitaka/sn/sn46/sn46.016.piya.html",
	"./tipitaka/sn/sn46/sn46.051.than.html",
	"./tipitaka/sn/sn46/sn46.053.than.html",
	"./tipitaka/sn/sn46/sn46.053.wlsh.html",
	"./tipitaka/sn/sn46/sn46.054.than.html",
	"./tipitaka/sn/sn46/sn46.054x.wlsh.html",
	"./tipitaka/sn/sn46/sn46.055.wlsh.html",
	"./tipitaka/sn/sn47/sn47.006.than.html",
	"./tipitaka/sn/sn47/sn47.007.olen.html",
	"./tipitaka/sn/sn47/sn47.007.than.html",
	"./tipitaka/sn/sn47/sn47.008.than.html",
	"./tipitaka/sn/sn47/sn47.010.olen.html",
	"./tipitaka/sn/sn47/sn47.010.wlsh.html",
	"./tipitaka/sn/sn47/sn47.013.nypo.html",
	"./tipitaka/sn/sn47/sn47.013.than.html",
	"./tipitaka/sn/sn47/sn47.014.nypo.html",
	"./tipitaka/sn/sn47/sn47.019.olen.html",
	"./tipitaka/sn/sn47/sn47.019.than.html",
	"./tipitaka/sn/sn47/sn47.020.than.html",
	"./tipitaka/sn/sn47/sn47.035.than.html",
	"./tipitaka/sn/sn47/sn47.037.than.html",
	"./tipitaka/sn/sn47/sn47.038.than.html",
	"./tipitaka/sn/sn47/sn47.040.than.html",
	"./tipitaka/sn/sn47/sn47.041.than.html",
	"./tipitaka/sn/sn47/sn47.042.than.html",
	"./tipitaka/sn/sn47/sn47.046.wlsh.html",
	"./tipitaka/sn/sn48/sn48.010.than.html",
	"./tipitaka/sn/sn48/sn48.038.than.html",
	"./tipitaka/sn/sn48/sn48.039.than.html",
	"./tipitaka/sn/sn48/sn48.041.than.html",
	"./tipitaka/sn/sn48/sn48.042.wlsh.html",
	"./tipitaka/sn/sn48/sn48.044.than.html",
	"./tipitaka/sn/sn48/sn48.053.than.html",
	"./tipitaka/sn/sn48/sn48.054.wlsh.html",
	"./tipitaka/sn/sn48/sn48.056.than.html",
	"./tipitaka/sn/sn51/sn51.015.than.html",
	"./tipitaka/sn/sn51/sn51.020.than.html",
	"./tipitaka/sn/sn52/sn52.010.than.html",
	"./tipitaka/sn/sn54/sn54.006.than.html",
	"./tipitaka/sn/sn54/sn54.008.than.html",
	"./tipitaka/sn/sn54/sn54.009.than.html",
	"./tipitaka/sn/sn54/sn54.013.than.html",
	"./tipitaka/sn/sn55/sn55.001.than.html",
	"./tipitaka/sn/sn55/sn55.021.than.html",
	"./tipitaka/sn/sn55/sn55.022.than.html",
	"./tipitaka/sn/sn55/sn55.024.wlsh.html",
	"./tipitaka/sn/sn55/sn55.030.than.html",
	"./tipitaka/sn/sn55/sn55.031.than.html",
	"./tipitaka/sn/sn55/sn55.032.than.html",
	"./tipitaka/sn/sn55/sn55.033.than.html",
	"./tipitaka/sn/sn55/sn55.040.than.html",
	"./tipitaka/sn/sn55/sn55.054.than.html",
	"./tipitaka/sn/sn56/sn56.009.wlsh.html",
	"./tipitaka/sn/sn56/sn56.011.harv.html",
	"./tipitaka/sn/sn56/sn56.011.nymo.html",
	"./tipitaka/sn/sn56/sn56.011.piya.html",
	"./tipitaka/sn/sn56/sn56.011.than.html",
	"./tipitaka/sn/sn56/sn56.020.than.html",
	"./tipitaka/sn/sn56/sn56.022x.wlsh.html",
	"./tipitaka/sn/sn56/sn56.031.than.html",
	"./tipitaka/sn/sn56/sn56.031.wlsh.html",
	"./tipitaka/sn/sn56/sn56.035.than.html",
	"./tipitaka/sn/sn56/sn56.036.than.html",
	"./tipitaka/sn/sn56/sn56.042.than.html",
	"./tipitaka/sn/sn56/sn56.044.than.html",
	"./tipitaka/sn/sn56/sn56.045.than.html",
	"./tipitaka/sn/sn56/sn56.046.than.html",
	"./tipitaka/sn/sn56/sn56.048.than.html",
	"./tipitaka/sn/sn56/sn56.102-113.than.html",
	"./tipitaka/sutta.html",
	"./tipitaka/translators.html",
	"./tipitaka/vin/cv/cv.05.06.01x.olen.html",
	"./tipitaka/vin/cv/cv.08x.than.html",
	"./tipitaka/vin/mv/mv.01.23.01-10.than.html",
	"./tipitaka/vin/mv/mv.06.40.01.than.html",
	"./tipitaka/vin/mv/mv.08.26.01-08.than.html",
	"./tipitaka/vin/mv/mv.10.02.03-20.than.html",
	"./tipitaka/vin/sv/bhikkhu-pati-intro.html",
	"./tipitaka/vin/sv/bhikkhu-pati.html",
	"./tipitaka/vin/sv/bhikkhuni-pati.html"
)
var nFiles=1234;

function getRandomSuttaPath() {
	var ranSutta=suttaList[Math.floor(nFiles*Math.random())];
	return ranSutta;
}

const dayQuote = window.onload = getRandomSuttaPath();

document.addEventListener('DOMContentLoaded', function(){
    const novaCitacao = `<a href='${dayQuote}' target='_blank'><img src='./imagens/ati.gif' alt='ati icon' width='50px'></a>`
    const quoteDiv = document.getElementById('quoteContainer');
    quoteDiv.innerHTML = novaCitacao;

});
/*

window.onload = function() {
  // Replace 'your-api-url' with the actual URL of the Buddha quotes API
  const apiUrl = 'https://buddha-api.com/api/random';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Access the quote and author information from the API response
      const quoteText = data.text;
      const authorName = data.byName;
      const authorImage = data.byImage;

      // Update the HTML elements with the quote and author information
      document.querySelector('q').textContent = quoteText;
      document.querySelector('footer').textContent = `— ${authorName}`;
      // Optionally, you can display the author image using an <img> element
      // const authorImageElement = document.createElement('img');
      // authorImageElement.src = authorImage;
      // document.getElementById('author').appendChild(authorImageElement);
    })
    .catch(error => console.error('Error fetching data:', error));
};
*/