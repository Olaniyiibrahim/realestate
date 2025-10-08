import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="space-y-7 p-6 text-center">
        <h1>Page Not Found</h1>
        <NavLink to="/">
            <p className="text-blue-600">   Go back home</p>
        </NavLink>
    </div>

  )
}
