const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
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
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    url_image: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false,
  });

  return Product;
}

module.exports = Product;
