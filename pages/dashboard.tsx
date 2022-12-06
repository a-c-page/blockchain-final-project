import React from "react";
import { useState } from "react";
import BlockComponent from "../components/block";
import Block from "../classes/block";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import useDebounce from "../classes/useDebounce";

let schema = yup.object().shape({
  student: yup.number().required().positive().integer(),
  course: yup.string().required(),
  grade: yup.number().required().positive().integer().max(100),
});

const Dashboard = ({
  type,
  unrender,
  blockchain,
  setBlockchain,
}: {
  type: string;
  unrender: Function;
  blockchain: Block[];
  setBlockchain: Function;
}) => {
  const [student, setStudent] = useState<number>(0);
  const [course, setCourse] = useState<string>("");
  const [grade, setGrade] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<number[]>([]);

  const handleSubmit = () => {
    schema
      .isValid({
        student: student,
        course: course,
        grade: grade,
      })
      .then(function (valid) {
        if (valid) {
          const newBlock = new Block(
            blockchain.length + 1,
            blockchain[blockchain.length - 1].hash,
            student,
            course,
            grade
          );
          setBlockchain([...blockchain, newBlock]);

          setStudent(0);
          setCourse("");
          setGrade(0);
        } else {
          alert("Invalid input");
        }
      });
  };

  const showResults = (searcher: string) => {
    let resulting_arr: number[] = [];
    blockchain?.map((block) => {
      if (
        block.studentid.toString().startsWith(parseInt(searcher).toString())
      ) {
        resulting_arr.push(block.id);
      }
    });
    setResults(resulting_arr);
  };

  return (
    <>
      <div className="flex flex-row justify-between w-[300px] mx-auto bg-gray-200 py-3 px-6 rounded-md mt-2">
        <div
          onClick={() => {
            unrender(false);
          }}
          className="cursor-pointer select-none w-[50px] h-[50px] rounded-md ring-2 ring-slate-500 text-xs text-center font-bold pt-3 mt-1"
        >
          Back
        </div>

        <p className="mt-3">
          Logged in as: <span className="font-bold">{type?.toUpperCase()}</span>
        </p>
      </div>

      <Form.Group className="px-8 py-2">
        <Form.Label>Blockchain Search</Form.Label>
        <Form.Control
          onChange={(e) => {
            setSearch(e.target.value);
            showResults(e.target.value);
            console.log(results);
          }}
          value={search}
          type="text"
        />
      </Form.Group>

      <div className="flex flex-row space-x-2 w-full px-8 py-2 h-[70px]">
        <p className="font-bold mt-2">Blocks Found: </p>
        {results?.length > 0 &&
          results?.map((id) => {
            return (
              <p
                onClick={() => {
                  const scroller = document.getElementById("scroller");
                  // Scroll the container to the block
                  if (scroller) {
                    scroller.scrollTo((id - 1) * 590, 0);
                  }
                }}
                className="cursor-pointer w-10 h-10 rounded-xl bg-slate-500 text-center pt-2 font-bold text-white select-none"
              >
                {id}
              </p>
            );
          })}
      </div>

      <div
        id="scroller"
        className="flex flex-row space-x-[50px] w-full h-[300px] px-[50px] overflow-x-auto scrollbar-hide"
      >
        {blockchain?.map((block) => {
          return (
            <BlockComponent
              id={block.id}
              prevHash={block.previousHash}
              hash={block.hash}
              nonce={block.nonce}
              student={block.studentid}
              course={block.courseCode}
              grade={block.grade}
              key={block.id}
            />
          );
        })}
      </div>

      <div className="w-full px-[50px] pt-0">
        {type === "teacher" && (
          <div className="p-4">
            <Form className="flex flex-row justify-between w-[80%] mx-auto">
              <Form.Group className="mb-3">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setStudent(parseInt(e.target.value));
                  }}
                  value={student}
                  type="number"
                  placeholder="100712345"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Course Code</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setCourse(e.target.value);
                  }}
                  value={course}
                  type="text"
                  placeholder="SOFE4300"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setGrade(parseInt(e.target.value));
                  }}
                  value={grade}
                  type="number"
                  placeholder="95"
                />
              </Form.Group>

              <Button
                onClick={handleSubmit}
                className="h-[50px] mt-6"
                type="button"
              >
                Submit
              </Button>
            </Form>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
