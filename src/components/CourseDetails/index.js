import {Link} from 'react-router-dom'
import './index.css'

const CourseDetails = props => {
  const {details} = props
  const {name, logoUrl, id} = details
  return (
    <Link to={`/courses/${id}`} className="li">
      <li className="li">
        <img src={logoUrl} alt={name} className="logo-url" />
        <p className="logo-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseDetails
