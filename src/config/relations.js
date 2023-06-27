
import Users from "../models/Users.js";
import Roles from "../models/Roles.js";
import UsersRoles from "../models/UsersRoles.js";
import Categories from "../models/Categories.js";
import Products from "../models/Products.js";
import Suppliers from "../models/Suppliers.js";

Users.belongsToMany(Roles, { through: UsersRoles });
Roles.belongsToMany(Users, { through: UsersRoles });

Categories.hasMany(Products, { foreignKey: "categories_id", sourceKey: "id" });
Products.belongsTo(Categories, { foreignKey: "categories_id", targetKey: "id" });

Suppliers.hasMany(Products, { foreignKey: "suppliers_id", sourceKey: "id" });
Products.belongsTo(Suppliers, { foreignKey: "suppliers_id", targetKey: "id" });

Users.hasMany(Products, { foreignKey: "users_id", sourceKey: "id" });
Products.belongsTo(Users, { foreignKey: "users_id", targetKey: "id" });