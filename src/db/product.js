module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      brand: { type: DataTypes.STRING, allowNull: false },
      imageurl: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: true },
    },
    { timestamps: true }
  )

  Product.associate = (models) => {
    Product.hasMany(models.Review)
    Product.hasMany(models.Cart)
    Product.belongsToMany(models.User, {
      through: { model: models.Cart },
      unique: false,
      timestamps: false,
    })
  }

  return Product
}
