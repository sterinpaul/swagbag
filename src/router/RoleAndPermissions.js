const { create, viewRoleAndPermission, updateBoth, bothById, deleteRole } = require('../controllers/RoleAndPermission');


module.exports = function (app) {
    app
        .get('/viewboth', viewRoleAndPermission)
        .post('/createroleandpermission', create)
        .put('/updateboth/:bothId',updateBoth)
        .delete('/delete/:bothId',deleteRole)
        .param('bothId',bothById)
    } 


    // .get('/countrole/:bothId',countRoleAssigned)
