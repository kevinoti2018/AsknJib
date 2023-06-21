import request from 'supertest'
import app from '../app'
import {describe,it,expect,test} from 'vitest'

describe('answer tests',()=>{
    // test('should return success message when vote is casted successfully', async () => {
    //     const response = await request(app)
    //       .post('/downvote')
    //       .send({ User_Id: '123456789', AnswerId: 'a8042b60-a237-436f-8ce3-484f8660c95f3' });
    
    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual({ message: 'Vote casted successfully.' });
    //   });

    it('should return error message when user has already voted for the answer', async () => {
        const User_Id = '123456789';
        const AnswerId = 'a8042b60-a237-436f-8ce3-484f8660c95f';
      
        const response = await request(app)
          .patch(`/answers/downvote/${AnswerId}/${User_Id}`)
          .set('token', 'your_auth_token');
      
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'User has already voted for this answer.' });
      });
      
    })