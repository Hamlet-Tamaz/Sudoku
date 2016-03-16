$(document).ready(function() {


//variable declarations and initial assignments
var base = [[1,2,3,4,5,6,7,8,9],[4,5,6,7,8,9,1,2,3],[7,8,9,1,2,3,4,5,6],[2,3,4,5,6,7,8,9,1],[5,6,7,8,9,1,2,3,4],[8,9,1,2,3,4,5,6,7],[3,4,5,6,7,8,9,1,2],[6,7,8,9,1,2,3,4,5],[9,1,2,3,4,5,6,7,8]];
var baseChk = [];
var hsArray = JSON.parse(localStorage.getItem("High Scores")) || [];
var nScore = {};
var difficulty = 0.015;
var gCount = 0;


$('#difficulty').on('click', 'button', chooseD);

function chooseD(e) {
	// debugger
	if (e.target.innerText === "Easy") {
		difficulty = 0.7;
	}
	else if (e.target.innerText === "Medium") {
		difficulty = 0.5;
	}
	else if (e.target.innerText === "Hard") {
		difficulty = 0.3;
	}

	$('#difficulty').css('display', 'none');
}


//reset button
$('#reset').on('click', reset);

function reset(e) {
	localStorage.removeItem("High Scores");

	window.location.reload();
}

//setting HS in list
function settingHS() {
	$('#highScoreList').empty();

	if (localStorage.getItem("High Scores")) {
		JSON.parse(localStorage.getItem("High Scores")).forEach(printToHS);
	}

	function printToHS(el, i) {

		var hsName = el.name;
		var hsTime = el.time;

		var newScore = `<li>${hsName}: ${hsTime}</li>`;
		$('#highScoreList').append(newScore);
	}
}
settingHS();		


//initialization stage
$('#startGame').on('click', initialize);

function initialize() {
	sudokuGen();
	timer();
		// localStorage.setItem("nGames", JSON.stringify(gCount));

	$('#startGame').off('click', initialize);
}

//Create/Setup timer
var h1 = document.getElementById('timer'),
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}


//create the deck
function sudokuGen() {

	base.forEach(function(el_arr, i){
		el_arr.forEach(function(el, j) {
			baseChk.push(el);
			
			if (Math.random() > difficulty) {
				var cell = $(`tr:nth-child(${i+1}) > td:nth-child(${j+1})`)
				cell.text(el);
				cell.addClass('perm');
			}
		});
	});

//gets rid of difficulty section if you didn't choose a difficulty when starting 
	$('#difficulty').css('display', 'none');

}


//cell high-lighting
// $('#eraser').on('click', cancelHl);

function cancelHl(e) {
	// $('#Mtbody').off('click', cancelHl);
	$('td').css("background-color", "white");
}



$('#Mtbody').on('click', highlight);

function highlight(e) {
	
	var n_inp = Number(e.target.innerText);
	var n_row = Number(e.target.dataset.row);
	var n_col = Number(e.target.dataset.col);
	var n_grp = Number(e.target.dataset.grp);
	var yellow = "rgb(255, 255, 0)";

	var $row = $(`[data-row=${n_row}]`);
	var $col = $(`[data-col=${n_col}]`);
	var $grp = $(`[data-grp=${n_grp}]`);

	if ($row.css("background-color") === yellow && $col.css("background-color") === yellow && $grp.css("background-color") === yellow) {	
		
		$('td').css("background-color", "white");
	}
	else {
		$('td').css("background-color", "white");
		
		$row.css("background-color", "yellow");
		$col.css("background-color", "yellow");
		$grp.css("background-color", "yellow");
	}

}

//highlight the number you choose
$('#inputRow').on('click', 'td', numHl);

function numHl(e) {
// debugger
	// $('#inputRow').css('background-color', 'white');
	$(e.target).css("background-color", "yellow");
	setTimeout(function() {
		$(e.target).css("background-color", "white");
	}, 1000);
}



//create the input numbers
$('#inputRow').on("click", numPick);


function numPick (e) {
	var num = e.target.innerText;

	
	$('#Mtbody').on('click', check);
	$('#Mtbody').on('click', numAsn);

	function numAsn (e) {
		// debugger
		if (e.target.className.indexOf("perm") === -1 && e.target.innerText !== num) {
			$(e.target).text(num);	
		}
		$('#Mtbody').off('click', numAsn);
		
		//figuring out when game ends
		function gameEndCheck() {
			debugger
			// var currentNumbers = $.makeArray($('#Mtbody td')).map(function(el, i) {
			// 	return Number(el.innerText);
			// });

			// var arraysMatch = base.reduce(function(acc, el, i) {
			// 	if (el !== currentNumbers[i]) {
			// 		return false;
			// 	}

			// 	return acc;
			// }, true);

			// return arraysMatch;

			if ($.makeArray($('#Mtbody td')).map(function(el, i) {
				return Number(el.innerText);
			}).reduce(function(s, n, i) {return s += n; }) === 405) {
				return true;
			}
			else { return false;}
		}

		if (gameEndCheck()) {
			alert("YOU WIN!!");
			
			(function() {
    		clearTimeout(t);})();
		
			// gCount++;
			// localStorage.setItem("nGames", JSON.stringify(gCount));
			// localStorage.setItem(`Game ${localStorage.getItem("nGames")}:`, $('time').text());


			//storing the win times in storage & displaying in high score list
			var name = prompt("What is your name?");

			nScore.name = name;
			nScore.time = $('time').text();

			hsArray.push(nScore);

				localStorage.setItem("High Scores", JSON.stringify(hsArray));

			//print to HS list
			settingHS();
	}
}


// n stands for number (ie. row number)
	function check(e) {
		var n_inp = Number(num);
		var n_row = Number(e.target.dataset.row);
		var n_col = Number(e.target.dataset.col);
		var n_grp = Number(e.target.dataset.grp);
		
		var $row = $(`[data-row=${n_row}]`);
		var $col = $(`[data-col=${n_col}]`);
		var $grp = $(`[data-grp=${n_grp}]`);

		function r_chk() {
		// debugger
		// for some reason the funciotn runs twice; 2nd time messes up
			var x = $.makeArray($row).map(function(v, i) {
				// I want to make it such that the map skips checking the cell that was just clicked on; if (i === e.)
				return Number(v.innerText);
			});
			if ($.inArray(n_inp, x) !== -1 && e.target.innerText !== num) {
				return true;
			}
			else {
				return false;
			}
		}

		function c_chk() {
			var x = $.makeArray($col).map(function(v, i) {
				return Number(v.innerText);
			});

			if ($.inArray(n_inp, x) !== -1 && e.target.innerText !== num) {
				return true;
			}
			else {
				return false;
			}
		}

		function g_chk() {
			var x = $.makeArray($grp).map(function(v, i) {
				return Number(v.innerText);
			});

			if ($.inArray(n_inp, x) !== -1 && e.target.innerText !== num) {
				return true;
			}
			else {
				return false;
			}
		}

		if (r_chk(e)|| c_chk() || g_chk()) { 
			$row.css("background-color", "orange");
			$col.css("background-color", "orange");
			$grp.css("background-color", "orange");
		}
		else {
			$('td').css('background-color', 'white');
		}
	$('#Mtbody').off('click', check);
	}

}











});