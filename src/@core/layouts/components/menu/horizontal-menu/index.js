import classnames from 'classnames'
import { Link, useHistory } from 'react-router-dom'

const HorizontalMenu = () => {
  const history = useHistory()
  return (
    <div id="menu-container" className="container-fluid">
      <div id="menu-row" className="row">
        HorizontalMenu
      </div>
      <div id="deco-row" className="row"></div>
    </div>
  )
}

export default HorizontalMenu
