import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize('sqlite::memory:')

export const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    country: DataTypes.STRING,
    updateBy: DataTypes.INTEGER,
    deleteBy: DataTypes.INTEGER
},
{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true
})
export const SessionToken = sequelize.define('SessionToken', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    token: DataTypes.STRING
},
{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true
})
export const Address = sequelize.define('Address', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    subDistrict: DataTypes.STRING,
    district: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    updateBy: DataTypes.INTEGER,
    deleteBy: DataTypes.INTEGER
},
{
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    paranoid: true,
    timestamps: true
})
export const Category = sequelize.define('Category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name : DataTypes.STRING,
    createBy: DataTypes.INTEGER,
    updateBy: DataTypes.INTEGER,
    deleteBy: DataTypes.INTEGER
},
{
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    paranoid: true,
    timestamps: true
})
export const Product = sequelize.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    createBy: DataTypes.INTEGER,
    updateBy: DataTypes.INTEGER,
    deleteBy: DataTypes.INTEGER
},
{
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    paranoid: true,
    timestamps: true
})
export const Order = sequelize.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    orderStatus: DataTypes.STRING,
    createBy: DataTypes.INTEGER,
    updateBy: DataTypes.INTEGER,
    deleteBy: DataTypes.INTEGER
},
{
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    paranoid: true,
    timestamps: true
})
export const OrderProductCache = sequelize.define('Order_Product_Cache', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productNameCache: DataTypes.STRING,
    productImageCache: DataTypes.STRING,
    productDescriptionCache: DataTypes.STRING,
    productPriceCache: DataTypes.STRING,
    productQuantityCache: DataTypes.STRING
},
{
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    paranoid: true,
    timestamps: true
})
export const Payment = sequelize.define('Payment',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    paidAmount: DataTypes.INTEGER,
    paidDate: DataTypes.DATE,
    slip: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    createBy: DataTypes.INTEGER,
    updateBy: DataTypes.INTEGER,
    deleteBy: DataTypes.INTEGER
},
{
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    paranoid: true,
    timestamps: true
})
export const Shipping = sequelize.define('Shipping', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    addressId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    shippingType: DataTypes.STRING,
    addressFirstName: DataTypes.STRING,
    addressLastName: DataTypes.STRING,
    addressPhoneNumber: DataTypes.STRING,
    addressAddress: DataTypes.STRING,
    addressSubDistrict: DataTypes.STRING,
    addressDistrict: DataTypes.STRING,
    addressProvince: DataTypes.STRING,
    addressCountry: DataTypes.STRING,
    addressZipCode: DataTypes.STRING,
    shippingStatus: DataTypes.STRING,
    createBy: DataTypes.INTEGER,
    updateBy: DataTypes.INTEGER,
    deleteBy: DataTypes.INTEGER
},
{
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    paranoid: true,
    timestamps: true
})

export const Admin = sequelize.define('AdminUser', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
},
{
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    paranoid: true,
    timestamps: true
})
export const AdminToken = sequelize.define('AdminToken', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    adminId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    token: DataTypes.STRING
},
{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true
})


try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}

(async () => {
    await sequelize.sync({ force: true});
    await Admin.create({
        username: 'admin',
        password: '12345'
    })
})()

export default sequelize