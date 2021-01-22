module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      u_name: { type: DataTypes.STRING, allowNull: false },
      u_img: { type: DataTypes.STRING, allowNull: true },
    },
    { timestamps: true }
  )

  User.associate = (models) => {
    User.belongsToMany(models.Product, {
      through: { model: models.Cart },
      unique: false,
      timestamps: false,
    })
    User.hasMany(models.Cart)
  }
  return User
}
