let app = require('../server');
let testServer = require('supertest');

describe('Test the root path', ()=>{
    test('It should respond 200 to the LOGOUT route', async (done) => {
        const response = await testServer(app).post('/api/user/logout');
        expect(response.statusCode).toBe(200);
        done()
        
    });
    test('It should respond 403 to the /user route when not logged in', async (done) => {
        const response = await testServer(app).get('/api/user');
        expect(response.statusCode).toBe(403);
        done()
    });
    test('It should return user info when logged in', async (done) => {
        //agent allows us to remember cookies, context, etc. for all requests
        let agent = testServer.agent(app);
        const userResponse = await agent
            .post('/api/user/login')
            .send({ username: 'meyer', password: '1234' });
        expect(userResponse.statusCode).toBe(200);
        console.log(userResponse)
        done()
        

    });
    
    
    
})
describe ('Test the colloborator route', ()=>{
    test('when logged in, and user is authorized to see project, it should return collaborator info', async (done) => {
        let agent = testServer.agent(app);
        const userResponse = await agent
            .post('/api/user/login')
            .send({ username: 'meyer', password: '1234' });
        expect(userResponse.statusCode).toBe(200);
        const collaboratorResponse = await agent
            .get('/api/collaborators?project_id=37')
        expect(collaboratorResponse.statusCode).toBe(200);
        // console.log(collaboratorResponse)
        done()
    })
    test('when user is logged in and has authorization for project, allow to add collaborators', async (done)=>{
        let agent = testServer.agent(app);
        const userResponse = await agent
            .post('/api/user/login')
            .send({ username: 'meyer', password: '1234' });
        expect(userResponse.statusCode).toBe(200);
        const collaboratorResponse = await agent
            .post('/api/collaborators?project_id=37')
            .send({user_id:1})
        expect(collaboratorResponse.statusCode).toBe(200);
        done()
    })
})