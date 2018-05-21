// @flow

import { nodeDefinitions, fromGlobalId } from 'graphql-relay'

import User from '../loader/UserLoader'
import Hero from '../loader/HeroLoader'
import { UserLoader } from '../loader'

import UserType from '../type/UserType'
import HeroType from '../type/HeroType'

import { getHeroList, getHeroById } from '../resolvers/HeroResolver'

const { nodeField, nodeInterface } = nodeDefinitions(
  // A method that maps from a global id to an object
  async (globalId, context) => {
    const { id, type } = fromGlobalId(globalId);
    console.log("NodeDefinitions (globalId), id:", id);
    console.log("NodeDefinitions (globalId), type:", type);

    if (type === 'User') {
      return await UserLoader.load(context, id);
    }

    if (type === 'Hero') {
      return await getHeroById(context, id);
    }
  },
  // A method that maps from an object to a type
  obj => {
    // console.log('obj: ', typeof obj, obj.constructor);
    if (obj instanceof User) {
      return UserType;
    }
    if (obj instanceof Hero) {
      return HeroType;
    }
  }
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
