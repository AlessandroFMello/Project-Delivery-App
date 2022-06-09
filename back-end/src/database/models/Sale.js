const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    seller_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    total_price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    delivery_address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    delivery_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    sale_date: {
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
      { foreignKey: 'user_id', as: 'userId' },
    )
    Sale.belongsTo(models.User,
      { foreignKey: 'seller_id', as: 'sellerId' },
    )
  }
  
  return Sale;
}

module.exports = Sale;