import React, { Component } from 'react';

export default class Layout extends Component {
  render() {
    return <html>
      <head>
        <title>{this.props.title}</title>
        <meta charSet="utf-8"></meta>
        <meta name="renderer" content="webkit"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-touch-fullscreen" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="black"></meta>
        <meta name="format-detection" content="telephone=no,email=no"></meta>
        <meta name="screen-orientation" content="portrait"></meta>
        <meta name="x5-orientation" content="portrait"></meta>
        <meta name="keywords" content={this.props.keywords}></meta>
        <meta name="description" content={this.props.description}></meta>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
      </head>
      <body><div id="app">{this.props.children}</div></body>
    </html>;
  }
}