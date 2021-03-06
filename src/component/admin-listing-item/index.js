import React from 'react'
import { renderIf } from '../../lib/util.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class AdminListingsItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: this.props.listing._id,
      updating: false,
      verified: this.props.listing.verified,
      cost: this.props.listing.cost,
      landlordPhone: this.props.listing.landlordPhone,
      petsAllowed: this.props.listing.petsAllowed,
      nonSmoking: this.props.listing.nonSmoking,
      parkingSpaces: this.props.listing.parkingSpaces,
      comment: this.props.listing.comment,
      token: null,
    }
    this.handleEditListing = this.handleEditListing.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({ token: this.props.token })
  }

  handleChange(e) {
    if (e.target.name === 'petsAllowedYes' || e.target.name === 'petsAllowedNo')
      this.setState({ petsAllowed: e.target.value })
    if (e.target.name === 'nonSmokingYes' || e.target.name === 'nonSmokingNo')
      this.setState({ nonSmoking: e.target.value })
    if (e.target.name === 'verifiedYes' || e.target.name === 'verifiedNo')
      this.setState({ verified: e.target.value })
    let { value, name } = e.target
    this.setState({ [name]: value })
  }

  handleEditListing() {
    this.setState({ updating: true })
  }

  render() {
    let listing = this.props.listing
    return (
      <div>
        {renderIf(
          !this.state.updating,
          <div>
            <ListItem>
              <b>Title:</b> {listing.title}
            </ListItem>
            <Divider />
            <ListItem>
              <b>Date Uploaded:</b> {listing.listingCreatedOn}
            </ListItem>
            <Divider />
            <ListItem>
              <b>Link:</b>{' '}
              <a href="{listing.listingURL}">{listing.listingURL}</a>
            </ListItem>
            <Divider />
            <ListItem>
              <b>Verified:</b> {listing.verified ? 'yes' : 'no'}
            </ListItem>
            <Divider />
            <ListItem>
              <b>Rent Cost:</b> {listing.cost}
            </ListItem>
            <Divider />
            <ListItem>
              <b>Landlord Phone:</b> {listing.landlordPhone}
            </ListItem>
            <Divider />
            <ListItem>
              <b>Pets Allowed?</b> {listing.petsAllowed ? 'yes' : 'no'}
            </ListItem>
            <Divider />
            <ListItem>
              <b>Non-Smoking?</b> {listing.nonSmoking ? 'yes' : 'no'}
            </ListItem>
            <Divider />
            <ListItem>
              <b>Parking Spaces:</b> {listing.parkingSpaces}
            </ListItem>
            <Divider />
            <ListItem>
              <b>Comments:</b> {listing.comment}
            </ListItem>
            <RaisedButton onClick={this.handleEditListing} label="Edit" />
            <span> </span>
            <RaisedButton
              onClick={() => this.props.listingDelete(listing)}
              label="Delete"
            />
          </div>
        )}
        {renderIf(
          this.state.updating,
          <form
            onSubmit={e => {
              e.preventDefault()
              this.props.listingUpdate(this.state)
              this.setState({ updating: false })
            }}
          >
            <ListItem>
              title: {listing.title}
            </ListItem>
            <Divider />
            <ListItem>
              <label>
                <p style={{ opacity: '.3' }}>verified</p>
                <label>
                  Yes
                  <input
                    type="radio"
                    name="verifiedYes"
                    onChange={this.handleChange}
                    value="true"
                  />
                </label>
                <label>
                  No
                  <input
                    type="radio"
                    name="verifiedNo"
                    onChange={this.handleChange}
                    value="false"
                  />
                </label>
              </label>
            </ListItem>
            <Divider />
            <ListItem>
              <label>
                <TextField
                  name="cost"
                  type="text"
                  value={this.state.cost}
                  onChange={this.handleChange}
                  underlineShow={false}
                  style={{ marginLeft: 20 }}
                  hintText="Cost"
                />
              </label>
            </ListItem>
            <Divider />
            <ListItem>
              <label>
                <TextField
                  name="landlordPhone"
                  type="text"
                  value={this.state.landlordPhone}
                  onChange={this.handleChange}
                  underlineShow={false}
                  style={{ marginLeft: 20 }}
                  hintText="Landlord Phone"
                />
              </label>
            </ListItem>
            <Divider />
            <ListItem>
              <label>
                <p style={{ opacity: '.3' }}>Pets Allowed?</p>
                <label>
                  Yes
                  <input
                    type="radio"
                    name="petsAllowedYes"
                    onChange={this.handleChange}
                    value="true"
                  />
                </label>
                <label>
                  No
                  <input
                    type="radio"
                    name="petsAllowedNo"
                    onChange={this.handleChange}
                    value="false"
                  />
                </label>
              </label>
            </ListItem>
            <Divider />
            <ListItem>
              <label>
                <p style={{ opacity: '.3' }}>Non-Smoking?</p>
                <label>
                  Yes
                  <input
                    type="radio"
                    name="nonSmokingYes"
                    onChange={this.handleChange}
                    value="true"
                  />
                </label>
                <label>
                  No
                  <input
                    type="radio"
                    name="nonSmokingNo"
                    onChange={this.handleChange}
                    value="false"
                  />
                </label>
              </label>
            </ListItem>
            <Divider />
            <ListItem>
              <label>
                <TextField
                  name="parkingSpaces"
                  type="number"
                  value={this.state.parkingSpaces}
                  onChange={this.handleChange}
                  underlineShow={false}
                  style={{ marginLeft: 20 }}
                  hintText="Number of Parking Spaces"
                />
              </label>
            </ListItem>
            <Divider />
            <ListItem>
              <label>
                <TextField
                  name="comment"
                  type="text"
                  value={this.state.comment}
                  onChange={this.handleChange}
                  underlineShow={false}
                  style={{ marginLeft: 20 }}
                  hintText="Comments"
                />
              </label>
            </ListItem>
            <Divider />
            <RaisedButton type="submit" label="Update" />
          </form>
        )}
      </div>
    )
  }
}

export default AdminListingsItem
