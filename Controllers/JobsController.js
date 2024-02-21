const Jobs = require("./../models/Jobs");
const { BadRequest } = require("./../errors/index");

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find();
  console.log(jobs)
  res.status(200).json(jobs)
};

// const createJob = async(req,res) =>{
//     const {job,company ,status} = req.body
//     if (!job)

// }