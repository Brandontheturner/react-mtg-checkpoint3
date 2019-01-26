import React, { Component } from "react";
import Cards200 from "./Cards200";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      cardOffset: 1,
      fetchedLimit: 1
    };
  }
  componentDidMount() {
    fetch("http://api.magicthegathering.io/v1/cards/?page=150")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ data });
      });
  }
  //create seperate fetch requests for each grouping of cards since there is a limit of 100 cards per page. have more cards button fetch the next 100 card grouping

  fetchCards = () => {
    let url = "http://api.magicthegathering.io/v1/cards/?page+1";
    let cardOffset = (this.state.cardOffset += 1);

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ data, cardOffset }));
  };

  render() {
    if (this.state.data === null) {
      return <h1 className="loading">Gathering Magic</h1>;
    }

    return (
      <div className="App">
        {this.state.Cards200}
        <h1>Magic The Gathering Reference Library</h1>
        <div className="theCards">
          {this.state.data.cards.map((card, i) => {
            return (
              <div className="cardImage">
                <img key={i} src={card.imageUrl} alt="" />
              </div>
            );
          })}
        </div>
        <button className="button" onClick={() => this.fetchCards()}>
          More Cards
        </button>
        {/* <input type="text" placeholder="search" /> */}
        {/* <div className="content">
        <div className="container">
          <section className="section">
            <ul>
              {this.state.cards.map(item => (
                <li key={item}>{item}</li>
                ))}
          </ul>
            </section>
            <hr />
            <section className="section">
              <form className="form" id="addItemForm">
                <input 
                  type="text"
                  className="input"
                  id="addInput"
                  placeholder="Find the card you are looking for..."
                />
                <button className="button is-info" onClick={this.addItem}>
                Card Search
                </button>
              </form>
            </section>
        </div>
      </div> */}
      </div>
    );
  }
}
export default App;
// export default cards100;
