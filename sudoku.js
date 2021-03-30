class Element {
	number;
	options;

	setNum(num) {
		this.number = num;
	}

	isEmpty() {
		if (!this.number) return true;
		return false;
	}
	
	print() {
		if (this.number) return this.number + ' ';
		return '_ ';
	}
}

class Game {
	grid;

	constructor() {
		this.grid = [...Array(9).keys()].map(elx => {
			return [...Array(9).keys()].map(ely => new Element());
		});

	}

	clone() {
		let newG = new Game();
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				newG.setNum(i, j, this.grid[i][j].number);
			}
		}
		return newG;
	}

	isEmpty(row, col) {
		return this.grid[row][col].isEmpty();
	}

	setNum(row, el, num) {
		this.grid[row][el].setNum(num);
	}

	setRow(row, els) {
		for (let i = 0; i < 9; i ++ ) {
			if (els[i]) {
				this.setNum(row, i, els[i]);
			}
		}

	}

	
	validRow(row) {
		let whereIsElement = (i, j) => this.grid[i][j];
		return this.validBlock(row, whereIsElement);
	}
	
	validCol(col) {
		return this.validBlock(col, (i, j) => this.grid[j][i]); 
	}

	validSq(sq) {
		return this.validBlock(sq, (i, j) => {
			let row = Math.floor(i / 3);
			let col = i % 3;
			
			let elRow = row * 3 + Math.floor(j/3);
			let elCol = col * 3 + j % 3;
			//console.log('##', i, j,':', row, col, '-- ', elRow, elCol);

			return this.grid[elRow][elCol];
		});
	}
	
	validBlock(i, whereIsElement) {

		let weHave = [];

		for (let j = 0; j < 9; j ++ ) {
			let el = whereIsElement(i, j); 
			if (!el.isEmpty() && weHave.includes(el.number)) {
				return false;
			}
			weHave.push(el.number);
		}
		return true;
	}
	

	valid(pr = false) {
		let isValid = true;
		if (pr) console.log('Invalid rows: ');
		
		for (let i = 0; i < 9; i ++ ) {
			if (this.validRow(i) != true) {
				if (pr) console.log('invalid row: ', i);
				isValid = false;
			}
		}
		if (pr) console.log('Invalid cols: ');
		for (let i = 0; i < 9; i ++ ) {
			if (this.validCol(i) != true) {
				if (pr) console.log('invalid col: ', i);
				isValid = false;
			}
		}
		if (pr) console.log('Invalid sq: ');
		for (let i = 0; i < 9; i ++ ) {
			if (this.validSq(i) != true) {
				if (pr) console.log('invalid sq: ', i);
				isValid = false;
			}
		}
		return isValid;
	}

	allPossibleNums(row, col) {
		let posNums = [];
		for (let num = 1; num <= 9; num++) {
			let g = this.clone();
			g.setNum(row, col, num);
			if (g.valid()) posNums.push(num);
		}
		return posNums;
	}

	getFilledClone() {
		let changed = false;
		let myClone = this.clone();
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col< 9; col++) {
				if (!myClone.isEmpty(row, col)) continue;
				let posNums = myClone.allPossibleNums(row, col);
				if (posNums.length != 1) continue;
				myClone.setNum(row, col, posNums[0]);
				//console.log('#', row, col, posNums.length, posNums[0]);
				changed = true;
			}
		}
		//console.log('ch', changed);
		if (changed) myClone = myClone.getFilledClone();
		return myClone;
	}

	getNext() {
		let clones = [];
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col< 9; col++) {
				if (!this.isEmpty(row, col)) continue;
				this.allPossibleNums(row, col).forEach(num => {
					let myClone = this.clone();
					console.log('>>', row, col, num);
					myClone.setNum(row, col, num);
					myClone = myClone.getFilledClone();
					clones.push(myClone);
				});
			}
		}
		return clones;
	}


	print() {
		let i = 0;
		this.grid.forEach(row => {
			let toPrint = '';
			let j = 0;
			row.forEach(el => {
				toPrint += el.print();
				if ((j+1) % 3 == 0) toPrint += '| '; 
				j++;

			})
			console.log(toPrint);
			if ((i+1) % 3 == 0) console.log('----------------------');
			i++;
		})
	}

}
console.log('Hello Sudoku');

let g = new Game();
g.setRow(0, [5,3,null,null,          7                                 ]);
g.setRow(1, [6,null,null,         1, 9, 5]);
g.setRow(2, [null, 9, 8,          null, null, null,      null, 6]);
g.setRow(3, [8, null, null,       null, 6, null,         null, null, 3]);
g.setRow(4, [4, null, null,       8, null, 3,            null, null, 1]);
g.setRow(5, [7, null, null,       null,2, null,          null, null, 6]);
g.setRow(6, [null, 6, null,       null,null, null,         2, 8,  null]);
g.setRow(7, [null, null, null,    4, 1, 9,                  null,null, 5]);
//g.setRow(8, [null, null, null,    null, 8, null,           null, 7, 9]);

//g.setNum(0, 8, 5);
//g.setNum(6, 0, 6);
//g.setNum(3, 1, 8);
//g.setNum(6, 3, 1);
//console.log(JSON.stringify(g));

//g = new Game();
//g.setRow(2 ,[1,2,3,4,5,6,7,8]);
g.print();
g = g.getFilledClone();
g.print();
console.log('===========================');
g.getNext().forEach(gm => {
	console.log('..........................');
	gm.print();
	console.log(gm.valid());
});

//c = g.getFilledClone();
//console.log('******************************************');
//c.print();
/*
for (let row = 0; row < 9; row++) {
	for (let col = 0; col< 9; col++) {
		if (!g.isEmpty(row, col)) continue;
		console.log(row, col, ' : ', g.allPossibleNums(row, col));
	}
}
let cl = g.getFilledClone();
cl.print();
*/
