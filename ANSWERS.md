<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
  1. We can use sessions to store info about a client on the server. We've specifically been using it to store auth related data to allow users to log in to reqtricted server paths

2. What does bcrypt do to help us store passwords in a secure manner.
  1. bcrypt hashes passwords to make them difficult to steal.

3. What does bcrypt do to slow down attackers?
  1. De-hashing passwords takes time. With enough passes, it can take years to properly decrypt a password.

4. What are the three parts of the JSON Web Token?
  1. payload, secret, options
