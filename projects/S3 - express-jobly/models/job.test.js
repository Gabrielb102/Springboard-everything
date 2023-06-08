"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  getJobIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


// Job.all() - for GET /
describe("Job.all() static method", () => {
    test("Successfully displays all jobs, no filter", async () => {
        const allJobs = await Job.all();
        expect(allJobs.length).toEqual(4);
    });

    test("Successfully displays jobs with filter", async () => {
        const jobs1 = await Job.all({ title : "ja", minSalary : 10000 });
        expect(jobs1.length).toEqual(1);
        const jobs2 = await Job.all({minSalary: 1000});
        expect(jobs2.length).toEqual(4);
        const jobs3 = await Job.all({title: "Soft", minSalary: 100000, hasEquity: false});
        expect(jobs3.length).toEqual(0);

    })

})

// Job.get(id) - for GET /:id
describe("Job.get(id) static method", () => {
    test("Successfully displays requested job", async () => {
        const jobIds = await getJobIds();
        const job = await Job.get(jobIds[0]);
        expect(job.id).toEqual(jobIds[0]);
        expect(job.title).toEqual('janitor');
    });
    test("NotFoundError for No job with that id", async () => {
        const faultyRequest = async () => {
            const job = await Job.get(-1)
            return job
        };
        expect(faultyRequest()).rejects.toThrow(NotFoundError);
    });
})

// Job.create(jobData) - for POST /
describe("Job.create(jobData)", () => {
    const jobData = {
        title : "test writer",
        salary : "35000",
        equity : "1",
        company_handle : "c3" 
    }
    test("Successfully creates a new job", async () => {{
        const allJobsBeforeNew = await Job.all();
        const newJob = await Job.create(jobData);
        const allJobsAfterNew = await Job.all();
        expect(newJob.title).toEqual("test writer");
        expect(allJobsAfterNew.length - allJobsBeforeNew.length).toEqual(1);

    }});
})

// Job.update(jobData, id) - for PUT /:id
describe("Job.update(jobData)", () => {
    test("Successfully updates existing job", async () => {
        const jobIds = await getJobIds();
        const allJobsBeforeUpdate = await Job.all()
        const changedJob = await Job.update({title : "waste disposal consultant"}, jobIds[0]);
        const job = await Job.get(jobIds[0]);
        const allJobsAfterUpdate = await Job.all()
        expect(job.title).toBe("waste disposal consultant");
        expect(allJobsAfterUpdate.length).toEqual(allJobsBeforeUpdate.length);
    });
    test("NotFoundError if no job with that id", async () => {
        const faultyRequest = async () => {
            const update = await Job.update({title : "this shouldnt work"}, -1)
            return update};
        expect(faultyRequest()).rejects.toThrow(NotFoundError);
    });
})

// Job.remove(id) - for DELETE /:id
describe("Job.remove(id)", () => {

    test("Successfully removes specified job", async () => {
        const jobIds = await getJobIds();
        const allJobsBeforeDelete = await Job.all();
        const removedJob = await Job.remove(jobIds[0]);
        const allJobsAfterDelete = await Job.all();
        expect(allJobsAfterDelete.length).toBeLessThan(allJobsBeforeDelete.length);
    });

    test("NotFoundError if no job with that id", async () => {
        const faultyRequest = async () => {
            const deleted = await Job.remove(888);
            return deleted;}
        expect(faultyRequest()).rejects.toThrow(NotFoundError);
    });
});