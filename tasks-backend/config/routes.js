module.exports = app => {
    app.post('/signup', app.api.users.save)
    app.post('/signin', app.api.auth.signin)
    
    app.route('/tasks')
    .all(app.config.passport.authenticate())
    .get(app.api.tasks.getTasks)
    .post(app.api.tasks.save)

    app.route('/tasks/:id')
    .all(app.config.passport.authenticate())
    .delete(app.api.tasks.deleteTask) 

    app.route('/tasks/:id/toggle')
    .all(app.config.passport.authenticate())
    .put(app.api.tasks.toggleTask)

}