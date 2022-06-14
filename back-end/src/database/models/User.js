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
      { foreignKey: 'userId', as: 'userIdFromUser' });
    User.hasMany(models.Sale,
      { foreignKey: 'sellerId', as: 'sellerIdFromUser' });
  };
  
  return User;
};

module.exports = User;