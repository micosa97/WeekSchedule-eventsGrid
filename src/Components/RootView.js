import React from 'react';
import Day from "./Day/Day"
import FakeData from "./../FakeData"


export default class RootView extends React.Component {
  constructor(){
    super();
    let selfWidth = (window.innerWidth || document.body.clientWidth)-50;
    let selfHeight = (window.innerHeight || document.body.clientHeight)-90;
    let maxNumber=0;
    let width=this.findMaxNumberOfEventsInWeek(FakeData.events);
    width.forEach((e, i)=>{
      if (e===0) width[i]=1;
      maxNumber+=width[i];
    });
    width.forEach((e,i)=>{
      width[i]=(selfWidth*(e/maxNumber));  //CONST
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
      selfWidth: selfWidth,
      selfHeight: selfHeight
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
    width = width.concat([this.findMaxNumberOfEventsInRow(list.filter((i) => (i.d === "sat")))]);
    width = width.concat([this.findMaxNumberOfEventsInRow(list.filter((i) => (i.d === "sun")))]);
    width.forEach((e, i)=>{
      if (e===0) width[i]=1;
    });
    return width;
  }

  render() {
    return (
      <div className="App" style={{width: this.state.selfWidth, height:this.state.selfHeight+40}}>
        <Day day="mon" events={FakeData.events.filter((i) => (i.d === "mon"))} min={this.state.min} max={this.state.max} width={this.state.width[0]-2} height={this.state.selfHeight}/>
        <Day day="tue" events={FakeData.events.filter((i) => (i.d === "tue"))} min={this.state.min} max={this.state.max} width={this.state.width[1]-2} height={this.state.selfHeight}/>
        <Day day="wen" events={FakeData.events.filter((i) => (i.d === "wen"))} min={this.state.min} max={this.state.max} width={this.state.width[2]-2} height={this.state.selfHeight}/>
        <Day day="thu" events={FakeData.events.filter((i) => (i.d === "thu"))} min={this.state.min} max={this.state.max} width={this.state.width[3]-2} height={this.state.selfHeight}/>
        <Day day="fri" events={FakeData.events.filter((i) => (i.d === "fri"))} min={this.state.min} max={this.state.max} width={this.state.width[4]-2} height={this.state.selfHeight}/>
        <Day day="sat" events={FakeData.events.filter((i) => (i.d === "sat"))} min={this.state.min} max={this.state.max} width={this.state.width[5]-2} height={this.state.selfHeight}/>
        <Day day="sun" events={FakeData.events.filter((i) => (i.d === "sun"))} min={this.state.min} max={this.state.max} width={this.state.width[6]-2} height={this.state.selfHeight}/>
      </div>
    );
  }
}



