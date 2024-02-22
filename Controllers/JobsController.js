const Jobs = require("./../models/Jobs");
const { BadRequest, NotFound } = require("./../errors/index");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  try {
    const {
      user: { userId, username },
      body,
    } = req;
    const jobs = await Jobs.find({ createdBy: userId });
    console.log(jobs);
    res.status(StatusCodes.OK).json(jobs);
  } catch (error) {
    console.log(error);
  }
};

const getJob = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Jobs.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    return next(new Notfound(`No job with id ${jobId} found`));
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res, next) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (!company || !position) {
    next(new BadRequest("company and postion field was not provided"));
  }
  const job = await Jobs.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    return next(new NotFound(`No job with id ${jobId}`));
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Jobs.findByIdAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    return next(new NotFound(`No job with id ${jobId} found`));
  }
  res.status(StatusCodes.OK).send(`Job with id ${jobId} is deleted`);
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
