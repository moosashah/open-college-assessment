- [x] setup server + database
- [x] setup graphql
- [x] add queries

  - [x] `courses(limit, sortOrder)`: Returns a list of courses in the database. Accepts optional parameters `limit` (integer) and `sortOrder` (enum: `ASC` | `DESC`).
  - [x] `course(id)`: Returns the course with the specified `id`.
  - [x] `collections`: Returns a list of all course collections (categories).
  - [x] `collection(id)`: Returns a specific collection along with all contained courses.

- [x] add mutations

  - [x] `addCourse(input)`: Adds a new course to the database.
  - [x] `updateCourse(id, input)`: Updates a course's details based on its ID.
  - [x] `deleteCourse(id)`: Deletes a course from the database by its ID.

- [x] add authentication + authorization
  - [x] `register(username, password)`: Allows users to create a new account.
  - [x] `login(username, password)`: Authenticates users and returns an access token (JWT).
  - [x] Protect the mutations (`addCourse`, `updateCourse`, and `deleteCourse`) so that only authenticated users with valid JWT tokens can perform these actions.

Bonus:

- [x] Implement **role-based authorisation** (e.g., Admins can perform all actions, but regular users can only add or update their own courses).


- [ ] test everything
- [ ] clean up
- [ ] deploy
- [ ] demo

Startup

1. `docker compose up` (start local mysql database)
2. `cp .env.example .env`
3. `npm i`
4. `npm dev` (start dev server on localhost:4000 and run migrations)
5. test on `http://localhost:4000/graphql`
