// @flow

import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql';
import { globalIdField, connectionArgs, fromGlobalId, connectionFromArray } from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';

import UserType from './UserType';
import HeroType from './HeroType'
import { NodeField } from '../interface/NodeInterface';
import { UserLoader } from '../loader';
import UserConnection from '../connection/UserConnection';
import HeroConnection from '../connection/HeroConnection';

import { getHeroList, getHeroById } from '../resolvers/HeroResolver'

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    heroes: {
      type: HeroConnection.connectionType,
      args: connectionArgs,
      resolve: async (_, args) => connectionFromArray(await getHeroList(), args)
    },
    hero: {
      type: HeroType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (obj, args, context) => await getHeroById(args.id)
    },
    me: {
      type: UserType,
      resolve: (root, args, context) => (context.user ? UserLoader.load(context, context.user.id) : null),
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (obj, args, context) => {
        const { id } = fromGlobalId(args.id);
        return UserLoader.load(context, id);
      },
    },
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args, context) => UserLoader.loadUsers(context, args)
    },
  }),
});
