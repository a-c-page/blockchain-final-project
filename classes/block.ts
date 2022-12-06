import { createHash } from "crypto";

// create class to make new block
class Block {
  id: number;
  studentid: number;
  courseCode: string;
  grade: number;
  previousHash: string;
  nonce: number;
  hash: string;

// when instance of block is created, run the constructor code
  constructor(
    id: number,
    previousHash: string,
    studentid: number,
    courseCode: string,
    grade: number
  ) {
    this.id = id;
    this.studentid = studentid;
    this.courseCode = courseCode;
    this.grade = grade;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = "";

// repeatedly increment the nonce and hash all data until the resulting hash meets the difficulty of 00
    while (!this.hash.startsWith("00")) {
      this.nonce++;
      this.hash = this.calculateHash(
        "" + studentid + courseCode + grade + this.nonce + previousHash
      );
    }
  }

// perform hash of given data with SHA-256 hashing algorithm
  calculateHash(data: string) {
    return createHash("sha256").update(data).digest("hex");
  }
}

export default Block;