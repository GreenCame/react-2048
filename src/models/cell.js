class Cell {
    constructor(_id){
        this.id = _id;
        this.colors = [
            '#eeeeee',
            '#7CB5E2', 
            '#4495D4', 
            '#2F6895', 
            '#F5BD70', 
            '#F2A032', 
            '#CD8829', 
            '#E37051',
            '#DE5833', 
            'purple', 
            'pink', 
            'brown', 
            'black',
        ];
        this.reset();
    }

    moveTo = (cell) => {
        if(cell.isEmpty()){
            cell.points = this.points
            this.reset();                               
        } else if(this.points === cell.points) {
            cell.points = this.points + this.points;
            this.reset();
        }
    }

    canMoveTo = (cell) => {
        return cell && this.id !== cell.id && (cell.isEmpty() || this.same(cell))
    }

    isEmpty = () => {
       return this.points === 0;
    }

    start = () => {
        if(Math.random() < 0.5)
            this.points = 2;
        else
            this.points = 4;
    }

    same = (cell) => {
        return cell.points === this.points;
    }

    reset = () => {
        this.points = 0;
    }

    color = () => {
        return this.colors[ this.points / 4 ];
    }

    value = () => {
        return this.points ? this.points : ''; //return this.points ? Math.pow(2, this.points) : '';
    }
}

export default Cell;