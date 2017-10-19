class Cell {
    constructor(_id){
        this.id = _id;
        this.colors = [
            'grey',
            'yellow', 
            'orange', 
            'red', 
            'olive', 
            'green', 
            'teal', 
            'blue',
            'violet', 
            'purple', 
            'pink', 
            'brown', 
            'black',
        ];
        this.reset();
    }

    upgrade = (cell) => {
        (cell.isEmpty() || cell.points < 3) ? this.points = cell.points : this.points++;
    }

    isEmpty = () => {
       return this.points === 0;
    }

    start = () => {
        this.points = this.random(1,2);
    }

    random = (min, max) => {
        return  Math.floor(Math.random() * (max - min + 1)) + min;
    }

    same = (cell) => {
        return cell.points === this.points;
    }

    reset = () => {
        this.points = 0;
    }

    color = () => {
        return this.colors[this.points];
    }

    value = () => {
        return this.points ?  ( this.points === 1 ? 2 : this.points * this.points ) : '';
    }
}

export default Cell;