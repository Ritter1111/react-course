import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div>
      <header>
      <nav>
        <ul>
          <li>
            <Link to='/uncontrolled-form'>uncontrolled-form</Link>
          </li>
          <li>
            <Link to='/react-hook-form'>react-hook-form</Link>
          </li>
        </ul>
      </nav>
      </header>
    </div>
  )
}
