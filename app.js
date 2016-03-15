$(document).ready(function() {


//variable declarations and initial assignments
var base = [[1,2,3,4,5,6,7,8,9],[4,5,6,7,8,9,1,2,3],[7,8,9,1,2,3,4,5,6],[2,3,4,5,6,7,8,9,1],[5,6,7,8,9,1,2,3,4],[8,9,1,2,3,4,5,6,7],[3,4,5,6,7,8,9,1,2],[6,7,8,9,1,2,3,4,5],[9,1,2,3,4,5,6,7,8]];
var baseChk = [];
var difficulty = 0.5;


//initialization stage
(function initialize() {
	sudokuGen();
})();


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