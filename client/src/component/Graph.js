import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as d3 from 'd3';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.renderGraph = this.renderGraph.bind(this)
  }

  renderGraph() {
    if (!this.props.voteForm) {
      console.log("loading");
      return;
    };
    console.log('graph');
    console.log(this.props.voteForm);

    var {target} = this.refs;
    var {width, height} = this.props;
    var {options} = this.props.voteForm;
    var outerRadius = height / 2;
    var innerRadius = 0;


    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var pie = d3.pie()
      .value( d => d.votes)
      .sort(null)

    var path = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);

    var svg = d3.select(target)
      .append('svg')
      .attr('height', height)
      .attr('width', width)

    var g = svg
      .append("g")
      .attr("transform", `translate(${width - outerRadius}, ${height / 2})`);

    var arc = g.selectAll(".arc")
      .data(pie(options))
      .enter()
      .append("g")
      .attr("class", "arc");

    arc.append("path")
      .attr("d", path)
      .attr("fill", (d, i) => color(i) );
  }

  componentDidMount() {
    this.renderGraph();
  }

  componentDidUpdate() {
    this.renderGraph();
  }

  render () {
    return (
      <div>
        <div ref='target' />
      </div>
    )
  }
}

const mapStateToProps = ({voteForm}) => {
  return {voteForm};
}
export default connect(mapStateToProps)(Graph);
