import React from "react";
import Header from "./header";
import Table from "./table";
import "../styles/styles.css";

export default class Main extends React.Component{
  render(){
    return(
      <div className="main-container">
        <Header />

        <Table />
      </div>
    )
  }
}