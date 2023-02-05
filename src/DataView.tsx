import React from "react";
import axios from "axios";
import z from "zod";

export default class DataView extends React.Component {
  state = {
    data: [],
  };

  componentDidMount(): void {
    axios.get("/steamNews/20").then((res) => {
      this.setState({ data: res.data.data });
    });
  }

  render() {
    return (
      <ul>
        {this.state.data.map((d: { gid: Number; title: String }) => (
          <li key={z.coerce.string().parse(d.gid)}>{d.title}</li>
        ))}
      </ul>
    );
  }
}
