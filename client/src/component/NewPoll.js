import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addPoll} from '../actions';
import {setIsNewPoll} from '../actions';

class NewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {options: ["", ""], name: ""};
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleDeleteOption(index) {
    return (e) => {
      e.preventDefault();

      var {options} = this.state;
      options.splice(index, 1);
      this.setState({options});
    }
  }

  handleAddOption(e) {
    e.preventDefault();

    var {options} = this.state;
    options.push("");
    this.setState({options});
  }

  handleChangeOption(index) {
    return e => {
      e.preventDefault();
      var {options} = this.state;
      options[index] = e.target.value;
      this.setState({options});
    }
  }

  handleChangeQuestion(e) {
    e.preventDefault();
    var name = e.target.value;
    this.setState({name});
  }

  handleSubmit(e) {
    e.preventDefault();
    var {options, name} = this.state;
    this.props.setIsNewPoll(false);
    this.props.addPoll({name, options});

  }
  handleCancel(e) {
    e.preventDefault();
    this.props.setIsNewPoll(false);
  }

  renderDeleteButton(index) {
    if (this.state.options.length > 2) {
      return <button onClick = {this.handleDeleteOption(index)}>Delete</button>
    }
  }

  renderOptions() {
    var {options} = this.state;
    // if used "onChange" oposite to "onBlur" it will not right work.
    // Because we change array in this.state and it will redender all input filds.
    // ANd will start truble (with focus....)
    return options.map ( (option, index) => {
      return (
          <div key={option + index}>
            <input defaultValue = {option} required placeholder = {"Option " + (index + 1)} onBlur = {this.handleChangeOption(index)}/>
            {this.renderDeleteButton(index)}
          </div>
      )
    })
  }

  render() {
    return (
      <div className = "modal">
        <h3>New poll</h3>
        <form onSubmit = {this.handleSubmit.bind(this)}>
          <input required placeholder = "Question?" onBlur = {this.handleChangeQuestion.bind(this)}/>
          {this.renderOptions()}
          <button onClick={this.handleAddOption}>Add</button>
          <button type ="submit">Save</button>
          <button onClick={this.handleCancel.bind(this)}> Cancel</button>
        </form>

      </div>

    )
  }
};

export default connect(null, {addPoll, setIsNewPoll})(NewPoll);
