import { useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'

function EmployeeDashboard() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok) {
          throw new Error('Failed to fetch employee data')
        }

        const data = await response.json()
        setEmployees(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  return (
    <div className="container py-4">
      <h2 className="mb-3">Employee Dashboard</h2>
      {loading && <p>Loading employee data...</p>}
      {error && <p className="text-danger mb-0">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function EmployeeForm() {
  return (
    <div className="container py-4">
      <h2 className="mb-3">Employee Form</h2>
      <form className="card card-body shadow-sm">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input id="name" type="text" className="form-control" placeholder="Enter employee name" />
        </div>
        <div className="mb-3">
          <label htmlFor="designation" className="form-label">
            Designation
          </label>
          <input
            id="designation"
            type="text"
            className="form-control"
            placeholder="Enter designation"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input id="location" type="text" className="form-control" placeholder="Enter location" />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input id="salary" type="number" className="form-control" placeholder="Enter salary" />
        </div>
        <button type="submit" className="btn btn-primary" disabled>
          Submit
        </button>
      </form>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Employee App
          </Link>
          <div className="navbar-nav">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/employee-form" className="nav-link">
              Employee Form
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/home" element={<EmployeeDashboard />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
