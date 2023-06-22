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
  
    // ====== invalid question id========///
    it('Should return 404 if question does not exist', async () => {
        //wrong question id
      const nonExistingQuestionId = '789012';
  
      // Make a request to delete the non-existing question
      const response = await request(app).put(`/questions/deletequestion/${nonExistingQuestionId}`).set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImtlbHZpbm90aXhAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIkMmIkMTAkWUZIU2FlT0I0b01UUkJrM0N3RXppLmxCZmI4ai5GRmJHWnVINVZ1bUUwSnlGRVFiaVRBZDIiLCJJc0FkbWluIjp0cnVlLCJpYXQiOjE2ODczNDU5NjEsImV4cCI6MTY4NzYwNTE2MX0.NQqS13QBw00yhq3zVSGe9hO-V1DpmKcuL6DayYMjnKU');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Question does not exist' });
    });
// =========  wrong user id======////
    it('Should return "User question not found" when user questions are not found', async () => {
      const userId = 'non-existent-user-id';
    
      // Make a request to get user questions with tags
      const response = await request(app)
        .get(`/questions/userquestions/${userId}`)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImtlbHZpbm90aXhAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIkMmIkMTAkWUZIU2FlT0I0b01UUkJrM0N3RXppLmxCZmI4ai5GRmJHWnVINVZ1bUUwSnlGRVFiaVRBZDIiLCJJc0FkbWluIjp0cnVlLCJpYXQiOjE2ODczNDU5NjEsImV4cCI6MTY4NzYwNTE2MX0.NQqS13QBw00yhq3zVSGe9hO-V1DpmKcuL6DayYMjnKU')
        .expect(404);
    
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User question not found' });
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

      it('Should return unauthorized if no token is provided', async () => {
        const userId = '1234567890';
      
        // Make a request to get questions by user without setting the token header
        const response = await request(app)
          .get(`/questions/userquestions/${userId}`)
          .expect(401);
      
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Unauthorized' });
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

      it('Should return unauthorized if no token is provided', async () => {
        // Make a request to get questions without setting the token header
        const response = await request(app)
          .get('/questions/allquestions')
          .expect(401);
      
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Unauthorized' });
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

      


      it('Should retrieve a question with id successfully', async () => {
        const questionId = 'a39d0834-8d76-4703-8dbf-c17b8b60d81f';
        
      
        // Make a request to search for a question
        const response = await request(app)
          .get(`/questions/question/${questionId}`)
          .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImtlbHZpbm90aXhAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIkMmIkMTAkWUZIU2FlT0I0b01UUkJrM0N3RXppLmxCZmI4ai5GRmJHWnVINVZ1bUUwSnlGRVFiaVRBZDIiLCJJc0FkbWluIjp0cnVlLCJpYXQiOjE2ODczNDU5NjEsImV4cCI6MTY4NzYwNTE2MX0.NQqS13QBw00yhq3zVSGe9hO-V1DpmKcuL6DayYMjnKU')
          .expect(200);
      
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('QuestionId');
        expect(response.body).toHaveProperty('Title');
        expect(response.body).toHaveProperty('Details');
        expect(response.body).toHaveProperty('Try');
        expect(response.body).toHaveProperty('Expect');
        expect(Array.isArray(response.body.Tags)).toBe(true);
      });

      it('Should return unauthorized if token is missing', async () => {
        const userId = '1234567890'; // Provide a valid user ID for testing
        const questionData = {
          Title: 'Sample Question 2',
          Details: 'This is a sample question 2',
          Try: 'Sample try 2',
          Expect: 'Sample expect2',
          Tags: "'sample', 'testing'",
        };
      
        const response = await request(app)
          .post(`/questions/ask/${userId}`)
          .send(questionData)
          .expect(401);
      
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Unauthorized' });
      });
      
      
      it('Should return an error for a non-existent question ID', async () => {
        const questionId = 'non-existent-id';
        
        // Make a request to search for a non-existent question
        const response = await request(app)
          .get(`/questions/question/${questionId}`)
          .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImtlbHZpbm90aXhAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIkMmIkMTAkWUZIU2FlT0I0b01UUkJrM0N3RXppLmxCZmI4ai5GRmJHWnVINVZ1bUUwSnlGRVFiaVRBZDIiLCJJc0FkbWluIjp0cnVlLCJpYXQiOjE2ODczNDU5NjEsImV4cCI6MTY4NzYwNTE2MX0.NQqS13QBw00yhq3zVSGe9hO-V1DpmKcuL6DayYMjnKU')
          .expect(404);
      
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Question not found');
      });
      
      it('Should return unauthorized if no token is provided', async () => {
        const questionId = 'a39d0834-8d76-4703-8dbf-c17b8b60d81f';
      
        const response = await request(app)
          .get(`/questions/question/${questionId}`)
          .expect(401);
      
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Unauthorized' });
      });
      

      it('Should return "Not found" when no questions are found for the tag', async () => {
        const tag = 'nonexistenttag';
      
        const response = await request(app)
          .get(`/questions/tagquestion/${tag}`)
          .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImtlbHZpbm90aXhAZ21haWwuY29tIiwiUGFzc3dvcmQiOiIkMmIkMTAkWUZIU2FlT0I0b01UUkJrM0N3RXppLmxCZmI4ai5GRmJHWnVINVZ1bUUwSnlGRVFiaVRBZDIiLCJJc0FkbWluIjp0cnVlLCJpYXQiOjE2ODczNDU5NjEsImV4cCI6MTY4NzYwNTE2MX0.NQqS13QBw00yhq3zVSGe9hO-V1DpmKcuL6DayYMjnKU')
          .expect(404);
      
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Not found' });
      });
      
    

      it('Should return "Unauthorized" when no token is provided', async () => {
        const tag = 'exampletag';
      
        const response = await request(app)
          .get(`/questions/tagquestion/${tag}`)
          .expect(401);
      
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Unauthorized' });
      });
      
})  