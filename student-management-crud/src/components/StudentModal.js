const StudentModal = ({
    name,
    phone,
    email,
    handleChange,
    handleSubmit,
    isValid,
    indexSelected,
    closeModal,
  }) => {
    return (
      <div id="EmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h4 className="modal-title">
                  {indexSelected ? "Add" : "Edit"} Employee
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                  ref={closeModal}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name: </label>
                  <input
                    id="name"
                    name="name"
                    value={name}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone: </label>
                  <input
                    id="phone"
                    className="form-control"
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email: </label>
                  <input
                    id="email"
                    name="email"
                    value={email}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  value="Cancel"
                />
                <input
                  type="submit"
                  className="btn btn-success"
                  value={indexSelected ? "Add" : "Update"}
                  onClick={handleSubmit}
                  disabled={!isValid}
                  data-dismiss="modal"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default StudentModal;
  