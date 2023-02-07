import React from "react";
import "./modal.scss";
import axios from "axios";
import ReactLoading from "react-loading";

type ModalProps = {
    children: any,
    show: boolean,
    onClose: any,
    selectedTitle: string, // TODO: remove this, handled by Steam API call
    selectedAppId: string, 
}
type ModalState = {
  loading: boolean,
  steamAppDescription: string,
  steamAppTitle: string,
  startedUpdate: boolean,
}
export default class Modal extends React.Component<ModalProps, ModalState> {
    onClose = (e:any) => {
        this.props.onClose && this.props.onClose(e);
        this.setState({
          loading: false,
          steamAppDescription: "",
          steamAppTitle: "",
          startedUpdate: false,
        })
      };

    componentDidMount(): void {
      this.setState({
        loading: false,
        steamAppDescription: "",
        steamAppTitle: "",
        startedUpdate: false,
      })
    }

    componentDidUpdate(): void {
      if (!this.state.startedUpdate) {
        this.getGameInfo();
      }
    }

    getGameInfo(): void {
      if(this.props.selectedAppId != "") {
        this.setState({loading:true, startedUpdate: true});
        axios.get("/steamAppInfo/" + this.props.selectedAppId).then((res) => {
          console.log(res.data.data[this.props.selectedAppId]);
          console.log(res.data.data[this.props.selectedAppId].data.name);
          this.setState({
            steamAppTitle: res.data.data[this.props.selectedAppId].data.name,
            steamAppDescription: res.data.data[this.props.selectedAppId].data.detailed_description, 
            loading: false});
        })
      }
    }
    
    render() {
    if(!this.props.show){
        return null;
    }
    return (
        <div className="modal" id="modal">
          <h2>{this.state.steamAppTitle}</h2>
          <div className="content">
          { this.state.loading ? <ReactLoading
                className="load"
                type="spinningBubbles"
                color="#0000FF"
                height={100}
                width={50}
              /> : null
        }
            {this.state.steamAppDescription}
          </div>
          <div className="actions">
            <button className="toggle-button" onClick={this.onClose}>
              close
            </button>
          </div>
        </div>
      );
    }
  }