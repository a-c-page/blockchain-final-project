import type { NextPage } from "next";
import Dashboard from "./dashboard";
import { useState } from "react";
import Block from "../classes/block";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Home: NextPage = () => {
  const [showDash, setshowDash] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [modalShow, setModalShow] = useState<boolean>(false);

  const [blockchain, setBlockchain] = useState<Block[]>([
    new Block(1, "0", 100424238, "SOFE4300", 96),
  ]);

  const handleSubmit = (password: string) => {
    if (password === "test") {
      setType("teacher");
      setModalShow(false);
      setshowDash(true);
    } else {
      alert("Invalid password");
    }
  };

  return (
    <>
      {!showDash && (
        <>
          <h1 className="text-center mt-[100px]">Academic Blockchain Demo</h1>
          <div className="mt-[40px] flex flex-row justify-evenly mx-auto w-[80%]">
            <div
              onClick={() => {
                setModalShow(true);
              }}
              className="mr-1 select-none cursor-pointer w-[380px] h-[380px] bg-white rounded-2xl shadow-md shadow-gray-400 flex flex-col justify-center items-center hover:shadow-sm duration-200"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>

                <p className="font-bold text-center mt-2">Teacher</p>
              </div>
            </div>

            <div
              onClick={() => {
                setType("student");
                setshowDash(true);
              }}
              className="ml-1 select-none cursor-pointer w-[380px] h-[380px] bg-white rounded-2xl shadow-md shadow-gray-400 flex flex-col justify-center items-center hover:shadow-sm duration-200"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                  />
                </svg>
                <p className="font-bold text-center mt-2">Student</p>
              </div>
            </div>
          </div>

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleSubmit={handleSubmit}
          />
        </>
      )}
      {showDash && (
        <Dashboard
          type={type}
          unrender={setshowDash}
          blockchain={blockchain}
          setBlockchain={setBlockchain}
        />
      )}
    </>
  );
};

const MyVerticallyCenteredModal: Function = (props: any) => {
  const [password, setPassword] = useState<string>("");

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Teacher Authentication
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.handleSubmit(password);
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Home;
