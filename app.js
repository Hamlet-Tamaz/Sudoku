$(document).ready(function() {
	

function swapEls(arr, iA, iB) {
  var temp = arr[iA];
  arr[iA] = arr[iB];
  arr[iB] = temp;
}


var basic = [[1,2,3,4,5,6,7,8,9],[4,5,6,7,8,9,1,2,3],[7,8,9,1,2,3,4,5,6],[2,3,4,5,6,7,8,9,1],[5,6,7,8,9,1,2,3,4],[8,9,1,2,3,4,5,6,7],[3,4,5,6,7,8,9,1,2],[6,7,8,9,1,2,3,4,5],[9,1,2,3,4,5,6,7,8]];

var base = basic;

//grid randomization

function gridRandomization() {


	//shift rows
	base.forEach(function (el, i) {

		if (i === 0 || i === 1 || i === 2) {
			
			var a = Math.floor(Math.random() * 3);
			var b = Math.floor(Math.random() * 3);

			swapEls(base, a, b);
		}
		else if (i === 3 || i === 4 || i === 5) {
			var a = Math.floor(Math.random() * 3) + 3;
			var b = Math.floor(Math.random() * 3) + 3;

			swapEls(base, a, b);
		}
		else if (i === 6 || i === 7 || i === 8) {
			var a = Math.floor(Math.random() * 3) + 6;
			var b = Math.floor(Math.random() * 3) + 6;

			swapEls(base, a, b);
		}

	});

	//shift cols
	base.forEach(function (el, i) {


		el.forEach(function (val, j){ 

			// var temp = $(`[data-col=${i + 1}]`);
			// $.makeArray($(`[data-col=${i + 1}]`))


			if ($('[data-col') === 0 || $('[data-col') === 1 || $('[data-col') === 2) {
				
				var a = Math.floor(Math.random() * 3);
				var b = Math.floor(Math.random() * 3);

				swapEls(el, a, b);
			}
			else if ($('[data-col') === 3 || $('[data-col') === 4 || $('[data-col') === 5) {
				var a = Math.floor(Math.random() * 3) + 3;
				var b = Math.floor(Math.random() * 3) + 3;

				swapEls(el, a, b);
			}
			else if ($('[data-col') === 6 || $('[data-col') === 7 || $('[data-col') === 8) {
				var a = Math.floor(Math.random() * 3) + 6;
				var b = Math.floor(Math.random() * 3) + 6;

				swapEls(el, a, b);
			}
		});
	});


	//switch numbers' places
	[1,2,3,4,5,6,7,8,9].forEach(function (num, idx) {
			var k = Math.floor(Math.random() * 9) + 1;
			var temp = num;
	// debugger
			base.forEach(function(arr) {
				var temp1 = "fill";
				arr[arr.lastIndexOf(k)] = temp1;
				arr[arr.indexOf(temp)] = k;
				arr[arr.lastIndexOf("fill")] = temp;
			});
	});
}


// debugger
//variable declarations and initial assignments
// var base = [[1,2,3,4,5,6,7,8,9],[4,5,6,7,8,9,1,2,3],[7,8,9,1,2,3,4,5,6],[2,3,4,5,6,7,8,9,1],[5,6,7,8,9,1,2,3,4],[8,9,1,2,3,4,5,6,7],[3,4,5,6,7,8,9,1,2],[6,7,8,9,1,2,3,4,5],[9,1,2,3,4,5,6,7,8]];
var baseChk = [];
var hsArray = JSON.parse(localStorage.getItem("High Scores")) || [];
var nScore = {};
var difficulty = 0.015;
var gCount = 0;


$('#difficulty').on('click', 'button', chooseDif);

function chooseDif(e) {
	// debugger
	if (e.target.innerText === "Easy") {
		difficulty = 0.55;
	}
	else if (e.target.innerText === "Medium") {
		difficulty = 0.65;
	}
	else if (e.target.innerText === "Hard") {
		difficulty = 0.75;
	}

	$('#difficulty').css('display', 'none');
}

//giveup button
$('#giveUp').on('click', giveUp);

function giveUp(e) {
	window.location.reload();
}

//reset button
$('#reset').on('click', reset);

function reset(e) {
	localStorage.removeItem("High Scores");
	settingHS();		
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
	//grid setup
	gridRandomization();
	//reset game score
	nScore = {};
	//clears the field of initial sudoku grid
	$('#Mtbody td').empty();
	//remove "perm" class from all td's before adding new settings
	$.makeArray($('#Mtbody td')).forEach(function(el, i) { $(el).removeClass("perm"); });
	//reset timer
	(function() { h1.textContent = "00:00:00"; seconds = 0; minutes = 0; hours = 0;})();
	//set background white
	$('td').css("background-color", "white");
	//turn on inputRow event lister
	$('#inputRow').on("click", "td", numPick);


// debugger
	base.forEach(function(el_arr, i){
		el_arr.forEach(function(el, j) {
			baseChk.push(el);
			
			if (Math.random() > difficulty) {
				var cell = $(`#Mtbody > tr:nth-child(${i+1}) > td:nth-child(${j+1})`)
				cell.text(el);
				cell.addClass('perm');
			}
		});
	});

//gets rid of difficulty section if you didn't choose a difficulty when starting 
	$('#difficulty').css('display', 'none');

	numsLeft();
}

function numsLeft() {
	$.makeArray($('.numsLeft')).forEach(
		function(el, i) {
			// debugger
			var inputVal = el.parentNode.innerText[0];
			var howMany = $.makeArray($('#Mtbody td')).filter(function(el, i) {
				return $(el).text() === inputVal;
			});
			howMany = howMany.length;
			$(el).text(howMany);
		});
}

//ERASER cell high-lighting
$('#eraser').on('click', cancelHl);


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
	var yellow = "rgb(247, 249, 143)";

	var $row = $(`[data-row=${n_row}]`);
	var $col = $(`[data-col=${n_col}]`);
	var $grp = $(`[data-grp=${n_grp}]`);

	if ($row.css("background-color") === yellow && $col.css("background-color") === yellow && $grp.css("background-color") === yellow) {	
		
		$('td').css("background-color", "white");
	}
	else {
		$('td').css("background-color", "white");
		
		$row.css("background-color", "rgb(247, 249, 143)");
		$col.css("background-color", "rgb(247, 249, 143)");
		$grp.css("background-color", "rgb(247, 249, 143)");
	}

	if ($(e.target).text()) {
		var num = $(e.target).text();
		$.makeArray($('#Mtbody td')).forEach(numBold);

		function numBold(el, i) {
			if (num === $(el).text()) {
				$(el).css("background-color", "rgba(143, 194, 249, 0.6)");
			}
		}
	}
}

//highlight the number you choose
$('#inputRow').on('click', 'td', numHl);

function numHl(e) {
// debugger
	// $('#inputRow').css('background-color', 'white');
	$(e.target).css("background-color", "rgb(247, 249, 143)");
	setTimeout(function() {
		$(e.target).css("background-color", "white");
	}, 1000);
}



//create the input numbers
// $('#inputRow').on("click", numPick);


function numPick (e) {
	debugger
	if (this.innerText[0]) {
		var num = this.innerText[0];	
	}
	else {
		var num = "  ";
	}

	
	$('#Mtbody').on('click', check);
	$('#Mtbody').on('click', numAsn);

	function numAsn (e) {
		// debugger

		//check if cell clicked isn't "perm" and we're not clicking the same thing
		if (e.target.className.indexOf("perm") === -1 && e.target.innerText !== num) {
			//insert number in cell
			$(e.target).text(num);	
		}
		//check how many of each number is left
		numsLeft();
		$('#Mtbody').off('click', numAsn);
		
		//figuring out when game ends
		function gameEndCheck() {
			// debugger
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

			//stops time
    	clearTimeout(t);
		
			//winning Banner
			$('#winner').css('visibility', 'visible');
			$('#winner').on("click", winner); 
		}
}

function winner(e) {
	//hides winner banner

	//asks for player name and set high score
	var name = prompt("What is your name?") || "Guest";
	$('#winner').css('visibility', 'hidden');
	//hides any highlighting
	$('td').css("background-color", "white");
	hsArray.push(nScore);
	

	//storing the win times in storage & displaying in high score list

	nScore.name = name;
	nScore.time = $('time').text();


		localStorage.setItem("High Scores", JSON.stringify(hsArray));

	//print to HS list
	settingHS();


	//turns off event listeners of the inputRow and Body
	$('#inputRow').off("click", numPick);
	$('#winner').off("click", winner);				


	//turn "play" button back on
	$('#startGame').on('click', initialize);
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