import React from 'react'
import Loading from '../loading'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { storeId } from '../../action/user-id-actions.js'
import { login, logout } from '../../action/auth-actions.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import {
  profileUpdate,
  profileFetchRequest,
} from '../../action/profile-actions.js'
import IconMenu from 'material-ui/IconMenu'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { Link } from 'react-router-dom'
import * as util from '../../lib/util.js'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import { GridList, GridTile } from 'material-ui/GridList'

class LandingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signUp: false,
      landing: true,
      loggedIn: localStorage.loggedIn ? true : false,
      open: false,
    }
    this.logout = this.logout.bind(this)
    this.showLock = this.showLock.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  componentWillMount() {
    console.log(this.props.history)
    const options = {
      oidcConformant: true,
      auth: {
        audience: 'https://roomletapi/',
        params: {
          scope: 'openid profile read:listing',
        },
      },
      theme: {
        logo: 'https://s3.us-east-2.amazonaws.com/roomletres/roomlet.png',
        primaryColor: '#3AB08F',
      },
      languageDictionary: {
        title: 'Roomlet',
      },
    }

    this.lock = new Auth0Lock(
      __AUTH0_CLIENT_ID__,
      __AUTH0_CLIENT_DOMAIN__,
      options
    )

    this.lock.on('signup submit', () => {
      this.setState({ signUp: true })
    })

    this.lock.on('authenticated', authResult => {
      this.lock.getUserInfo(authResult.accessToken, (err, profile) => {
        if (err) return new Error('failed to authenticate')
        console.log('profile!!!!!!', profile.sub)
        this.props.storeId(profile.sub)
        this.props.login(authResult.accessToken)
        this.props.profileFetch()
        localStorage.setItem('loggedIn', true)
        localStorage.setItem('userInfo', JSON.stringify(profile))
        this.state.signUp
          ? this.props.history.push('/settings')
          : this.props.history.push('/dashboard')
      })
    })
  }

  showLock() {
    this.lock.show()
  }

  logout() {
    localStorage.removeItem('loglevel')
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('authToken')
    localStorage.removeItem('reduxPersist:auth')
    localStorage.removeItem('reduxPersist:userId')
    localStorage.removeItem('reduxPersist:profile')
    localStorage.removeItem('reduxPersist:listings')
    this.lock.logout()
  }

  render() {
    return (
      <div className="login-box">
        <MuiThemeProvider>
          <AppBar
            title="ROOMLET"
            style={{
              backgroundColor: '#4ED4A6',
            }}
            titleStyle={{
              fontFamily: 'Libre Franklin',
              letterSpacing: '.2em',
              fontWeight: '800',
            }}
            iconElementLeft={
              <IconMenu
                iconButtonElement={
                  <IconButton
                    iconStyle={{ fill: 'white' }}
                    style={{ padding: '0px' }}
                  >
                    <Avatar src="https://s3.us-east-2.amazonaws.com/roomletres/roomlet.png" />
                  </IconButton>
                }
              >
                <MenuItem
                  primaryText="Home"
                  containerElement={<Link to="/" />}
                />
                {util.renderIf(
                  this.state.loggedIn === true,
                  <div>
                    <MenuItem
                      primaryText="Dashboard"
                      containerElement={<Link to="/dashboard" />}
                    />
                    <MenuItem
                      primaryText="Profile Settings"
                      containerElement={<Link to="/settings" />}
                    />
                  </div>
                )}
              </IconMenu>
            }
            iconElementRight={
              <RaisedButton
                onClick={this.state.loggedIn ? this.logout : this.showLock}
                label={this.state.loggedIn ? 'Logout' : 'Login'}
                style={{ marginTop: '4px', marginRight: '10px' }}
              />
            }
          />
        </MuiThemeProvider>
        <div>
          {util.renderIf(
            this.props.history,
            <div
              style={{
                backgroundImage: 'url(https://s3.us-east-2.amazonaws.com/roomletres/bay.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: '999',
                position: 'fixed',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
              }}
            >
              <MuiThemeProvider>
                <div>
                  <FlatButton
                    label="About"
                    onClick={this.handleOpen}
                    labelStyle={{
                      color: 'white',
                      letterSpacing: '.15em',
                      fontSize: '1.2em',
                      fontWeight: '500',
                    }}
                    style={{ position: 'absolute', top: '93%', left: '2%' }}
                  />
                  <Dialog
                    title="ROOMLET"
                    titleStyle={{
                      fontSize: '2em',
                      letterSpacing: '.2em',
                      fontWeight: '800',
                    }}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                  >
                    <p>
                      Roomlet verifies landlords, tenants, and rental listings.
                      We verify the tenant’s identity, that listings are
                      authentic, and that the property manager has the ability
                      to rent out space in their posting
                    </p>
                    <h1>Renters</h1>{' '}
                    <p>
                      If you’re looking for a rental, you know that there are a
                      lot of fake rental listings out there. Scammers intend to
                      steal your identity, and/or your money. This is worse if
                      you’re relocating. It’s hard to tell what’s real and
                      what’s not when you can’t visit the listing. Click here to
                      read: 2017 Bay Area and Seattle Student Summer Sublet
                      Research.
                    </p>{' '}
                    <h1>Landlords</h1>
                    <p>
                      If you’re a landlord or a subletter, you’ve probably had
                      potential tenants change their minds as soon as you ask
                      them for any personally identifiable information. Verify
                      your listing with us, so you can get more serious and
                      trustworthy leads.
                    </p>
                  </Dialog>
                </div>
              </MuiThemeProvider>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({})

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  storeId: id => dispatch(storeId(id)),
  login: token => dispatch(login(token)),
  profileFetch: () => dispatch(profileFetchRequest()),
  profileUpdate: profile => dispatch(profileUpdate(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)
