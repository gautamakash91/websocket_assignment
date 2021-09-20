import React from "react";
import InnerTable_RRBF from "./innerTable_rrbf";
import InnerTable_Callput from "./innerTable_callput";


export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showRRBF: true
    }
  }

  

  handleSelect = (selection) => {
    selection === "rrbf" ?
      this.setState({
        showRRBF: true
      })
      :
      this.setState({
        showRRBF: false
      })
  }


  render() {
    return (
      <>
        <table className="table-container">
          <tr>
            <th
              className={this.state.showRRBF && "selected_tab"}
              onClick={() => { this.handleSelect("rrbf") }}
            >
              RR/BF table
            </th>
            <th
              className={this.state.showRRBF === false && "selected_tab"}
              onClick={() => { this.handleSelect("callput") }}
            >
              Call/Put table
            </th>
            <th>
              Vol Curve
            </th>
            <th>
              Vol Smile
            </th>
            <th>
              Heatmaps
            </th>
          </tr>
        </table>

        {/* SHOW RR/BF OR SHOW CALL/PUTT */}
        {this.state.showRRBF ?
          <InnerTable_RRBF />
          :
          <InnerTable_Callput />
        }
      </>
    )
  }
}