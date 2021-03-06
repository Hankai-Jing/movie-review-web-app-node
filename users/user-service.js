const userDao = require('./user-dao');

module.exports = (app) => {
  const findAllUsers = (req, res) =>
      userDao.findAllUsers()
      .then(users => res.json(users));

  const findUserByUsername = (req, res) => {
    //console.log(req.params.username);
    userDao.findByUsername(req.params.username)
    .then(user => {
      if(user) {
        res.json(user);
        return;
      }
      console.log("not found")
      res.sendStatus(404);
    });
  }


  const deleteUser = (req, res) =>
      userDao.deleteUser(req.params.userId)
      .then(status => req.send(status));

  const updateUser = (req, res) => {
    console.log(req.body)
    userDao.updateUser(req.body)
    .then(status => {
      req.session['profile'] = req.body;
      res.send(status)
    });
  }


  const login = (req, res) => {
    console.log(req.body)
    userDao.findByUsernameAndPassword(req.body)
    .then(user => {
      if(user) {
        req.session['profile'] = user;
        //console.log("find")
        res.json(user);
        return;
      }
      res.sendStatus(403);
    })
  }

  const register = (req, res) => {
    userDao.findByUsername(req.body.username)
    .then(user => {
      if(user) {
        res.sendStatus(404);
        return;
      }
      userDao.createUser(req.body)
      .then(user => {
        console.log("new user")
        req.session['profile'] = user;
        res.json(user)
      });
    })
  }

  const profile = (req, res) =>
      res.json(req.session['profile']);

  const logout = (req, res) =>
      res.send(req.session.destroy());

  app.post('/api/login', login);
  app.post('/api/register', register);
  app.post('/api/profile', profile);
  app.post('/api/logout', logout);
  app.put('/api/profile', updateUser);
  app.delete('/api/users/:userId', deleteUser);
  app.get('/api/users', findAllUsers);
  app.get('/api/profile/:username', findUserByUsername);
};