import React from "react";
import GroupsOfEvents from "./GroupsOfEvents/GroupsOfEvents";

export default class Day extends React.Component {
  constructor(props){
    super(props);
    console.log("xd2");
    let list2 = [];
    this.props.events.forEach((e, i) => {
      list2=list2.concat([{"t": "s", "d": (e.h * 60 + e.m), "id":i}]);
      list2=list2.concat([{"t": "e", "d": (e.h * 60 + e.m + e.l)}]);
    });
    list2.sort((a, b) => (a.d - b.d));
    let groupStartTimes=[];
    let groupEndTimes=[];
    let groupsOfEvents=[];
    let groupCounter=-1;
    let counter = 0;
    list2.forEach((e)=>{
      if (e.t==="s") {
        counter++;
        if (counter===1) {
          groupCounter++;
          groupsOfEvents[groupCounter]=[];
          groupStartTimes[groupCounter]=e.d;
        }
        groupsOfEvents[groupCounter]=groupsOfEvents[groupCounter].concat([this.props.events[e.id]]);
      } else {
        counter--;
        if (counter===0) groupEndTimes[groupCounter]=e.d;
      }
    });
    this.state={
      groupsOfEvents: groupsOfEvents,
      groupStartTimes: groupStartTimes,
      groupEndTimes: groupEndTimes,
    }
  }
  render() {
    return (
      <div className="day" style={{width: this.props.width+"px"}}>
        <div className="dayHeader"> {this.props.day} </div>
        <div className="dayEventsGrid">
          {this.state.groupsOfEvents.map((e, i)=>
            <GroupsOfEvents
              min={this.state.groupStartTimes[i]}
              max={this.state.groupEndTimes[i]}
              top={800*(this.state.groupStartTimes[i]-this.props.min)/(this.props.max-this.props.min)}
              left={0}
              width={this.props.width}
              height={800*(this.state.groupEndTimes[i]-this.state.groupStartTimes[i])/(this.props.max-this.props.min)}
              group={e}
            />
          )}
        </div>
      </div>
    )
  }
}



