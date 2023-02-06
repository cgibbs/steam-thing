import React from "react";
import axios from "Axios";
import z from "zod";
import ReactLoading from "react-loading";
import "./DataView.css";

type DVProps = {}
type DVState = { data: [], searchTerm: string, loading: boolean }

export default class DataView extends React.Component<DVProps, DVState> {
  constructor(props:any) {
    super(props);
    this.state = {
      data: [],
      searchTerm: "",
      loading: true,
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

  render() {
    return (
      <div>
        <p>This page pulls down several thousand Steam titles at random 
          and lets you search across the list of titles.</p>
        <p>You'll be able to click them to get info about the game soon, 
          I just haven't done that part yet.</p>

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
        <ul>
          {this.state.data.slice(1,6000)
            .filter((d: { appid: Number; name: String }) => d.name.includes(this.state.searchTerm))
            .map((d: { appid: Number; name: String }) => (
              <li key={z.coerce.string().parse(d.appid)}>{d.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
