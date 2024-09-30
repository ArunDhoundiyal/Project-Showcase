import {useState, useEffect, useCallback} from 'react'
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios'
import FailureView from '../FailureView'
import DisplayProjectShowcase from '../DisplayProjectShowcase'
import './index.css'

const FetchProjectData = ({categoriesList}) => {
  const [selectCategory, setSelectCategory] = useState(categoriesList[0].id)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [failureView, setFailureView] = useState(false)

  const handleChange = event => {
    setSelectCategory(event.target.value)
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    setFailureView(false)
    try {
      const response = await axios.get(
        `https://apis.ccbp.in/ps/projects?category=${selectCategory}`,
      )
      if (response.status === 200) {
        setData(
          response.data.projects.map(eachItem => ({
            id: eachItem.id,
            imageUrl: eachItem.image_url,
            name: eachItem.name,
          })),
        )
      }
    } catch (error) {
      console.log(`Error While Fetching Data: ${error}`)
      setFailureView(true)
    } finally {
      setLoading(false)
    }
  }, [selectCategory])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const displayProjectShowcase = () => {
    if (loading) {
      return (
        <div className="products-loader-container loader">
            <ThreeDots 
            data-testid="loader"
            color="#0b69ff"
            height={50}
            width={50}
            />
        </div>
      )
    }

    if (failureView) {
      return <FailureView onRetry={fetchData} />
    }

    return (
      <ul>
        {data.map(eachProject => (
          <DisplayProjectShowcase
            key={eachProject.id}
            eachProjectItem={eachProject}
          />
        ))}
      </ul>
    )
  }

  return (
    <div className="bg-container">
      <div className="website-logo-container">
        <div className="selection-website-logo-container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <select
            className="select-option"
            value={selectCategory}
            onChange={handleChange}
          >
            {categoriesList.map(eachCategory => (
              <option key={eachCategory.id} value={eachCategory.id}>
                {eachCategory.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className={`${
          loading ? 'display-loader' : 'display-project-showcase-bg-container'
        }`}
      >
        {displayProjectShowcase()}
      </div>
    </div>
  )
}

export default FetchProjectData