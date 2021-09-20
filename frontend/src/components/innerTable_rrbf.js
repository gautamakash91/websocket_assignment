import React from "react";
import moment from "moment";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000');

export default class InnerTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rrbf: []
    }
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);

      const {
        rrbf
      } = dataFromServer;

      if (rrbf) {
        this.state.rrbf.push(rrbf);
        this.setState({
          rrbf: this.state.rrbf
        });
      }
    };
  }

  render() {

    return (
      <table className="inside-table">
        <tr className="table-head">
          <th>

          </th>
          <th>
            Exp Date
          </th>
          <th>
            ATM
          </th>
          <th>
            25d R/R
          </th>
          <th>
            10d R/R
          </th>
          <th>
            25d B/F
          </th>
          <th>
            10d B/F
          </th>
        </tr>

        {this.state.rrbf.map((row, index) => (
          <tr className={index % 2 === 0 ? "table-body-1" : "table-body-2"}>
            <td>
              {row.time}
            </td>
            <td>
              {moment(row.exp_date).format("DD MMM YYYY")}
            </td>
            <td>
              {row.atm}
            </td>
            <td>
              {row["25d_rr"]}
            </td>
            <td>
              {row["10d_rr"]}
            </td>
            <td>
              {row["25d_bf"]}
            </td>
            <td>
              {row["10d_bf"]}
            </td>
          </tr>
        ))
        }
      </table>
    )
  }
}