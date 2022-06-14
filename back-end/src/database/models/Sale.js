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
    },
    sellerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    Sale.belongsTo(models.User,
      { foreignKey: 'user_id', as: 'userSaleId' },
    )
    Sale.belongsTo(models.User,
      { foreignKey: 'seller_id', as: 'SellerSaleId' },
    )
  }
  
  return Sale;
}

module.exports = Sale;