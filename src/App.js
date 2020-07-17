import React, { Component } from "react";
import "./App.css";
import { Howl } from "howler";
import Draggable from "react-draggable";

const buttons = {
  bank1: [
    {
      id: "hard-club",
      keyTrigger: "Q",
      url: "https://freesound.org/data/previews/331/331589_5820980-lq.mp3",
    },
    {
      id: "house-drum",
      keyTrigger: "W",
      url: "https://freesound.org/data/previews/132/132584_2409787-lq.mp3",
    },
    {
      id: "bass-drum",
      keyTrigger: "E",
      url: "https://freesound.org/data/previews/459/459895_4448255-lq.mp3",
    },
    {
      id: "kick-drum",
      keyTrigger: "A",
      url: "https://freesound.org/data/previews/519/519279_3797507-lq.mp3",
    },
    {
      id: "fx-drum",
      keyTrigger: "S",
      url: "https://freesound.org/data/previews/232/232014_736471-lq.mp3",
    },
    {
      id: "hip-drum",
      keyTrigger: "D",
      url: "https://freesound.org/data/previews/4/4832_7423-lq.mp3",
    },
    {
      id: "maple-hoop",
      keyTrigger: "Z",
      url: "https://freesound.org/data/previews/84/84480_377011-lq.mp3",
    },
    {
      id: "al-hoop",
      keyTrigger: "X",
      url: "https://freesound.org/data/previews/25/25602_48671-lq.mp3",
    },
    {
      id: "light-hoop",
      keyTrigger: "C",
      url: "https://freesound.org/data/previews/168/168312_599528-lq.mp3",
    },
  ],
  bank2: [
    {
      id: "shaman-drum",
      keyTrigger: "Q",
      url: "https://freesound.org/data/previews/321/321132_1337335-lq.mp3",
    },
    {
      id: "african-drum",
      keyTrigger: "W",
      url: "https://freesound.org/data/previews/460/460090_1764667-lq.mp3",
    },
    {
      id: "deep-house-kick",
      keyTrigger: "E",
      url: "https://freesound.org/data/previews/347/347624_1126957-lq.mp3",
    },
    {
      id: "kick-atomize",
      keyTrigger: "A",
      url: "https://freesound.org/data/previews/494/494184_10655277-lq.mp3",
    },
    {
      id: "electronic-drum",
      keyTrigger: "S",
      url: "https://freesound.org/data/previews/425/425320_7425810-lq.mp3",
    },
    {
      id: "medium-drum",
      keyTrigger: "D",
      url: "https://freesound.org/data/previews/332/332388_1976991-lq.mp3",
    },
    {
      id: "kick-drum",
      keyTrigger: "Z",
      url: "https://freesound.org/data/previews/502/502951_4600366-lq.mp3",
    },
    {
      id: "stroper-drum",
      keyTrigger: "X",
      url: "https://freesound.org/data/previews/103/103365_1225281-lq.mp3",
    },
    {
      id: "synthetic-drum",
      keyTrigger: "C",
      url: "https://freesound.org/data/previews/268/268114_2127539-lq.mp3",
    },
  ],
};

class App extends Component {
  render() {
    return (
      <div className="conteiner">
        <Console />
      </div>
    );
  }
}

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      vol: 1.0,
      bank: "bank1",
      style : {boxShadow : "0px 0px 0px 0px #76bbf4", margin: "3px 3px 3px 3px"}
    };
    this.handleDrag = this.handleDrag.bind(this);
    this.switch = this.switch.bind(this);
    this.switchBank = this.switchBank.bind(this);
  }
  componentDidMount() {
    const clickButton = (key) => {
      try {
        document.getElementById(key.key.toUpperCase()).click()
      } catch (e) {
        console.log(`${key.key.toUpperCase()} is not in the Drum, sorry`);
      }
    };
    document.onkeydown = clickButton;
  }

  handleDrag(e, ui) {
    this.setState({
      vol: ui.x / 110,
    });
  }

  switch() {
    this.setState({
      power: !this.state.power,
    });
  }

  switchBank() {
    this.setState({
      bank: this.state.bank === "bank1" ? "bank2" : "bank1",
    });
  }

  render() {
    return (
      <div className="conteiner-inner">
        <div className="btns">
          {buttons[this.state.bank].map((elem) => {
            return (
              <button
                id={elem.keyTrigger}
                onClick={() => {
                  let sound = new Howl({
                    src: [elem.url],
                    volume: this.state.vol,
                  });
                  sound.play();
                }}
                className="btns-inst"
                key={elem.id}
              >
                {elem.keyTrigger}
              </button>
            );
          })}
        </div>
        <div className="console">
          <div>
            <p className="console-text power">power</p>
            <label className="switch">
              <input
                onClick={this.switch}
                type="checkbox"
                defaultChecked={true}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="drag-obj">
            <p></p>
            <Draggable
              axis="x"
              defaultPosition={{ x: 110, y: 0 }}
              bounds={{ left: 0, right: 110 }}
              onDrag={this.handleDrag}
              grid={[5,5]}
            >
              <div className="drag-p"></div>
            </Draggable>
            <div className="line"></div>
          </div>
          <p className="console-text bank">bank</p>
          <label className="switch">
            <input onClick={this.switchBank} type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    );
  }
}

export default App;
