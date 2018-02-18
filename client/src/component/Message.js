import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Modal, Button} from 'react-bootstrap'

import {resetMessage} from '../actions'

class Message extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Modal show = {this.props.message != ''}  onHide = {this.props.resetMessage}>
          <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.message}
          </Modal.Body>
          <Modal.Footer>
            <Button  onClick={this.props.resetMessage}> Close</Button >
          </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({message}) => {
  return {message}
}

export default connect(mapStateToProps, {resetMessage})(Message)
