class Game {
	constructor(fieldSize){
		this.fieldSize = fieldSize;
		//create field
		this.gameFieldModel = this.createField(this.fieldSize, this.fieldSize, 1);
		this.generateMaze();
		this.player = new Player(this.gameFieldModel);
	}

	generateMaze(){
		// 1. Create Step Points - create matrix for it
		this.generateStepPoints();
		const rowsStepMapSize = Math.floor(this.fieldSize / 2);
		const stack = [];
		const stepMap = this.createField(rowsStepMapSize, rowsStepMapSize, 0);
		// 2. Start from up left coner - create counter
		let counter = [0, 0];
		stepMap[0][0] = 1;
		const stepMapSize = stepMap[0].length * stepMap.length;

		while (this.sum2dim(stepMap) < stepMapSize) {
			// 3. Find neighbours and choose random one from the list
			let neighbours = this.getNeighbours(stepMap, counter[0], counter[1]);
			if (neighbours.length >  0) {
				stack.push(counter);
				let next = this.chooseRandom(neighbours)

				let diffx = next [0] - counter[0];
				let diffy = next [1] - counter[1];

				this.gameFieldModel[counter[0] * 2 + 1 + diffx][counter[1] * 2 + 1 + diffy] = 0;
				counter = next;
				stepMap[counter[0]][counter[1]] = 1;
			} else {
				counter = stack.pop()
			}

		}
		// 4. Reamove wall on the game field

		// 5. Step map in the pos is now 1

		// 6. Move counter to choosef neighbour

		// 7. Go to 3. while all step points is not 1(sum matrix is not size*size)

	}

	getNeighbours(stepMap, x, y) {
		const neighbours = [];

		if (x + 1 < stepMap[0].length && stepMap[x + 1][y] == 0) {
			neighbours.push([x + 1, y]);
		}

		if (x - 1 >= 0 && stepMap[x - 1][y] == 0) {
			neighbours.push([x - 1, y]);
		}

		if (y + 1 < stepMap[0].length && stepMap[x][y + 1] == 0) {
			neighbours.push([x, y + 1]);
		}

		if (y - 1 >= 0 && stepMap[x][y - 1] == 0) {
			neighbours.push([x, y - 1]);
		}

		return neighbours;
	}

	generateStepPoints(){
		const pointQuantityX = Math.floor(this.gameFieldModel[0].length / 2);
		const pointQuantityY = Math.floor(this.gameFieldModel.length / 2);

		for (let i = 0; i < pointQuantityX; i++){
			for (let j = 0; j < pointQuantityY; j++){
				this.gameFieldModel[i * 2 + 1][j * 2 + 1] = 0;
			}
		}
	}

	createField(rows, cols, value) {
		const field = [];
		for (let i = 0; i < rows; i++) {
			const createdRow = this.createRow(cols, value);
			field.push(createdRow);
		}
		return field;
	}

	createRow(size, value){
		const row = [];
		for (let i = 0; i < size; i++){
			// insert value into the row
			row.push(value);
		}
		return row;
	} 

	sum2dim(array) {
		let sum = 0;
		for (let i = 0; i < array.length; i++){
			for(let j = 0; j < array[i].length; j++){
				sum += array[i][j];
			}
		}
		return sum;
	}

	chooseRandom(array) {
		return array[Math.floor(Math.random() * array.length)];
	}
}