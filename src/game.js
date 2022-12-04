class Game {
	constructor(fieldSize){
		this.fieldSize = 10;
		//create field
		this.gameFieldModel = this.createField(this.fieldSize, this.fieldSize, 1);
	}

	createField(rows, cols, value) {
		const field = [];
		for (let i = 0; i < rows; i++) {
			const createdRow = this.createRow(cols, value);
			field.push(createdRow);
		}
	}

	createRow(size, value){
		const row = [];
		for (let i = 0; i < size; i++){
			// insert value into the row
			row.push(value);
		}
		return row;
	} 


}