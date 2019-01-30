import React, { Component } from "react";
import "./App.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      cardOffset: 1,
      fetchedLimit: 1,
      cardPage: 2,
      isLoading: true,
      modal: false,
      currenttype: "",
      currentName: "",
      currentmanaCost: "",
      currentimageUrl: "",
      currentrarity: "",
      currentsetName: "",
      currenttext: "",
      currentpower: "",
      currenttoughness: ""
    };
  }
  componentDidMount() {
    fetch("http://api.magicthegathering.io/v1/cards/?page=1")
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ data }, () => this.dataLoaded()));
  }

  dataLoaded = () => {
    console.log("data loaded");
    this.setState({ isLoading: false });
  };
  //create seperate fetch requests for each grouping of cards since there is a limit of 100 cards per page. have more cards button fetch the next 100 card grouping

  fetchCards = page => {
    console.log("fetchCards", page);

    let url = "http://api.magicthegathering.io/v1/cards/?page=" + page;
    // let cardOffset = (this.state.cardOffset += 1);

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ data }));
    this.setState({ cardPage: page + 1 });
    window.scrollTo(0, 0);
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  cardData = card => {
    this.setState({
      currenttype: card.type,
      currentName: card.name,
      currentmanaCost: card.manaCost,
      currentimageUrl: card.imageUrl,
      currentrarity: card.rarity,
      currentsetName: card.setName,
      currenttext: card.text,
      currentpower: card.power,
      currenttoughness: card.toughness
    });
    this.toggleModal();
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="App">
          <h1 className="loading" />
          <IsLoading />
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1 className="title" />
          <h1>Card Library</h1>
          <RenderCards
            data={this.state.data}
            page={this.state.cardPage}
            fetchCards={this.fetchCards}
            cardData={this.cardData}
            toggleModal={this.toggleModal}
            modal={this.state.modal}
            currenttype={this.state.currenttype}
            currentName={this.state.currentName}
            currentmanaCost={this.state.currentmanaCost}
            currentimageUrl={this.state.currentimageUrl}
            currentrarity={this.state.currentrarity}
            currentsetName={this.state.currentsetName}
            currenttext={this.state.currenttext}
            currentpower={this.state.currentpower}
            currenttoughness={this.state.currenttoughness}
          />
        </div>
      );
    }
  }
}

const IsLoading = () => {
  return <h1 className="loading">Gathering Magic....</h1>;
};

const RenderCards = props => {
  // console.log(this.props.data);
  return (
    <div>
      <div className="theCards">
        {props.data.cards.map((card, i) => {
          return (
            <div className="cardImage">
              <img
                key={i}
                src={card.imageUrl}
                alt=""
                onClick={() => props.cardData(card)}
              />
            </div>
          );
        })}
      </div>
      <Button className="button" onClick={() => props.fetchCards(props.page)}>
        Next Page
      </Button>
      <Modal
        className="modalContainer"
        isOpen={props.modal}
        toggle={() => props.toggleModal()}
      >
        <ModalHeader toggle={() => props.toggleModal()}>
          <div className="cardName"> {props.currentName}</div>
        </ModalHeader>
        <ModalBody>
          {/* {props.currentmanaCost} */}
          <img
            className="modalImage"
            src={props.currentimageUrl}
            alt={props.currentName}
          />
          <div className="cardInfo">
            {" "}
            <p>{props.currentsetName}</p>
            <p>{props.currentrarity}</p>
            <p>{props.currenttext}</p>
            <h5>Power</h5>
            <p>{props.currentpower}</p>
            <h5>Toughness</h5>
            <p>{props.currenttoughness}</p>
            <p>{props.currenttype}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.toggleModal()}>
            Done
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default App;
// export default cards100;
