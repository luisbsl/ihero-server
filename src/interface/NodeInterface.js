// @flow

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import User from '../loader/UserLoader';
import { UserLoader } from '../loader';

import UserType from '../type/UserType';
import HeroType from '../type/HeroType';

const axios = require('axios')
const md5 = require('js-md5')

const PUBLIC_KEY = '91a708eda26c0f0b71e6259bbabe6c54'
const PRIVATE_KEY = '79afe778c90a6716279dea4e4ef0a940ae197301'
const timestamp = Number(new Date())
const hash = md5.create()
hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

const BASE_URL = `https://gateway.marvel.com/v1/public/characters/1009144?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`

const { nodeField, nodeInterface } = nodeDefinitions(
  // A method that maps from a global id to an object
  async (globalId, context) => {
    const { id, type } = fromGlobalId(globalId);

    // console.log('id, type: ', type, id, globalId);
    if (type === 'User') {
      return await UserLoader.load(context, id);
    }

    if (type === 'Hero') {
      return await axios
        .get(BASE_URL)
        .then(res => {
          let hero = {}
          let results = res.data.data.results
          results.map(obj => {
            hero = {
              _id: obj.id,
              name: obj.name,
              description: obj.description
            }
          })

          return hero
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  // A method that maps from an object to a type
  obj => {
    // console.log('obj: ', typeof obj, obj.constructor);
    // if (obj instanceof User) {
    //   return UserType;
    // }
    // if (obj instanceof Hero) {
    //   return HeroType;
    // }
    switch (obj.type) {
      case 'UserType': 
        return UserType;
      case 'HeroType':
        return HeroType
      default:
       return null;
    }
  },
);

export const NodeInterface = nodeInterface;
export const NodeField = nodeField;
