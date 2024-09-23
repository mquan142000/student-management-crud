import { useEffect, useRef, useState } from "react";
import StudentModal from "./StudentModal";

const StudentList = () => {
    const [studentList, setStudentList] = useState([
        { name: "Manh", phone: "0842145522", email: "qanh@gmail.com" },
        { name: "Trang", phone: "0123456789", email: "trang@gmail.com" },
        { name: "Quan", phone: "0865362142", email: "quan@gmail.com" },
        { name: "Manh", phone: "0842145522", email: "qanh@gmail.com" },
        { name: "Trang", phone: "0123456789", email: "trang@gmail.com" },
        { name: "Quan", phone: "0865362142", email: "quan@gmail.com" },
        { name: "An", phone: "0865322129", email: "an@gmail.com" },
    ]);

    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    const [indexSelected, setIndexSelected] = useState(-1);
    const [isValid, setIsValid] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const closeModal = useRef(null);

    useEffect(() => {
        const { name, phone, email } = form;
        const isValid = name && phone && email;
        setIsValid(isValid);
    }, [form]);

    useEffect(() => {
        document.title = "Student List";
    }, []);

    const handleSelect = (studentSelected, index) => {
        setForm({ ...studentSelected });
        setIndexSelected(index);
    };

    const handleChange = (event) => {
        const newForm = { ...form };
        newForm[event.target.name] = event.target.value;
        setForm({
            ...newForm,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            const newList = [...studentList];
            if (indexSelected > -1) {
                newList.splice(indexSelected, 1, form);
            } else {
                newList.push(form);
            }
            setForm({ name: "", phone: "", email: "" });
            setStudentList(newList);
            setIsValid(false);
            setIndexSelected(-1);
            closeModal.current.click();
        }
    };

    const handleDelete = (index) => {
        const newList = [...studentList];
        newList.splice(index, 1);
        setStudentList(newList);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredStudents = studentList
        .filter((student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.phone.includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    const pages = [];
    for (let i = 1; i <= Math.ceil(filteredStudents.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const renderPageNumbers = pages.map((number) => {
        return (
            <li
                key={number}
                id={number}
                onClick={handleClick}
                className={currentPage === number ? "active" : null}
            >
                {number}
            </li>
        );
    });

    const handleNextbtn = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevbtn = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>
                            Student <b>List</b>
                        </h2>
                    </div>
                    <div className="col-sm-6">
                        <a href="#EmployeeModal" className="btn btn-success" data-toggle="modal">
                            <i className="material-icons">&#xE147;</i>{" "}
                            <span>Add New Student</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-12">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name, phone, or email"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th style={{ width: "200px" }}>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map((student, index) => (
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>{student.phone}</td>
                            <td>{student.email}</td>
                            <td>
                                <a
                                    href="#EmployeeModal"
                                    className="edit"
                                    data-toggle="modal"
                                    onClick={() => handleSelect(student, index)}
                                >
                                    <i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                </a>
                                <a
                                    href="#deleteEmployeeModal"
                                    className="delete"
                                    data-toggle="modal"
                                    onClick={() => handleDelete(index)}
                                >
                                    <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <tfoot>
                <tr>
                    <td colSpan="4" className="text-center">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={handlePrevbtn} disabled={currentPage === 1}>
                                    &laquo;
                                </button>
                            </li>
                            {pages.map((number) => (
                                <li
                                    key={number}
                                    className={`page-item ${currentPage === number ? "active" : ""}`}
                                >
                                    <button className="page-link" id={number} onClick={handleClick}>
                                        {number}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === pages.length ? "disabled" : ""}`}>
                                <button className="page-link" onClick={handleNextbtn} disabled={currentPage === pages.length}>
                                    &raquo;
                                </button>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tfoot>

            <StudentModal
                name={form.name}
                email={form.email}
                phone={form.phone}
                indexSelected={indexSelected}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                isValid={isValid}
                closeModal={closeModal}
            />
        </div>
    );
};

export default StudentList;
