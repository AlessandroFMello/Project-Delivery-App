// const Sale = require("./Sale");

const SalesProducts = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
    sale_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    ṕroduct_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    underscored: true,
    sequelize,
    modelName: 'SalesProducts',
    tableName: 'sales_products',
    timestamps: false,
  });

  SalesProducts.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
  }
  
  return SalesProducts;
}

module.exports = SalesProducts;
