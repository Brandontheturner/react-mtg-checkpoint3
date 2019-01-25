import React, { Component } from "react";
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
    fetch("http://api.magicthegathering.io/v1/cards/?pageSize=1")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ data });
      });
  }

  fetchCards = () => {
    let url =
      "http://api.magicthegathering.io/v1/cards/?pageSize=1" +
      this.state.cardOffset;
    let cardOffset = (this.state.cardOffset += 1);

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ data, cardOffset }));
  };

  render() {
    if (this.state.data === null) {
      return <h1>Magic is happening</h1>;
    }

    return (
      <div className="App">
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
        <input type="text" placeholder="search" />
      </div>
    );
  }
}
export default App;
