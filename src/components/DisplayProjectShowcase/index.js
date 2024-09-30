import './index.css'

const DisplayProjectShowcase = ({eachProjectItem}) => {
  const {name, imageUrl} = eachProjectItem
  return (
    <li className="display-project-showcase-bg-card-container">
      <img className="project-img-logo" src={imageUrl} alt={name} />
      <p className="name-text">{name}</p>
    </li>
  )
}

export default DisplayProjectShowcase