// @flow

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { NodeInterface } from '../interface/NodeInterface'

export default new GraphQLObjectType({
  name: 'Hero',
  description: 'Attributes of hero',
  fields: () => ({
    id: globalIdField('Hero'),
    _id: {
      type: GraphQLString,
      resolve: hero => hero.id
    },
    name: {
      type: GraphQLString,
      resolve: hero => hero.name
    },
    description: {
      type: GraphQLString,
      resolve: hero => hero.description
    },
    image: {
      type: GraphQLString,
      resolve: hero => hero.image
    },
    comics: {
      type: GraphQLInt,
      resolve: hero => hero.comics
    },
    series: {
      type: GraphQLInt,
      resolve: hero => hero.series
    },
    stories: {
      type: GraphQLInt,
      resolve: hero => hero.stories
    }
  }),
  interfaces: () => [NodeInterface]
});