import {Link} from 'react-router-dom'

import './index.css'

const AllCourses = props => {
  const {courseItemDetails} = props
  const {id, name, logoUrl} = courseItemDetails

  return (
    <Link className="anchor-link" to={`/courses/${id}`}>
      <li className="list-li">
        <img className="item-image" src={logoUrl} alt={name} />
        <p className="item-para">{name}</p>
      </li>
    </Link>
  )
}

export default AllCourses
