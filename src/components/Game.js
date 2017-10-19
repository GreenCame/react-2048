import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Cell from '../models/cell';
import Cellule from './Cellule';

class Game extends Component {
    constructor(props){
        super(props)

        let cells = this.props.cells;

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

            //descendre toutes les cases
            let wasMoved = true;
            while(wasMoved){
                wasMoved = false;
                for(let i = 16; i > 0  ; i--){
                    if( this.move('safe', this.state.cells[i - 4], this.state.cells[i]) )
                        wasMoved = true;
                }
            }

            //les combiner si possible
            for(let i = 16; i > 0  ; i--)
                this.move('fusion', this.state.cells[i - 4], this.state.cells[i])

            //turn
            this.nextTurn();

        } else if (e.keyCode === this.key.UP){
            console.log('look like your fired key UP');

            //monter toutes les cases
            let wasMoved = true;
            while(wasMoved){
                wasMoved = false;
                for(let i = 0; i < 16  ; i++){
                    if( this.move('safe', this.state.cells[i + 4], this.state.cells[i]) )
                        wasMoved = true;
                }
            }

            //les combiner si possible
            for(let i = 0; i < 16 ; i++)
                this.move('fusion', this.state.cells[i + 4], this.state.cells[i])

            //turn
            this.nextTurn();

        } else if (e.keyCode === this.key.RIGHT){ 
            console.log('look like your fired key RIGHT');

            //monter toutes les cases
            let wasMoved = true;
            while(wasMoved){
                wasMoved = false;
                for(let i = 0; i < 4  ; i++){
                    for(let y = 1; y < 4  ; y++){
                        if( this.move('safe', this.state.cells[ i*4 + y - 1 ], this.state.cells[ i*4 + y ]) )
                            wasMoved = true;
                    }
                }
            }

            //les combiner si possible
            for(let i = 0; i < 4  ; i++){
                for(let y = 1; y < 4  ; y++){
                    this.move('fusion', this.state.cells[ i*4 + y - 1 ], this.state.cells[ i*4 + y ])
                }
            }

            //turn
            this.nextTurn();

            
        } else if (e.keyCode === this.key.LEFT){
            console.log('look like your fired key LEFT');

            //monter toutes les cases
            let wasMoved = true;
            while(wasMoved){
                wasMoved = false;
                for(let i = 0; i < 4  ; i++){
                    for(let y = 0; y < 3  ; y++){
                        if( this.move('safe', this.state.cells[ i*4 + y + 1 ], this.state.cells[ i*4 + y ]) )
                            wasMoved = true;
                    }
                }
            }

            //les combiner si possible
            for(let i = 0; i < 4  ; i++){
                for(let y = 0; y < 3  ; y++){
                    this.move('fusion', this.state.cells[ i*4 + y + 1 ], this.state.cells[ i*4 + y ])
                }
            }

            //turn
            this.nextTurn();
        }
    }

    move = (type, c_from, c_to) => {
        if( type === 'safe' && c_from && c_to && !c_from.isEmpty() && c_to.isEmpty() ) {
            console.log(type + ' move ! from :' + c_from.id + ' to:' + c_to.id);
            c_from.moveTo(c_to);
            return true;
        } else if ( type === 'fusion' && c_from && c_to && !c_from.isEmpty() && c_from.canMoveTo(c_to) ) {
            console.log(type + ' move ! from :' + c_from.id + ' to:' + c_to.id);
            c_from.moveTo(c_to);
            return true;
        }     

        return false;
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