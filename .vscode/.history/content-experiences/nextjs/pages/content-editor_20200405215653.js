import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { NextAuth } from 'next-auth/client'
import Page from '../components/page'
import Layout from '../components/layout'
import BlockEditor from '../components/BlockEditor'
import Cookies from 'universal-cookie'

export default class extends Page {

  static async getInitialProps({ req }) {
    let props = await super.getInitialProps({ req })
    props.linkedAccounts = await NextAuth.linked({ req })
    return props
  }

  constructor(props) {
    super(props)
    this.state = {
      session: props.session,
      isSignedIn: (props.session.user) ? true : false,
      name: '',
      email: '',
      emailVerified: false,
      alertText: null,
      alertStyle: null
    }
    if (props.session.user) {
      this.state.name = props.session.user.name
      this.state.email = props.session.user.email
    }
    this.onSave = this.onSave.bind(this);
  }

  async componentDidMount() {
    const session = await NextAuth.init({ force: true })
    this.setState({
      session: session,
      isSignedIn: (session.user) ? true : false
    })

    // If the user bounces off to link/unlink their account we want them to
    // land back here after signing in with the other service / unlinking.
    const cookies = new Cookies()
    cookies.set('redirect_url', window.location.pathname, { path: '/' })

    this.getProfile()
  }

  getProfile() {
    fetch('/account/user', {
      credentials: 'include'
    })
      .then(r => r.json())
      .then(user => {
        if (!user.name || !user.email) return
        this.setState({
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified
        })
      })
  }

  async onSave(outputData) {
    this.setState({
      alertText: null,
      alertStyle: null
    })

    const body = {
      _csrf: await NextAuth.csrfToken(),
      ...outputData,
    };

    fetch('/content/01', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })
      .then(async res => {
        if (res.status === 200) {
          this.setState({
            alertText: 'Changes to your content have been saved',
            alertStyle: 'alert-success',
          })
        } else {
          console.error(res);
          this.setState({
            alertText: 'Failed to save changes to your content',
            alertStyle: 'alert-danger',
          })
        }
      })
  }

  render() {
    if (this.state.isSignedIn === true) {
      const alert = (this.state.alertText === null) ? <div /> : <div className={`alert ${this.state.alertStyle}`} role="alert">{this.state.alertText}</div>

      return (
        <Layout {...this.props} navmenu={false}>
          <Row className="mb-1">
            <Col xs="12">
              <h1 className="display-2">Your Content</h1>
              <p className="lead text-muted">
                Edit your content
              </p>
            </Col>
          </Row>
          {alert}
          <Row className="mt-4">
            <Col xs="12" md="8" lg="9">
              <BlockEditor onSave={this.onSave} />
            </Col>
          </Row>
        </Layout>
      )
    } else {
      return (
        <Layout {...this.props} navmenu={false}>
          <Row>
            <Col xs="12" className="text-center pt-5 pb-5">
              <p className="lead m-0">
                <Link href="/auth"><a>Sign in to manage your content</a></Link>
              </p>
            </Col>
          </Row>
        </Layout>
      )
    }
  }
}
