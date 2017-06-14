import React, {Component} from 'react';
import Day from "./Day/Day"
//import '../styles/main.scss'
import FakeData from "./../FakeData"


class App extends Component {
  constructor(){
    super();
    let maxNumber=0;
    let width=this.findMaxNumberOfEventsInWeek(FakeData.events);
    width.forEach((e, i)=>{
      if (e===0) width[i]=1;
      maxNumber+=width[i];
    });
    width.forEach((e,i)=>{
      width[i]=(1400*(e/maxNumber));  //CONST
    });
    let min = 1500;
    let max = 0;
    FakeData.events.forEach((i) => {
      if (min > (60 * i.h + i.m)) min = (60 * i.h + i.m);
      if (max < (60 * i.h + i.m + i.l)) max = (60 * i.h + i.m + i.l);
    });
    this.state={
      width: width,
      min: min,
      max: max,
    }
    
  }
  findMaxNumberOfEventsInRow(list) {
    let list2 = [];
    list.forEach((e) => {
      list2=list2.concat([{"t": "s", "d": (e.h * 60 + e.m)}]);
      list2=list2.concat([{"t": "e", "d": (e.h * 60 + e.m + e.l)}]);
    });
    list2.sort((a, b) => (a.d - b.d));
    let temp = 0;
    let max = 0;
    list2.forEach((e) => {
      if (e.t === "s") temp++;
      if (e.t === "e") temp--;
      if (temp > max) max = temp;
    });
    return max;
  }
  findMaxNumberOfEventsInWeek(list) {
    let width = [];
    width = width.concat([this.findMaxNumberOfEventsInRow(list.filter((i) => (i.d === "mon")))]);
    width = width.concat([this.findMaxNumberOfEventsInRow(list.filter((i) => (i.d === "tue")))]);
    width = width.concat([this.findMaxNumberOfEventsInRow(list.filter((i) => (i.d === "wen")))]);
    width = width.concat([this.findMaxNumberOfEventsInRow(list.filter((i) => (i.d === "thu")))]);
    width = width.concat([this.findMaxNumberOfEventsInRow(list.filter((i) => (i.d === "fri")))]);
    width = width.concat([this.findMaxNumberOfEventsInRow(list.filter((i) => (i.d === "sut")))]);
    width = width.concat([this.findMaxNumberOfEventsInRow(list.filter((i) => (i.d === "sun")))]);
    width.forEach((e, i)=>{
      if (e===0) width[i]=1;
    });
    return width;
  }

  render() {
    return (
      <div className="App">
        <Day day="mon" events={FakeData.events.filter((i) => (i.d === "mon"))} min={this.state.min} max={this.state.max} width={this.state.width[0]}/>
        <Day day="tue" events={FakeData.events.filter((i) => (i.d === "tue"))} min={this.state.min} max={this.state.max} width={this.state.width[1]}/>
        <Day day="wen" events={FakeData.events.filter((i) => (i.d === "wen"))} min={this.state.min} max={this.state.max} width={this.state.width[2]}/>
        <Day day="thu" events={FakeData.events.filter((i) => (i.d === "thu"))} min={this.state.min} max={this.state.max} width={this.state.width[3]}/>
        <Day day="fri" events={FakeData.events.filter((i) => (i.d === "fri"))} min={this.state.min} max={this.state.max} width={this.state.width[4]}/>
        <Day day="sut" events={FakeData.events.filter((i) => (i.d === "sut"))} min={this.state.min} max={this.state.max} width={this.state.width[5]}/>
        <Day day="sun" events={FakeData.events.filter((i) => (i.d === "sun"))} min={this.state.min} max={this.state.max} width={this.state.width[6]}/>
      </div>
    );
  }
}

export default App;

