# Adobe_backend
A simple social media platform consisting of a backend API and a frontend UI, and analytics pages. The platform also supports creating, reading, updating, and deleting operations for user profiles and posts. In addition, users can "like" and "unlike" posts. The analytics pages displays insights on user engagement and content popularity.

 <h2>Cyclic Link</h2>https://blue-tense-puppy.cyclic.app//<br/>
 
 Working Feautres :-
 
 User Endpoints:-
 - POST /users: Create a new user.
 - GET /users/{id}: Retrieve a user by id.
 - PUT /users/{id}: Update a user's name or bio by id.
 - DELETE /users/{id}: Delete a user by id.
 - GET /analytics/users: Retrieve the total number of users.
 - GET /analytics/users/top-active: Retrieve the top 5 most active users, based on the number of posts.

Post Endpoints:-
- POST /posts: Create a new post. The request should include the user_id.
- GET /posts/{id}: Retrieve a post by id.
- PUT /posts/{id}: Update a post's content by id.
- DELETE /posts/{id}: Delete a post by id.
- POST /posts/{id}/like: Increment the like count of a post by id.
- POST /posts/{id}/unlike: Decrement the like count of a post by id. The count should not go below 0.
- GET /analytics/posts: Retrieve the total number of posts.
- GET /analytics/posts/top-liked: Retrieve the top 5 most liked posts.

Implement basic validation for the input data:-
- Ensure required fields are present and in the correct format.
- Ensure the maximum length of string fields is not exceeded.
- Write test cases to verify the functionality of your API.

To check all the api's we can use tool such as postman or thunderclient, by adding the endpoints to the already deployed url which is given in the decription and by send the 
right request from the server we can test our api for desired outcomes, as per the limited time boundation the jest or cypress tool is not used.

# Front-end Repo Link
https://github.com/101beardo/adobe
