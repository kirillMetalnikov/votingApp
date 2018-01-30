import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.renderPie = this.renderPie.bind(this);
    this.color = d3.scaleOrdinal(d3.schemeCategory10).bind(this);
  }

  renderPie(outerRadius, innerRadius) {
    var {options} = this.props.voteForm;

    const pie = d3.pie()
      .value( d => d.votes)
      .sort(null)
    const path = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);

    return (
      pie(options).map( (partPie, index) => {
        return <path key = {'pie' + index} d = {path(partPie)} fill = {this.color(index)} />
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
      <svg width={width} height={height} id='graph'>
        <g transform = {transformPie}>
          {this.renderPie(height / 2, 0)}
        </g>
        <g transform = {transformLabels}>
          {this.renderLabels()}
        </g>
      </svg>
    )
  }
}

const mapStateToProps = ({voteForm}) => {
  return {voteForm};
}
export default connect(mapStateToProps)(Graph);
