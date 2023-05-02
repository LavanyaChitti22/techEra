import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiConditions1 = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'INPROGRESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {
    isLoading: apiConditions1.initial,
    itemDetails: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({isLoading: apiConditions1.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)

    if (response.ok) {
      const itemData = await response.json()

      console.log(itemData)
      const conItemData = {
        id: itemData.course_details.id,
        name: itemData.course_details.name,
        imageUrl: itemData.course_details.image_url,
        description: itemData.course_details.description,
      }
      console.log(conItemData)
      this.setState({
        isLoading: apiConditions1.success,
        itemDetails: conItemData,
      })
    } else {
      this.setState({isLoading: apiConditions1.failure})
    }
  }

  retryHome = () => {
    this.getDetails()
  }

  renderLoading = () => (
    <div className="loader-con" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" width="50" height="50" />
    </div>
  )

  renderItemDetails = () => {
    const {itemDetails} = this.state
    const {imageUrl, name, description} = itemDetails
    return (
      <div className="item-con">
        <img src={imageUrl} alt={name} className="de-img" />
        <div className="name-con">
          <h1 className="name">{name}</h1>
          <p className="para">{description}</p>
        </div>
      </div>
    )
  }

  renderItemFailure = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.retryHome}>
        Retry
      </button>
    </div>
  )

  renderOutput = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case apiConditions1.success:
        return this.renderItemDetails()
      case apiConditions1.failure:
        return this.renderItemFailure()
      case apiConditions1.in_progress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderOutput()}
      </div>
    )
  }
}
export default CourseItemDetails
