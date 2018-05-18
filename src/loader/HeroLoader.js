import type { GraphQLContext } from '../TypeDefinition';

import { getHeroList, getHeroById } from '../resolvers/HeroResolver'

type HeroType = {
  id: string,
  name: string,
  image: string,
  description: string,
  comics: string,
  series: string,
  stories: string
};

export default class Hero {
  id: string
  name: string
  image: string
  description: string
  comics: string
  series: string
  stories: string

  constructor(data: HeroType, { hero }: GraphQLContext) {
    id: data.id
    name: data.name
    image: data.image
    description: data.description
    comics: data.comics
    series: data.series
    stories: data.stories
  }
}