import './index.css'

const CourseDetails = props => {
  const {courseItemDetails} = props
  const {name, description, imageUrl} = courseItemDetails

  return (
    <div className="details-co">
      <div className="image-con">
        <img className="details-img" src={imageUrl} alt={name} />
        <div className="info-con">
          <h1 className="name">{name}</h1>
          <p className="dec">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
