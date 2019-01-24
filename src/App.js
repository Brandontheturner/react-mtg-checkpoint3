import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      cardOffset: 40,
      fetchedLimit: 20
    };
  }

  componentDidMount() {
    fetch(
      "http://api.magicthegathering.io/v1/cards/?pageSize=" +
        this.state.fetchedLimits
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ data });
      });
  }

  fetchCards = () => {
    let url =
      "http://api.magicthegathering.io/v1/cards/?pageSize=" +
      this.state.cardOffset;
    let cardOffset = (this.state.cardOffset += 20);

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
              <div>
                <img key={i} src={card.imageUrl} alt="" />
              </div>
            );
          })}
        </div>
        <button className="button" onClick={() => this.fetchCards()}>
          More Cards
        </button>
      </div>
    );
  }
}
export default App;
