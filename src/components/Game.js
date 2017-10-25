import React, { Component } from 'react';
import { Grid, Dimmer, Segment, Icon, Header } from 'semantic-ui-react';
import Cell from '../models/cell';
import Cellule from './Cellule';

class Game extends Component {
    constructor(props){
        super(props) 

        this.useLocalStorage = false;
        let cells = this.initCells();
        let localstorageCells = JSON.parse(localStorage.getItem('cells'));

        if(localstorageCells) {
            this.useLocalStorage = true;
            for(let i = 0; i < cells.length ; i++)
                cells[i].points = localstorageCells[i].points;
        }

        this.state = {
            cells : cells,
            gameover : false
        }
        
        this.key = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        }
    }

    initCells = () => {
        let cells = [];
        
        for(let i = 0; i < 16 ; i++)
            cells[i] = new Cell(i);

        return cells;
    }

    componentWillMount() {
        if(this.useLocalStorage)
            this.updateScore();
        else
            this.nextTurn();

        document.addEventListener("keyup", this._handlePlayKey, false); 
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this._handlePlayKey, false); 
    }

    _handlePlayKey = (e) => {
        if(this.state.gameover)
            return

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
        let emptyCells = this.state.cells.filter((c) => {
           return c.isEmpty()
        });

        if(emptyCells.length === 0) //GAME OVER
            this.setState({ gameover : true })
        else {
            let cells = this.state.cells;
            cells[ emptyCells[this.random(0, emptyCells.length - 1)].id ].start();

            this.setState( { cells : cells } );
        }

        //localstorage
        localStorage.setItem('cells', JSON.stringify(this.state.cells));

        this.updateScore();        
    }

    updateScore() {
        //change score
        this.props.changeScore(this.state.cells.reduce((prev, c) => prev + c.value(), 0));       
    }

    random = (min, max) => {
        return  Math.floor(Math.random() * (max - min + 1)) + min;
    }

    refresh = () => {
        console.log('refresh')
        this.setState({ cells : [] });

        setTimeout(() => {
            this.setState({ cells : this.initCells(), gameover : false })
            
            this.nextTurn();
        }, 0)
       
    }

    render() {
        return (
            <div>
                <Dimmer.Dimmable as={Segment} dimmed={ this.state.gameover }>
                    <Dimmer active={ this.state.gameover } onClickOutside={ this.refresh }>
                        <Header as='h2' icon inverted>
                            <Icon name='frown' />
                            Game Over !
                        </Header>
                    </Dimmer>
                    <Grid style={{maxWidth : 350}}>
                        {
                            this.state.cells.map((c) =>
                                <Cellule key={ c.id } cell={ c }/>
                            )
                        }                   
                    </Grid>
                </Dimmer.Dimmable>
            </div>
        );
    }
}

export default Game;