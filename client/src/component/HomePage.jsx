import React, { useEffect, useState } from "react";
import axios from "axios";
function HomePage() {
  const [users, setUser] = useState([]);
  const [userFind, setUserFind] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadUser = () => {
    axios
      .get("http://localhost:8080/api/v1/users")
      .then((res) => setUser(res.data.data))
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/v1/users/${id}`)
      .then(() => loadUser())
      .catch((err) => console.log(err));
  };
  const handleUpdate = (id) => {
    setUserFind(users.find((e) => e.user_id == id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name: name,
      description: description,
    };
    axios
      .patch(
        `http://localhost:8080/api/v1/users/${userFind.user_id}`,
        updatedData
      )
      .then(() => {
        loadUser();
      })
      .catch((err) => console.log(err));
  };
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const handleCreate = (e) => {
    e.preventDefault();
    const newUser = {
      name: newName,
      description: newDescription,
    };
    axios
      .post(`http://localhost:8080/api/v1/users/`, newUser)
      .then((res) => loadUser())
      .catch((err) => console.log(err));
  };
  const [flag, setFlag] = useState(true);
  const handleClickSortDESC = () => {
    if (flag) {
      axios
        .get(`http://localhost:8080/api/v1/users/sortDESC`)
        .then((res) => setUser(res.data.userDESC[0][0]), setFlag(false))
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`http://localhost:8080/api/v1/users/sortASC`)
        .then((res) => setUser(res.data.userDESC[0][0]), setFlag(true))
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="container">
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        Create
      </button>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex={-1}
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Create user
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleCreate}>
            <>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
            </>
            <button type="submit" class="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              ID{" "}
              <button
                type="button"
                class="btn btn-warning"
                onClick={handleClickSortDESC}
              >
                Sort
              </button>
            </th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((e) => (
            <tr key={e.user_id}>
              <th scope="row">{e.user_id}</th>
              <td>{e.name}</td>
              <td>{e.description}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleUpdate(e.user_id)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => handleDelete(e.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update User
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <>
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="form-label"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      value={description}
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HomePage;
