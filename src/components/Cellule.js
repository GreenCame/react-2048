import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

class Cellule extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            cell : this.props.cell
        }
    }

    render() {
        return (
            <Grid.Column width={4} className="cell" style={{ backgroundColor : this.state.cell.color(), color: 'white', 'fontSize': '23px', 'paddingTop': '24px'}} stretched>
                { this.state.cell.value() }
            </Grid.Column>
        );
    }
}

export default Cellule;