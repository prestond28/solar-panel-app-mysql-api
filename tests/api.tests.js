import { use, expect } from 'chai'
import chaiHttp from 'chai-http'
const chai = use(chaiHttp)

const request = chai.request.execute;

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwODgxMTQwLCJleHAiOjE3NDA5Njc1NDB9.thOWR0PqrZ2JSX1fQyo2WXoaH5wHFdqhRkqBAzDqg-Y';

describe('Auth API service', () => {
  // run one time then .skip once working
  it.skip('should POST a new user (only tested once on initial setup)', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };
    const expected = { msg: 'New user created!' };

    request('http://localhost:3001')
      .post('/api/auth/register')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  it('should not POST a new user if they already exist', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };
    const expected = { msg: 'User already exists!' };

    request('http://localhost:3001')
      .post('/api/auth/register')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  it('should POST a login for an existing user', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };

    request('http://localhost:3001')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body.auth).to.be.true;
        expect(resp.body.expires_in).to.be.eql(86400);
        expect(resp.body.access_token).to.be.a('string');
        expect(resp.body.refresh_token).to.be.a('string');
        done();
      });
  });
});

describe('Data API Service', () => {
  // it('should POST a single task', (done) => {
  //   const newTask = {
  //     user_id: '1',
  //     task_name: 'New test task!',
  //   };
  //   const expected = { message: 'Added task successfully!' };

  // request('http://localhost:3001')
  //     .post('/api/tasks')
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .send(newTask)
  //     .end((err, resp) => {
  //       expect(resp.status).to.be.eql(200);
  //       expect(resp.body).to.be.eql(expected);
  //       done();
  //     });
  // });

  it('should GET all data from energy table', (done) => {
    request('http://localhost:3001')
      .get('/api/data')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, resp) => {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });

  // it('should GET a single row of data', (done) => {
  //   const expected = [
  //     {
  //       task_id: 1,
  //       user_id: 1,
  //       task_name: "New test task!",
  //       created_date: "2025-03-01T18:32:44.000Z",
  //       status: "pending",
  //     },
  //   ];

  // request('http://localhost:3001')
  //     .get('/api/tasks/1')
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .end((err, resp) => {
  //       expect(resp.status).to.be.eql(200);
  //       expect(resp.body).to.be.a('array');
  //       expect(resp.body.length).to.not.be.eql(0);
  //       expect(resp.body).to.be.eql(expected);
  //       done();
  //     });
  // });
});


describe('User API service', () => {
  it("should GET a logged in user's unique id, username, and password", (done) => {
    const expected = [
      {
        user_id: 1,
        username: 'admin',
        email: 'admin@example.com',
      },
    ];

  request('http://localhost:3001')
      .get('/api/user/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });

//   // run one time then skip once working
//   it.skip('should PUT updated credentials for a logged in user', (done) => {
//     const updatedUser = {
//       username: 'admin2',
//       password: 'newPassword',
//       email: 'admin@example.com',
//     };
//     const expected = { msg: 'Updated succesfully!' };

//   request('http://localhost:3001')
//       .put('/api/user/me/update')
//       .set('Authorization', `Bearer ${AccessToken}`)
//       .send(updatedUser)
//       .end((err, resp) => {
//         expect(resp.body).to.eql(expected);
//         done();
//       });
//   });

//   it('should PUT updated credentials for a logged in user', (done) => {
//     const updatedUser = {
//       username: 'admin',
//       password: 'password',
//       email: 'admin@example.com',
//     };
//     const expected = { msg: 'Nothing to update...' };

// request('http://localhost:3001')
//       .put('/api/user/me/update')
//       .set('Authorization', `Bearer ${token}`)
//       .send(updatedUser)
//       .end((err, resp) => {
//         expect(resp.body).to.eql(expected);
//         done();
//       });
//   });
});