import React, { Component } from 'react';
import Game from './Game';
import { Container, Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'

class App extends Component {
  constructor(){
    super();
    this.state = {
      cells : []
    }
  }

  _handleClick = () => {
    console.log("sdfdskfdj")
    this.setState({ cells :[] })
  }

  render() {
    return ( 
    <div className='login-form'>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
        .cell {
          border: 1px solid #fff;
          min-height : 60px;
          max-height : 60px;
          min-width : 60px;
          max-width : 60px;
        }
      `}</style>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Grid>
              <Grid.Column width={4}>
                2048
              </Grid.Column>
              <Grid.Column width={8}>
                <Button circular color='teal' icon='refresh' onClick={ this._handleClick }/>
                <Button circular color='teal' icon onClick={ this._handleClick }>
                  <Icon name='refresh'/>
                </Button> 
              </Grid.Column>
            </Grid>
          </Header>
          <Segment stacked>
            <Game cells={ this.state.cells } />          
          </Segment>
          <Message>
            Created by <a href='julien.mustiere.info'>Julien Mustière</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>     
    );
  }
}

export default App;
