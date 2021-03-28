class Element {
	number;
	options;

	setNum(num) {
		this.number = num;
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
				this.grid[row][i].setNum(els[i]);
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
g.setRow(0, [5,3,null,null,7]);

console.log(g);

g.print();
