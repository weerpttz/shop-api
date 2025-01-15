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
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    country: DataTypes.STRING
},
{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true
})
export const Session_Token = sequelize.define('Session_Token', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: DataTypes.INTEGER,
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
    user_id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    sub_district: DataTypes.STRING,
    district: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    zip_code: DataTypes.STRING
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
    create_by: DataTypes.INTEGER
})
export const Product = sequelize.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    create_by: DataTypes.INTEGER
},
{
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    paranoid: true,
    timestamps: true
})
export const Product_Category = sequelize.define('Product_Category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
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
    discount: DataTypes.INTEGER,
    order_status: DataTypes.STRING,
    create_by: DataTypes.INTEGER
},
{
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    paranoid: true,
    timestamps: true
})
export const Order_Product_Cache = sequelize.define('Order_Product_Cache', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_name_cache: DataTypes.STRING,
    product_image_cache: DataTypes.STRING,
    product_description_cache: DataTypes.STRING,
    product_price_cache: DataTypes.STRING,
    product_quantity_cache: DataTypes.STRING,
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
    order_id: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    paid_amount: DataTypes.INTEGER,
    paid_date: DataTypes.DATE,
    slip: DataTypes.STRING,
    payment_status: DataTypes.STRING
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
    address_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    shipping_type: DataTypes.STRING,
    address_first_name: DataTypes.STRING,
    address_last_name: DataTypes.STRING,
    address_phone_number: DataTypes.STRING,
    address_address: DataTypes.STRING,
    address_sub_district: DataTypes.STRING,
    address_district: DataTypes.STRING,
    address_province: DataTypes.STRING,
    address_country: DataTypes.STRING,
    address_zip_code: DataTypes.STRING,
    shipping_status: DataTypes.STRING
},
{
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    paranoid: true,
    timestamps: true
})

export const Admin = sequelize.define('Admin_User', {
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
export const Admin_Token = sequelize.define('Session_Admin_Token', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    admin_id: DataTypes.INTEGER,
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