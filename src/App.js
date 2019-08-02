import React, {Component} from 'react';
import Card from "./components/Card/Card";
import Wrapper from "./components/Wrapper/Wrapper";
import Header from "./components/Header/Header";
import cards from "./components/cards.json";
import "./App.css";

class App extends Component {

  state = {
    cards,
    score: 0,
    highscore: 0,
    clicked: []
  };

  componentDidMount = () => {
    //when page loads do this
    this.newGame();
  }

  newGame = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({
        highscore: this.state.score //highscore getting set
      })
    };

    this.setState({
      cards,
      score: 0,
      clicked: []
    })
  }

  gameOver = () => {
    if(this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, function() {
        console.log(this.state.highscore);
      });
      this.state.cards.forEach(card => {
        card.count = false;
      });
      alert(`New Highscore: ${this.state.score} points`);
      this.setState({score: 0});
      return true;
    }
    //Alert will activate when a new highscore is added
  }
  clickCount = id => {
    if (this.state.clicked.includes(id)) {
      //we lost
      this.newGame();
      this.gameOver();
    } else {
      //correct guess
      //add guess to clicked
      let tempArr = this.state.clicked;
      tempArr.push(id);
      console.log(`updating the state!!!!!woohooo`)
      this.setState({
        clicked: tempArr
      });
      //increment counter
      let tempScore = this.state.score;
      tempScore ++;
      this.setState({
        score: tempScore
      })
      //shuffle cards
      this.shuffleCards()
    }
   
  }
  shuffleCards = () => {
    let tempArr = this.state.cards;
   for (let i = tempArr.length - 1; i > 0; i--) {
     let j = Math.floor(Math.random() * (i + 1));
     [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
   }
    this.setState({cards: tempArr});
  }
  //the function to shuffle the cards

  render() {
    console.log('im rendering')
    return (
      <Wrapper>
        <Header score={this.state.score} highscore={this.state.highscore}>Clicky Games</Header>
        {this.state.cards.map(card => (
          <Card name={card.image} image={card.image }id={card.id} key={card.id} clickCount={() => this.clickCount(card.id)}/>
        ))}
      </Wrapper>
    )
  }
}

export default App;
