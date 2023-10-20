import { Outlet } from 'react-router-dom'
import '../Styles/background.css'

const Background = () => {
  return (
    <>
    <div className="animateme">
  <ul className="bg-bubbles">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
<Outlet />
</>
  )
}

export default Background
