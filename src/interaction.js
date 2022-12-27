class Player{
	constructor(gameField){
		this.gameField = gameField;
		this.position = [1, 1];
	}

	goDown(){
		if(this.gameField[position[0] - 1][position[1]] == 0) {
			position = [position[0] - 1, position[1]]
		}
		return this.position;
	}
}