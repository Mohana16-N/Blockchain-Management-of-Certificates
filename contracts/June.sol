// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract June {
    struct Student {
        string name;
        string university;
        string program;
        bool approved;
    }

    mapping(uint256 => Student) public students;
    uint256 public studentCount;

    constructor() {
        // Add predefined students
        addStudent("Alice", "University A", "Computer Science");
        addStudent("Bob", "University B", "Electrical Engineering");
        addStudent("Charlie", "University C", "Mechanical Engineering");
    }

    function addStudent(string memory _name, string memory _university, string memory _program) private {
        uint256 id = studentCount + 1; // Increment the student count to assign a new ID
        students[id] = Student({
            name: _name,
            university: _university,
            program: _program,
            approved: false
        });
        studentCount++; // Increment the student count
    }

    // Existing functions remain unchanged

    function requestRecommendation(string memory _name, string memory _university, string memory _program) public returns (uint256) {
        uint256 id = studentCount + 1; // Increment the student count to assign a new ID
        students[id] = Student({
            name: _name,
            university: _university,
            program: _program,
            approved: false
        });
        studentCount++; // Increment the student count for the next student
        return id; // Return the assigned ID
    }

    function approveRecommendation(uint256 _id) public {
        require(!students[_id].approved, "Recommendation already approved.");
        students[_id].approved = true;
    }

    function getStudentDetails(uint256 _id) public view returns (string memory, string memory, string memory, bool) {
        return (
            students[_id].name,
            students[_id].university,
            students[_id].program,
            students[_id].approved
        );
    }
}
