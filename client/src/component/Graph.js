import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import {Tooltip, Popover, Overlay} from 'react-bootstrap';

class Pie extends Component {
  constructor(props) {
    super(props)
    this.state = {active: null}
  }

  mouseOver(index, option, votes) {
    return () => {
      this.setState({active: index})
      this.props.setToolTip(true, this.refs['target' + index], option, votes)
    }
  }

  mouseOut() {
    this.setState({active: null})
    this.props.setToolTip(false)
  }

  render() {
    var {options, outerRadius, innerRadius, colors} = this.props;

    const pie = d3.pie()
      .value( d => d.votes)
      .sort(null)
    const path = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);
    const pointTooltip = d3.arc()
      .outerRadius(outerRadius + 50)
      .innerRadius(innerRadius);

    return (
      pie(options).map( (partPie, index) => {
        var {option, votes} = partPie.data;
        return (
          <g key = {'pie' + index}>
            <path d = {path(partPie)} fill = {colors[index]} stroke = {this.state.active === index ? colors[index] : 'white'} onMouseOver = {this.mouseOver(index, option, votes)} onMouseOut = {this.mouseOut.bind(this)}/>
            <g ref = {'target' + index} transform = {`translate(${pointTooltip.centroid(partPie)})`}>
              {/* For <Tooltip> need width and heigth. Without these parametrs, it don't work as need */}
              <rect x = {0} y = {0} width = {1} height = {1} fill = {colors[index]} />
            </g>
          </g>
        )
      })
    )
  }
}

class Labels extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var {options, colors} = this.props;

    return (
      options.map( (option, index) => {
        return (
          <g key = {"option" + index} transform = {`translate(${5}, ${index * 20})`}>
            <rect x = {0} y = {0} width = {10} height = {10} fill = {colors[index]} />
            <text  x = {20} y = {10} >{option.option}</text>
          </g>
        )
      })
    )
  }

}

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolTip: {show: false, target: null, option: '', votes: ''},
    };
    this.color = d3.scaleOrdinal(d3.schemeCategory10).bind(this);
  }

  setToolTip(show, ref, option, votes) {
    if(!show) {
      var {toolTip} = this.state;
      toolTip.show = show;
      this.setState({toolTip})
    } else {
      this.setState({toolTip: {show, ref, option, votes}})
    }
  }

  render () {
    var {width, height, options} = this.props;

    var transformPie = `translate(${height / 2}, ${height / 2})`;
    var transformLabels = `translate(${height + 20}, ${height - options.length * 20 - 10})`

    var colors = new Array(10).fill(undefined).map( (item, index) => {
      return this.color(index)
    })

    var {toolTip} = this.state;

    return (
      <div style = { {position: 'relative'} }>
        <svg width={width} height={height} id='graph'>
          <g transform = {transformPie}>
            <Pie outerRadius = {height / 2} innerRadius = {0} options = {options} colors = {colors} setToolTip = {this.setToolTip.bind(this)}/>
          </g>
          <g transform = {transformLabels}>
            <Labels options = {options} colors = {colors} />
          </g>
        </svg>
        <Overlay container = {this} placement="top" show = {toolTip.show} target = {toolTip.ref}>
          <Tooltip id = "tooltip" className="in" style = { {pointerEvents: 'none'} }>{toolTip.option}: {toolTip.votes}</Tooltip>
        </Overlay>

      </div>
    )
  }
}

export default Graph;
