import request from 'supertest'
import app from '../app'
import {describe,it,expect} from 'vitest'



describe('Users Test Cases',()=>{
 //============================// register user========================================//
    // it('Should register a user successfully', async () => {
    //     // Define a mock user object
    //     const mockUser = {
    //       Username: 'brian1',
    //       Email: 'kalusi1@gmail.com',
    //       Password: '#Kyu@2020',
    //     };
    
    //     // Make a request
    //     const response = await request(app).post('/usersroutes/register').send(mockUser);
    
    //     // response status code is 201
    //     expect(response.status).toBe(201);
    
    //     // check if response content type is JSON
    //     expect(response.headers['content-type']).toContain('application/json');
    
    //     // check  message
    //     expect(response.body).toEqual({ message: 'User added' });
    //   });




 //============================// not accept same credentials //========================================//
 it('Should return an error when email and username are already in use', async () => {
    // Define a mock user object
    const mockUser = {
      Username: 'brian',
      Email: 'kalusi@gmail.com',
      Password: '#Kyu@2020',
    };

    // Make a request
    const response = await request(app).post('/usersroutes/register').send(mockUser);

    expect(response.status).toBe(500);
    expect(response.headers['content-type']).toContain('application/json');
    // check  message
    expect(response.body).toEqual(expect.any(String));
  });



//=====================///incomplete user data///==============================================//
      
  it('Should return an error when registration data is incomplete', async () => {
    // mock user object with missing required fields
    const mockUser = {
      Username: 'testuser',
      Password: 'testpassword',
    };

    // Make a request  with the incomplete mock user
    const response = await request(app).post('/usersroutes/register').send(mockUser);
    //  response status code is 404
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.body).toEqual(expect.any(String));
  });


//=================================login user=============================//

it('Should login a user successfully', async () => {
    // Define a mock user 
    const mockUser = {
      Email: 'kalusi@gmail.com',
      Password: '#Kyu@2020',
    };
    // Make a request to login with the mock user
    const response = await request(app).post('/usersroutes/login').send(mockUser);
    expect(response.status).toBe(200);    
    expect(response.headers['content-type']).toContain('application/json');
   
  });
    
  it('Should return an error when providing invalid email or password', async () => {
    // Define a mock user object with invalid email and password
    const mockUser = {
      Email: 'invalidemail@example.com',
      Password: 'invalidpassword',
    };
    // Make a request to login with the invalid credentials
    const response = await request(app).post('/usersroutes/login').send(mockUser);
    expect(response.status).toBe(401);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.body).toEqual({ message: 'Invalid email or password' });
  });
//========================get all users==============//
    it('Should get users', async () => {
    // Making a request 
    const response = await request(app).get('/usersroutes/allusers').set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InZpbmllQGdtYWlsLmNvbSIsIlBhc3N3b3JkIjoiJDJiJDEwJERiN3REZmY1QnRDSlRBVUp3VmpORy5QVVpvbVFQN2hSdUdSMlV1bzVOZlpwYmFkc3YyME5pIiwiSXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY4NzM0NDI2NCwiZXhwIjoxNjg3NjAzNDY0fQ.qZ2VMOIFbUW1okobg63Kg7Dz65jfoaznIyW3KP45hsY');
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toContain('application/json');
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('Username');
    }
    });

    //====================================== exec

    
})

