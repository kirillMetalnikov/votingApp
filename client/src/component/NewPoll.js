import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock, InputGroup, Glyphicon} from 'react-bootstrap';

import {addPoll} from '../actions';
import {setIsNewPoll} from '../actions';

class NewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {options: ["", ""], name: ""};
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleCancel = this.handleCancel.bind(this)
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
    this.setState({options: ["", ""], name: ""});
  }

  handleCancel() {
    this.setState({options: ["", ""], name: ""});
    this.props.setIsNewPoll(false);
  }

  renderDeleteButton(index) {
    if (this.state.options.length > 2) {
      return <InputGroup.Addon onClick = {this.handleDeleteOption(index)}><Glyphicon glyph="minus" /></InputGroup.Addon>
    }
    return <InputGroup.Addon />
  }

  renderOptions() {
    var {options} = this.state;
    // if used "onChange" oposite to "onBlur" it will not right work.
    // Because we change array in this.state and it will redender all input filds.
    // ANd will start truble (with focus....)
    return options.map ( (option, index) => {
      return (
        <InputGroup key={option + index}>
          <FormControl
            type="text"
            required={true}
            placeholder = {"Option " + (index + 1)}
            defaultValue = {option}
            onBlur = {this.handleChangeOption(index)}
          />
          {this.renderDeleteButton(index)}
        </InputGroup>
      )
    })
  }

  renderAddOption() {
    if (this.state.options.length >= 10) return null;
    return (
      <InputGroup>
        <InputGroup.Addon onClick = {this.handleAddOption}><Glyphicon glyph="plus" /></InputGroup.Addon>
      </InputGroup>
    )
  }

  render() {
    return (
          <Modal show = {this.props.isNewPoll}  onHide = {this.handleCancel}>
            <form onSubmit = {this.handleSubmit.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>New poll</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup>
                  <ControlLabel>Question</ControlLabel>
                  <FormControl
                    type="text"
                    required={true}
                    placeholder="Enter question"
                    onBlur = {this.handleChangeQuestion.bind(this)}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Options of answer</ControlLabel>
                  {this.renderOptions()}
                  {this.renderAddOption()}
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button type ="submit" bsStyle="primary">Save</Button>
                <Button  onClick={this.handleCancel}> Cancel</Button >
              </Modal.Footer>
            </form>
          </Modal>
    )
  }
};

const mapStateToProps = ({isNewPoll}) => {
  return {isNewPoll};
}

export default connect(mapStateToProps, {addPoll, setIsNewPoll})(NewPoll);
