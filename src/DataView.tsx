import React from "react";
import axios from "axios";
import z from "zod";
import ReactLoading from "react-loading";
import "./DataView.scss";
import Modal from "./Component/Modal/index";

type DVProps = {}
type DVState = { 
  data: [], 
  searchTerm: string, 
  loading: boolean,
  show: boolean,
  selectedTitle: string,
  selectedAppId: string
}

export default class DataView extends React.Component<DVProps, DVState> {
  constructor(props:any) {
    super(props);
    this.state = {
      data: [],
      searchTerm: "",
      loading: true,
      show: false,
      selectedTitle: "",
      selectedAppId: ""
    };
  }
  

  componentDidMount(): void {
    axios.get("/steamApps/20").then((res) => {
      this.setState({ data: res.data.data, loading: false });
    });
  }

  handleChange = (event: any) => {
    this.setState({searchTerm: (event.target as HTMLTextAreaElement).value});
  };

  showModal = (e: any) => {
    if (this.state.show && e.target.nodeName === "LI") {
      // user clicked on a list element while modal was open,
      // force it closed and refresh data on it
      this.setState({
        show: false,
        selectedTitle: "",
        selectedAppId: "",
      })
    }
    this.setState({
      show: !this.state.show,
      selectedTitle: !this.state.show ? e.target.text : "",
      selectedAppId: !this.state.show ? e.target.id : ""
    });
  }

  render() {
    return (
      <div className="DataViewContainer">
        <p>This page pulls down several thousand Steam titles at random 
          and lets you search across the list of titles. You'll be able 
          to click them to get info about the game soon, 
          I just haven't done that part yet.
        </p>
        <p>Also, please use the Close button in the modal, I'm still
          trying to find a clever way to close it properly if you click
          other stuff while it's open.
        </p>

        <input
          className="searchBar"
          type="text"
          id="message"
          name="message"
          onChange={this.handleChange}
        ></input>

        { this.state.loading ? <ReactLoading
                className="load"
                type="spinningBubbles"
                color="#0000FF"
                height={100}
                width={50}
              /> : null
        }
        <Modal 
          onClose={this.showModal} 
          show={this.state.show}
          selectedTitle={this.state.selectedTitle}
          selectedAppId={this.state.selectedAppId}>
            Modal Contents!
        </Modal>
        <ul>
          {this.state.data.slice(0,600)
            .filter((d: { appid: Number; name: String }) => d.name.includes(this.state.searchTerm))
            .map((d: { appid: Number; name: String }) => (
              <li key={z.coerce.string().parse(d.appid)} 
              id={z.coerce.string().parse(d.appid)}
              onClick={e => {
                this.showModal(e);}}
              >{d.name}</li>
          ), this)}
        </ul>
      </div>
    );
  }
}
