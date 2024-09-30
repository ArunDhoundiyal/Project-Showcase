import './index.css'

const FailureView = ({onRetry}) => (
  <div className="failure-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
      alt="failure view"
      className="failure-view"
    />
    <h1 className="failure-heading">Oops! Something Went Wrong</h1>
    <p className="failure-paragraph">
      We cannot seem to find the page you are looking for.
    </p>
    <button className="retry-button" type="button" onClick={onRetry}>
      Retry
    </button>
  </div>
)

export default FailureView