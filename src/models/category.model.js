import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    paranoid: true,
    timestamps: true
});


// Create the database constraint if it does not exist
const createConstraint = async() => {
    await sequelize.query(`
      ALTER TABLE "categories"
      ADD CONSTRAINT unique_category_per_user
      UNIQUE ("name", "userId");
    `);
};

// Check if "unique_category_per_user" constraint already exists
const constraintExists = async() => {
    const [result] = await sequelize.query(`
      SELECT constraint_name
      FROM information_schema.table_constraints
      WHERE constraint_name = 'unique_category_per_user'
    `);
    if (result.length < 1) {
        await createConstraint();
        console.log(`Successful creation of unique keys`.bgGreen.white);
    }
};


// constraintExists();



export default Category;