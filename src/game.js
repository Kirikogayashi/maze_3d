class Game {
	constructor(){
		this.FIELD_SIZE = 10;
		this.CELL_SIZE = 1;
		this.gameField = [];
	}

	createField() {
		for (let i = 0; i < this.FIELD_SIZE; i++){
			const row = [];
			for (let j = 0; j < this.FIELD_SIZE; j++){
				row.push(1);
			}
			this.gameField.push(row);
		}
	} 	
}