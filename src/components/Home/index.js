import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseDetails from '../CourseDetails'
import './index.css'

const apiConditions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiConditions.initial,
    techEraData: [],
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiConditions.in_progress})
    const url = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const conData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({apiStatus: apiConditions.success, techEraData: conData})
    } else {
      this.setState({apiStatus: apiConditions.failure})
    }
  }

  retryLoading = () => {
    this.getCourseDetails()
  }

  renderInprogressView = () => (
    <div className="loader-con" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" width="50" height="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.retryLoading}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {techEraData} = this.state
    return (
      <div>
        <h1 className="title">Courses</h1>
        <ul className="ul">
          {techEraData.map(eachData => (
            <CourseDetails key={eachData.id} details={eachData} />
          ))}
        </ul>
      </div>
    )
  }

  renderResultState = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConditions.success:
        return this.renderSuccessView()
      case apiConditions.failure:
        return this.renderFailureView()
      case apiConditions.in_progress:
        return this.renderInprogressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderResultState()}
      </div>
    )
  }
}

export default Home
