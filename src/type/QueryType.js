// @flow

import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql';
import { globalIdField, connectionArgs, fromGlobalId } from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';

import UserType from './UserType';
import HeroType from './HeroType'
import { NodeField } from '../interface/NodeInterface';
import { UserLoader } from '../loader';
import UserConnection from '../connection/UserConnection';
import HeroConnection from '../connection/HeroConnection';

const axios = require('axios')
const md5 = require('js-md5')

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    heroes: {
      type: new GraphQLList(HeroType),
      // type: HeroConnection.connectionType,
      // args: {
      //   ...connectionArgs,
      //   search: {
      //     type: GraphQLString,
      //   },
      // },
      resolve: (_, args, root, ast) => {
        return [
          {
            "id": "1009187",
            "name": "Black Panther",
            "description": "",
            "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/60/5261a80a67e7d/standard_fantastic.jpg"
          },
          {
            "id": "1009220",
            "name": "Captain America",
            "description": "Vowing to serve his country any way he could, young Steve Rogers took the super soldier serum to become America's one-man army. Fighting for the red, white and blue for over 60 years, Captain America is the living, breathing symbol of freedom and liberty.",
            "image": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087/standard_fantastic.jpg"
          },
          {
            "id": "1010338",
            "name": "Captain Marvel (Carol Danvers)",
            "description": "",
            "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/80/5269608c1be7a/standard_fantastic.jpg"
          },
          {
            "id": "1009282",
            "name": "Doctor Strange",
            "description": "",
            "image": "http://i.annihil.us/u/prod/marvel/i/mg/5/f0/5261a85a501fe/standard_fantastic.jpg"
          },
          {
            "id": "1009368",
            "name": "Iron Man",
            "description": "Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man.",
            "image": "http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55/standard_fantastic.jpg"
          },
          {
            "id": "1009583",
            "name": "She-Hulk (Jennifer Walters)",
            "description": "Seriously wounded, young lawyer Jennifer Walters was given a blood transfusion by her cousin Bruce Banner. Usually in better control of her powers and temper than the Hulk, She-Hulk has been a high profile New York lawyer as well as an upstanding member of both the Avengers and Fantastic Four.",
            "image": "http://i.annihil.us/u/prod/marvel/i/mg/7/20/527bb5d64599e/standard_fantastic.jpg"
          },
          {
            "id": "1009664",
            "name": "Thor",
            "description": "As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate.  He's self-assured, and he would never, ever stop fighting for a worthwhile cause.",
            "image": "http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350/standard_fantastic.jpg"
          }
        ]

        // const PUBLIC_KEY = '91a708eda26c0f0b71e6259bbabe6c54'
        // const PRIVATE_KEY = '79afe778c90a6716279dea4e4ef0a940ae197301'
        // const timestamp = Number(new Date())
        // const hash = md5.create()
        // hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

        // const BASE_URL = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&comics=67311&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`

        // let hero = {}
        // let heroes = []
        // return await axios
        //   .get(BASE_URL)
        //   .then(res => {
        //     let results = res.data.data.results
        //     results.forEach(obj => {
        //       if (obj.name !== 'Avengers') {
        //         hero = {
        //           id: obj.id,
        //           name: obj.name,
        //           description: obj.description,
        //           image: obj.thumbnail.path + '/standard_fantastic.jpg'
        //         }
        //         heroes.push(hero)
        //       }
        //     })
        //     return heroes
        //   })
        //   .catch(err => {
        //     console.error(err)
        //   })
      }
    },
    hero: {
      type: HeroType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (obj, args, context) => {
        const PUBLIC_KEY = '91a708eda26c0f0b71e6259bbabe6c54'
        const PRIVATE_KEY = '79afe778c90a6716279dea4e4ef0a940ae197301'
        const timestamp = Number(new Date())
        const hash = md5.create()
        hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

        const BASE_URL = `https://gateway.marvel.com/v1/public/characters/${args.id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`

        let hero = {}
        await axios
          .get(BASE_URL)
          .then(res => {
            let results = res.data.data.results
            results.map(obj => {
              hero = {
                id: obj.id,
                name: obj.name,
                description: obj.description,
                image: obj.thumbnail.path + '/standard_fantastic.jpg'
              }
            })
          })
          .catch(err => {
            console.error(err)
          })

        return hero
      },
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
