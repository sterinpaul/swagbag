const RoleAndPermission = require("../models/RoleAndPermissions");
const users = require("../models/UsersModel");

exports.create = (req, res) => {
    const roleandpermission = new RoleAndPermission(req.body);
    roleandpermission.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        res.json({ data });
    });
};

exports.viewRoleAndPermission = (req, res) => {
    RoleAndPermission.find()
        .sort("createdAt")
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            res.json(data);
        });
};

exports.updateBoth = (req, res) => {
    RoleAndPermission.findOneAndUpdate(
        { _id: req.roleandpermission._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, roleandpermission) => {
            if (err) {
                return res.status(400).json({
                    error: "RoleAndPermission are not updated",
                });
            }
            res.json(roleandpermission);
        }
    );
};

exports.bothById = (req, res, next, id) => {
    RoleAndPermission.findById(id).exec((err, roleandpermission) => {
        if (err || !roleandpermission) {
            return res.status(400).json({
                error: "Role and Permissions not Found",
            });
        }
        req.roleandpermission = roleandpermission;
        next();
    });
};


exports.deleteRole = (req, res) => {
    const roleandpermission = req.roleandpermission;
    users.countDocuments({ role: `${roleandpermission._id}` }, function (err, count) {
        if (err) {
            console.log(err)
        } else {
            if (count > 0) {
                return res.status(400).json({ error: 'Role is Used ' })
            } else {
                roleandpermission.remove((err, data) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        });
                    }
                    res.json({ message: 'Role Deleted Successfully' });
                });
            }
        }
    });
    // console.log(roleandpermission._id);
};

// exports.countRoleAssigned = (req, res) => {
//     const roleandpermission = req.roleandpermission;
//     users.countDocuments({ role: `${roleandpermission._id}` }, function (err, count) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("Count :", count)
//             return res.status(200).json({ count: count })
//         }
//     });
// }
