import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';

import i18n from '../../../services/decorators/i18n';

import { menuProps } from '../../../constants/texts';

/*const options = [
  'Profile',
  'Edit',
  'Sign Up'
];*/

const ITEM_HEIGHT = 48;

@i18n('menu')
class LongMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <ExpandMore style={{color: "white"}}/>
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {menuProps.map(option => (
            <MenuItem key={option.translateVariable} selected={option.translateVariable === 'LogIn'} onClick={this.handleClose}>
              {this.props.translate(option.translateVariable)}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
}

export default LongMenu;
