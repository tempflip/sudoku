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

	valid() {
		console.log('Valid rows: ');
		for (let i = 0; i < 9; i ++ ) {
			let inRows = [];
			for (let j = 0; j < 9; j ++ ) {
				if (!this.grid[i][j].isEmpty() && inRows.includes(this.grid[i][j].number)) {
					console.log('Row ' + i + ' invalid', inRows);
					break;
				}
				inRows.push(this.grid[i][j].number);
			}
		}
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
g.setRow(8, [null, null, null,    null, 8, null,           null, 7, 9]);

g.setNum(0, 8, 5);
console.log(g);

g.print();
g.valid();
