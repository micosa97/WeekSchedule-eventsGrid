import React from "react";

export default class GroupsOfEvents extends React.Component {
  constructor(props) {
    super(props);
    let group = this.props.group;
    let max = this.findMaxNumberOfEventsInRow(group);

    group.sort((a, b) => {
      if (a.h * 60 + a.m - b.h * 60 - b.m!==0)
        return (a.h * 60 + a.m - b.h * 60 - b.m);
      else
        return (b.l-a.l);
        });
    let firstColumn = [];
    while (group.length > 0) {
      let last = group[0];
      firstColumn = firstColumn.concat([last]);
      group = group.filter((e) => (e.h * 60 + e.m > last.h * 60 + last.m + last.l + 3));
    }
    let events = this.props.group.filter(f => !firstColumn.includes(f));
    let list2 = [];
    events.forEach((e, i) => {
      list2 = list2.concat([{"t": "s", "d": (e.h * 60 + e.m), "id": i}]);
      list2 = list2.concat([{"t": "e", "d": (e.h * 60 + e.m + e.l)}]);
    });
    list2.sort((a, b) => (a.d - b.d));
    let groupStartTimes = [];
    let groupEndTimes = [];
    let groupsOfEvents = [];
    let groupCounter = -1;
    let counter = 0;
    list2.forEach((e) => {
      if (e.t === "s") {
        counter++;
        if (counter === 1) {
          groupCounter++;
          groupsOfEvents[groupCounter] = [];
          groupStartTimes[groupCounter] = e.d;
        }
        groupsOfEvents[groupCounter] = groupsOfEvents[groupCounter].concat([events[e.id]]);
      } else {
        counter--;
        if (counter === 0) groupEndTimes[groupCounter] = e.d;
      }
    });
    this.state = {
      firstColumn: firstColumn,
      groupsOfEvents: groupsOfEvents,
      groupStartTimes: groupStartTimes,
      groupEndTimes: groupEndTimes,
      maxEventsInRow: max
    }
  }

  findMaxNumberOfEventsInRow(list) {
    let list2 = [];
    list.forEach((e) => {
      list2 = list2.concat([{"t": "s", "d": (e.h * 60 + e.m)}]);
      list2 = list2.concat([{"t": "e", "d": (e.h * 60 + e.m + e.l)}]);
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

  render() {
    return (
      <div className="group"
           style={{width: this.props.width + "px", height: this.props.height + "px", top: this.props.top + "px", left: this.props.left+"px"}}>
        <div className="column">
          {this.state.firstColumn.map((e) =>
            <div className="event"
                 style={{
                   top: this.props.height * (e.h * 60 + e.m - this.props.min) / (this.props.max - this.props.min) + "px",
                   height: -4+this.props.height * (e.l) / (this.props.max - this.props.min) + "px",
                   width: -4+this.props.width/this.state.maxEventsInRow

                 }}>
              <div className="name">{e.name}</div>
            </div>)}
        </div>
        {this.state.groupsOfEvents.map((e, i)=>
          <GroupsOfEvents
            min={this.state.groupStartTimes[i]}
            max={this.state.groupEndTimes[i]}
            top={this.props.height*(this.state.groupStartTimes[i]-this.props.min)/(this.props.max-this.props.min)}
            left={this.props.width/this.state.maxEventsInRow}
            width={this.props.width-this.props.width/this.state.maxEventsInRow}
            height={this.props.height*(this.state.groupEndTimes[i]-this.state.groupStartTimes[i])/(this.props.max-this.props.min)}
            group={e}
          />
        )}

        {}

      </div>

    )
  }
}



