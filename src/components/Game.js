import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Cell from '../models/cell';
import Cellule from './Cellule';

class Game extends Component {
    constructor(props){
        super(props)

        let cells = [];

        for(let i = 0; i < 16 ; i++)
            cells[i] = new Cell(i);
        
        this.state = {
            cells : cells
        }

        this.key = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        }
    }

    componentWillMount() {
        this.initEmptyCell()
        document.addEventListener("keyup", this._handlePlayKey, false); 
    }

    componentDidMount() {
        //
    }

    _handlePlayKey = (e) => {
        if(e.keyCode === this.key.DOWN){
            console.log('look like your fired key DOWN');
            for(let i = 0; i < 16 ; i++){
                let c_from = this.state.cells[i];
                let c_to = this.state.cells[i + 4];
                if( c_to && !c_from.isEmpty() && ( c_to.isEmpty() || c_to.same(c_from))) {
                    console.log('upgrade')
                    c_to.upgrade(c_from);
                    c_from.reset();                   
                }
            }

            this.nextTurn();
        } else if (e.keyCode === this.key.UP){
            console.log('look like your fired key UP');
        } else if (e.keyCode === this.key.RIGHT){ 
            console.log('look like your fired key RIGHT');
        } else if (e.keyCode === this.key.LEFT){
            console.log('look like your fired key LEFT');
        }
    }

    nextTurn = () => {
        this.initEmptyCell()        
    }

    initEmptyCell = () => {
        let emptyCells = this.state.cells.filter((c) => {
           return c.isEmpty()
        });

        let cells = this.state.cells;
        cells[ emptyCells[this.random(0, emptyCells.length - 1)].id ].start();

        this.setState( { cells : cells } );
    }

    random = (min, max) => {
        return  Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        return (
            <div>
                <Grid style={{maxWidth : 250}}>
                    {
                        this.state.cells.map((c) =>
                            <Cellule key={ c.id } cell={ c }/>
                        )
                    }                   
                </Grid>
            </div>
        );
    }
}

export default Game;