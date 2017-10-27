import React, { Component } from 'react';
import Game from './Game';
import { Grid, Header, Message, Segment, Icon, Label } from 'semantic-ui-react'

class App extends Component {
  constructor(){
    super();
    this.state = {
      score : 0,
      bestScore : localStorage.getItem('bestScore') || 0,
    }
  }

  _handleClick = () => {
    this.refs.game.refresh();
  }

  changeScore = (score) => {
    let bestScore = (score >= this.state.bestScore) ? score : this.state.bestScore;
    this.setState({ score : score , bestScore : bestScore });
    localStorage.setItem('bestScore', this.state.bestScore) 
  }

  render() {
    return ( 
    <div className='login-form'>
      <style>{`
        html, body {
          box-sizing: border-box;
          font-family: 'Roboto';                    
          height: 100%;
        }    
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
        .cell {
          border: 1px solid #fff;
          font-family: 'Acme';          
          min-height : 72px;
          max-height : 72px;
          min-width : 72px;
          max-width : 72px;
        }
      `}</style>
      <Grid
        textAlign='center'
        style={{ height: '100%', margin : 0 }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 349 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Grid style={{alignItems: 'end'}}>
              <Grid.Column width={4}>
                2048
              </Grid.Column>
              <Grid.Column as="div" width={8}>
                <Label>
                  <Icon name='trophy' />
                  { this.state.bestScore }
                </Label><br/> 
                Score : { this.state.score }               
              </Grid.Column>
              <Grid.Column as="div" style={{paddingLeft: '30px'}} width={2}>
                  <Icon name="refresh" onClick={ this._handleClick }/>
              </Grid.Column>
            </Grid>
          </Header>
          <Segment stacked>
            <Game ref="game" changeScore={ this.changeScore } />          
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
