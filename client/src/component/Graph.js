import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';
import {Tooltip} from 'react-bootstrap';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {hover: {index: null}};

    this.renderPie = this.renderPie.bind(this);
    this.color = d3.scaleOrdinal(d3.schemeCategory10).bind(this);
  }

  hover() {
    var {height} = this.props
    var {option, votes, transform} = this.state.hover;
    var text = `${option}: ${votes}`;

    transform[0] = transform[0] + height / 2
    transform[1] = transform[1] + height / 2
    var divStyle = {
      position: 'absolute',
      left: transform[0],
      top: transform[1],
      pointerEvents: 'none',
    }
    return (
        <Tooltip positionLeft = {transform[0]} positionTop = {transform[1]} placement id="tooltip" className="in" style = { {pointerEvents: 'none'} }>
          {text}
        </Tooltip>
    )
  }

  setHover(index, option, votes, transform) {
    return () => this.setState({hover: {index, option, votes, transform}})
  }

  deleteHover() {
    return () => this.setState({hover: {index: null}})
  }

  renderPie(outerRadius, innerRadius) {
    var {options} = this.props.voteForm;

    const pie = d3.pie()
      .value( d => d.votes)
      .sort(null)
    const path = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);
    const label = d3.arc()
      .outerRadius(outerRadius + 50)
      .innerRadius(innerRadius);

    return (
      pie(options).map( (partPie, index) => {
        var {option, votes} = partPie.data;
        return (
          <g key = {'pie' + index} onMouseOver = {this.setHover(index, option, votes, label.centroid(partPie))} onMouseOut = {this.deleteHover()}>
            <path d = {path(partPie)} fill = {this.color(index)} stroke = 'white' strokeWidth = { (this.state.hover.index === index) ? '2' : '0'}/>
          </g>
        )
      })
    )
  }

  renderLabels() {
    var {options} = this.props.voteForm;

    return (
      options.map( (option, index) => {
        return (
          <g key = {"option" + index} transform = {`translate(${5}, ${index * 20})`}>
            <rect x = {0} y = {0} width = {10} height = {10} fill = {this.color(index)} />
            <text  x = {20} y = {10} >{option.option}</text>
          </g>
        )
      })
    )
  }

  render () {
    var {width, height} = this.props;
    var {options} = this.props.voteForm

    var transformPie = `translate(${height / 2}, ${height / 2})`;
    var transformLabels = `translate(${height + 20}, ${height - options.length * 20 - 10})`

    return (
      <div style = { {position: 'relative'} }>
        <svg width={width} height={height} id='graph'>
          <g transform = {transformPie}>
            {this.renderPie(height / 2, 0)}
          </g>
          <g transform = {transformLabels}>
            {this.renderLabels()}
          </g>
        </svg>
        {this.state.hover.index != null && this.hover() }
      </div>
    )
  }
}

const mapStateToProps = ({voteForm}) => {
  return {voteForm};
}
export default connect(mapStateToProps)(Graph);
