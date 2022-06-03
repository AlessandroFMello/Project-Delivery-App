const User = (sequelize, DataTypes) => {
  const User = sequelize.define ('User', {
    id: {
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },  
  }, {
    underscored: true,
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Sale,
      { foreignKey: 'user_id', as: 'userId' });
    User.hasMany(models.Sale,
      { foreignKey: 'seller_id', as: 'sellerId' });
  };
  
  return User;
};

module.exports = User;