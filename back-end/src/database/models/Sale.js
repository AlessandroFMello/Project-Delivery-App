const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    sellerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    deliveryAddress: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    deliveryNumber: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    saleDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    sequelize,
    modelName: 'Sale',
    tableName: 'sales',
    timestamps: false,
  });
   
  Sale.associate = (models) => {
    Sale.hasOne(models.User,
      { sourceKey: "userId", foreignKey: "id", as: "user" },
    )
    Sale.hasOne(models.User,
      { sourceKey: "sellerId", foreignKey: "id", as: "seller" },
    )
  }
  
  return Sale;
}

module.exports = Sale;