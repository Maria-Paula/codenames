let socket;
socket= io.connect('http://localhost:3000');

const words = [
{'name':'Acne','status':'red'},
{'name':'Alligator','status':'red'},
{'name':'America','status':'blue'},
{'name':'Bag','status':'grey'},
{'name':'Baseball','status':'blue'},
{'name':'Beach','status':'blue'},
{'name':'Beer','status':'red'},
{'name':'Cake','status':'grey'},
{'name':'Candy','status':'grey'},
{'name':'Cat','status':'red'},
{'name':'Circus','status':'red'},
{'name':'Dentist','status':'blue'},
{'name':'Deep','status':'blue'},
{'name':'Dream','status':'bomb'},
{'name':'Ear','status':'grey'},
{'name':'Electricity','status':'red'},
{'name':'Europe','status':'blue'},
{'name':'Fast','status':'grey'},
{'name':'Fire','status':'grey'},
{'name':'Fortnight','status':'blue'},
{'name':'Frog','status':'red'},
{'name':'Girl','status':'red'},
{'name':'Goodbye','status':'blue'},
{'name':'Grass','status':'red'},
{'name':'Happy','status':'blue'}
]

const cellsContainer = document.getElementById('words');
console.log(cellsContainer);

words.forEach((word) => {
	cellsContainer.insertAdjacentHTML("beforeend",`<div class="cell active" data-word="${word.name}"><h2>${word.name}</h2></div>`);

})


const showSpyGrid=()=>{
	// document.getElementById("spymaster").style.visibility = 'hidden';
	// document.getElementById("player").style.visibility = 'visible';
	cellsDiv.forEach((cell,index)=>{
		cell.classList.add(`spy_${words[index]["status"]}`);
	})
	document.getElementById("view").innerHTML = "Spymaster's view";

}

// function showPlayerGrid()
// {
// document.getElementById("player").style.visibility = 'hidden';
// document.getElementById("spymaster").style.visibility = 'visible';
// document.getElementById("view").innerHTML = "Player's view";
// }

let redPoints = 9;
let bluePoints = 8;

const redOutput = document.getElementById("reds");
const blueOutput = document.getElementById("blues");

const colourCells=(info)=>{
	console.log("In Show color :");
	console.log(info);
	// let clickCell;
	// if (event.target.tagName == "H2"){
	// 	clickCell = event.target.parentElement;
	// } else {
	// 	clickCell = event.target;
	// 	console.log(clickCell);
	// }
	const clickWord=info.word;
	console.log(clickWord);

	let clickCell = document.querySelector(`[data-word="${clickWord}"]`);


	const clickStatus = words.find(info => info["name"] === clickWord);
	console.log(words.find(info=> info["name"] == clickWord.trim()));
	
	clickCell.classList.add(`player_${clickStatus.status}`);
	
	if (clickCell.classList.contains('active')) {
		if (clickStatus.status == "red"){
			redPoints--;
			redOutput.innerHTML= redPoints;
		} 
		if (clickStatus.status == "blue"){
			bluePoints--;
			blueOutput.innerHTML= bluePoints;
		}
		clickCell.classList.remove('active');
	}
}

socket.on('click-cell', colourCells);

const triggerClickCell=()=> {
	const clickedWord = event.target.innerText;
	console.log(clickedWord);

	let info = {
		word:clickedWord
	}
	socket.emit('trigger-click-cell',info);
}

const cellsDiv = document.querySelectorAll(".cell");

cellsDiv.forEach((cell,index) => {
	cell.addEventListener('click',triggerClickCell);
})



