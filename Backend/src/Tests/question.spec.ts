import request from 'supertest'
import app from '../app'
import {describe,it,expect} from 'vitest'





describe('Question tests', () => {
    // it('Should delete a question successfully', async () => {
    //   // Create a mock question ID
    //   const questionId = 'Q85';
  
    //   // Make a request to delete the question
    //   const response = await request(app).put(`/questions/deletequestion/${questionId}`).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImtlbHZpbm90aXhAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIkMmIkMTAkWUZIU2FlT0I0b01UUkJrM0N3RXppLmxCZmI4ai5GRmJHWnVINVZ1bUUwSnlGRVFiaVRBZDIiLCJJc0FkbWluIjp0cnVlLCJpYXQiOjE2ODczNDU5NjEsImV4cCI6MTY4NzYwNTE2MX0.NQqS13QBw00yhq3zVSGe9hO-V1DpmKcuL6DayYMjnKU');
  
    //   //  status code is 200
    //   expect(response.status).toBe(200);
    //   expect(response.body).toEqual({ message: 'Question deleted successfully' });
    // });
  
    it('Should return 404 if question does not exist', async () => {
        //wrong question id
      const nonExistingQuestionId = '789012';
  
      // Make a request to delete the non-existing question
      const response = await request(app).put(`/questions/deletequestion/${nonExistingQuestionId}`).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImtlbHZpbm90aXhAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIkMmIkMTAkWUZIU2FlT0I0b01UUkJrM0N3RXppLmxCZmI4ai5GRmJHWnVINVZ1bUUwSnlGRVFiaVRBZDIiLCJJc0FkbWluIjp0cnVlLCJpYXQiOjE2ODczNDU5NjEsImV4cCI6MTY4NzYwNTE2MX0.NQqS13QBw00yhq3zVSGe9hO-V1DpmKcuL6DayYMjnKU');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Question does not exist' });
    });

    ////get question by users

    it('Should retrieve questions by user  successfully', async () => {
      
        const userId = '1234567890';
    
        // Make a request to get questions by user with tags
        const response = await request(app).get(`/questions/userquestions/${userId}`).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImtlbHZpbm90aXhAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIkMmIkMTAkWUZIU2FlT0I0b01UUkJrM0N3RXppLmxCZmI4ai5GRmJHWnVINVZ1bUUwSnlGRVFiaVRBZDIiLCJJc0FkbWluIjp0cnVlLCJpYXQiOjE2ODczNDU5NjEsImV4cCI6MTY4NzYwNTE2MX0.NQqS13QBw00yhq3zVSGe9hO-V1DpmKcuL6DayYMjnKU');
    
        //response status code is 200
        expect(response.status).toBe(200);
    
        // response body contains the questions array
        expect(Array.isArray(response.body)).toBe(true);
    
        // response body contains the expected question structure
        response.body.forEach((question: any) => {
          expect(question).toHaveProperty('QuestionId');
          expect(question).toHaveProperty('Title');
          expect(question).toHaveProperty('Details');
          expect(question).toHaveProperty('Try');
          expect(question).toHaveProperty('Expect');
          expect(Array.isArray(question.Tags)).toBe(true);
        });
      });
    
      ////==============================get questions by tags======////
      it('Should retrieve questions by tag successfully', async () => {
        // Define a mock tag name
        const tagName = 'javascript';
    
        // Make a request to get questions by tag
        const response = await request(app).get(`/questions/tagquestion/${tagName}`).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImtlbHZpbm90aXhAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIkMmIkMTAkWUZIU2FlT0I0b01UUkJrM0N3RXppLmxCZmI4ai5GRmJHWnVINVZ1bUUwSnlGRVFiaVRBZDIiLCJJc0FkbWluIjp0cnVlLCJpYXQiOjE2ODczNDU5NjEsImV4cCI6MTY4NzYwNTE2MX0.NQqS13QBw00yhq3zVSGe9hO-V1DpmKcuL6DayYMjnKU');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    
        // response body contains the expected question structure
        response.body.forEach((question: any) => {
          expect(question).toHaveProperty('QuestionId');
          expect(question).toHaveProperty('Title');
          expect(question).toHaveProperty('Details');
          expect(question).toHaveProperty('Try');
          expect(question).toHaveProperty('Expect');
        });
      });

      //get all questions

      it('Should retrieve questions successfully', async () => {
        // Make a request to get questions
        const response = await request(app).get('/questions/allquestions').set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImtlbHZpbm90aXhAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIkMmIkMTAkWUZIU2FlT0I0b01UUkJrM0N3RXppLmxCZmI4ai5GRmJHWnVINVZ1bUUwSnlGRVFiaVRBZDIiLCJJc0FkbWluIjp0cnVlLCJpYXQiOjE2ODczNDU5NjEsImV4cCI6MTY4NzYwNTE2MX0.NQqS13QBw00yhq3zVSGe9hO-V1DpmKcuL6DayYMjnKU');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    
        // response body contains the expected question structure
        response.body.forEach((question: any) => {
          expect(question).toHaveProperty('QuestionId');
          expect(question).toHaveProperty('Title');
          expect(question).toHaveProperty('Details');
          expect(question).toHaveProperty('Try');
          expect(question).toHaveProperty('Expect');
          expect(Array.isArray(question.Tags)).toBe(true);
        });
      });
    
    //// insert a question

    it('Should insert a question and return the question with tags', async () => {
        const userId = '1234567890'; // Provide a valid user ID for testing
        const questionData = {
          Title: 'Sample Question 2',
          Details: 'This is a sample question 2',
          Try: 'Sample try 2',
          Expect: 'Sample expect2',
          Tags: "'sample', 'testing'",
        };
    
        // Make a request to insert a question
        const response = await request(app).post(`/questions/ask/${userId}`).send(questionData).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImtlbHZpbm90aXhAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIkMmIkMTAkWUZIU2FlT0I0b01UUkJrM0N3RXppLmxCZmI4ai5GRmJHWnVINVZ1bUUwSnlGRVFiaVRBZDIiLCJJc0FkbWluIjp0cnVlLCJpYXQiOjE2ODczNDU5NjEsImV4cCI6MTY4NzYwNTE2MX0.NQqS13QBw00yhq3zVSGe9hO-V1DpmKcuL6DayYMjnKU');
        ;
    
        // Assert the response status code is 200
        expect(response.status).toBe(200);
    
        //body contains the inserted question with tags
        expect(response.body).toEqual(expect.objectContaining({
          QuestionId: expect.any(String),
          Title: expect.any(String),
          Details: expect.any(String),
          Try: expect.any(String),
          Expect: expect.any(String),
          CreateDate: expect.any(String),
          VoteCount: expect.any(Number),
          Tags: expect.arrayContaining([expect.any(String)]),
        }));
      });
    
})  