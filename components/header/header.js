import React, { Component } from 'react';
import Link from 'next/link';
import { Grid, IconButton } from '@material-ui/core';
import LongMenu from './icon-dropdown/icon-dropdown';
import './header.sass';

class Header extends React.Component {

  getLink = () => ([
    {href: '/', title: 'MetKnow', className: 'brand-title'},
    {href: '/home/manage-groups', title: 'GROUPS'},
    {href: '/contact', title: 'CONTACT US'},
  ]);

  render() {
    return (
      <div className='header header-wrapped'>
        <Grid container spacing={0} justify="center">
          <Grid item xs={10} sm={10}>
            <div
              className='logo-image'
              style={{
                backgroundImage: `url(/static/png/logo-image.png)`,
              }}
            />
            {
              this.getLink().map((item, id) => {
                  const {href, title, className} = item;
                  return (
                    <Link
                      key={id}
                      href={href}
                    >
                      <a className={className || ''}>{title}</a>
                    </Link>
                  );
                }
              )
            }
          </Grid>
          <Grid item xs={2} sm={2}>
            <div className='header-wrapped-info'>
              <div
                className='avatar-image'
                style={{
                  backgroundImage: `url(/static/svg/default-avatar.svg)`,
                }}
              />
              <div className='icon-dropdown'>
                <LongMenu />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Header;
