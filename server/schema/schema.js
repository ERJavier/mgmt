//MONGOOSE MODELS 
const Project = require('../models/Project');
const Client = require("../models/Client");


const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require("graphql");

// CLIENT TYPE
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLID },
    description: { type: GraphQLID },
    status: { type: GraphQLID },
    client: {
        type: ClientType,
        resolve(parent, args) {
            return Client.findById(parent.clientId)
        }
    }
  }),
});

// CLIENT TYPE
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLID },
    email: { type: GraphQLID },
    phone: { type: GraphQLID },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
        type: new GraphQLList(ProjectType),
        resolve(parrent, args) {
          return Project.find();
        }
    },
    project: {
        type: ProjectType,
        args: { id: { type: GraphQLID }},
        resolve(parrent, args) {
            return Project.findById(args.id)
        }
    },
    clients: {
        type: new GraphQLList(ClientType),
        resolve(parrent, args) {
            return Client.find()
        }
    },
    client: {
        type: ClientType,
        args: { id: { type: GraphQLID }},
        resolve(parrent, args) {
            return Client.findById(args.id)
        }
    }
  }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});