const { projects, clients } = require('../sampleData');

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
            return clients.find(client => client.id === parent.clientId)
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
            return projects
        }
    },
    project: {
        type: ProjectType,
        args: { id: { type: GraphQLID }},
        resolve(parrent, args) {
            return projects.find(project => project.id === args.id)
        }
    },
    clients: {
        type: new GraphQLList(ClientType),
        resolve(parrent, args) {
            return clients
        }
    },
    client: {
        type: ClientType,
        args: { id: { type: GraphQLID }},
        resolve(parrent, args) {
            return clients.find(client => client.id === args.id)
        }
    }
  }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});