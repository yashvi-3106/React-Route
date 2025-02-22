import { useState, useEffect } from "react";

function Node() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://momgodb-node.onrender.com/students")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
            })
            .catch((err) => console.error("Error fetching students:", err));
    }, [data]);
    return (<>


        {data.map((student) => (
            <div key={student._id}>
                <h4>{student.name}</h4>
                <p>{student.rollNumber}</p>
                <p>{student.year}</p>
                <p>{student.coursesEnrolled}</p>
            </div>
        ))}

    </>)
}

export default Node;