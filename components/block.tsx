import React from "react";

const BlockComponent = ({
  id,
  hash,
  prevHash,
  nonce,
  student,
  course,
  grade,
}: {
  id: number;
  hash: string;
  prevHash: string;
  nonce: number;
  student: number;
  course: string;
  grade: number;
}) => {
  return (
    <div
      className={`${
        id !== 1 && "line_before"
      } relative p-4 min-w-[540px] h-[250px] bg-white rounded-xl shadow-sm shadow-gray-500 text-sm`}
    >
      <p className="font-bold mb-6">{id}</p>
      <p className="break-all">
        <b>Previous Hash: </b> <span className="text-xs">{prevHash}</span>
      </p>
      <p className="break-all">
        <b> Block Hash: </b> <span className="text-xs">{hash}</span>
      </p>
      <p>
        <b>Nonce: </b> {nonce}
      </p>
      <p>
        {student}: {course}: {grade}
      </p>
    </div>
  );
};

export default BlockComponent;
