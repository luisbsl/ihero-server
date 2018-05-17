// @flow

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { NodeInterface } from '../interface/NodeInterface'

export default new GraphQLObjectType({
  name: 'Hero',
  description: 'Hero data',
  fields: () => ({
    // id: globalIdField('Hero'),
    id: {
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
  })
});
