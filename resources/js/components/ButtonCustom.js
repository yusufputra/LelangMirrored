import React, { Component,Fragment } from 'react'
import {Button} from 'antd'
export default class ButtonCustom extends Component {
  render() {
    return (
      <div>
      <Button>
        Login
      </Button>
      <Button>
        Register
      </Button>
    </div>
    )
  }
}
