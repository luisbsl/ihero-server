// @flow

import {
  GraphQLInt,
} from 'graphql';

import {
  connectionDefinitions,
} from 'graphql-relay';

import HeroType from '../type/HeroType';

export default connectionDefinitions({
  name: 'Hero',
  nodeType: HeroType
});
