const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const UserService = require('../src/users/users.service');
const OrderService = require('../src/orders/orders.service');
const userService = new UserService();
const orderService = new OrderService();

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        item_name: { type: GraphQLString },
        transaction_id: { type: GraphQLString },
        order_date: { type: GraphQLString },
        total_amount: { type: GraphQLString },
    }),
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        token: { type: GraphQLString },
        message: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        //User
        getAllUsers: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLID } },
            resolve: async (_, args) => {
                return await userService.getAllUsers()
            }
        },
        getUser: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: async (_, args) => {
                return await userService.getUser(args.id);

            },
        },



        //Order
        getUsersOrders: {
            type: new GraphQLList(OrderType),
            args: { id: { type: GraphQLID } },
            resolve: async (_, args, context) => {
                return await orderService.getUserOrders(context)
            }
        },

    },
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //User
        register: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                token: { type: GraphQLString },

            },
            resolve: async (_, args) => {
                return await userService.postRegister(args.username, args.email, args.password);
            },
        },
        login: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                token: { type: GraphQLString },

            },
            resolve: async (_, args) => {
                return await userService.postLogin(args.email, args.password);
            },
        },
        deposit: {
            type: UserType,
            args: {
                amt: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (_, args, context) => {
                return await userService.postDeposit(args.amt, context);
            },
        },

        //Order
        createOrder: {
            type: OrderType,
            args: {
                amt: { type: new GraphQLNonNull(GraphQLInt) },
                item_name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, args, context) => {
                return await orderService.postCreateOrder(args.amt, args.item_name, context);
            },
        },

    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});

