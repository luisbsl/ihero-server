const axios = require('axios')
const md5 = require('js-md5')

const PUBLIC_KEY = '91a708eda26c0f0b71e6259bbabe6c54'
const PRIVATE_KEY = '79afe778c90a6716279dea4e4ef0a940ae197301'
const timestamp = Number(new Date())
const hash = md5.create()
hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

const getHeroList = () => {
  const BASE_URL = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&comics=67311,67002,17490,67311&orderBy=name&limit=100&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`

  let hero = {}
  let heroes = []
  return axios
    .get(BASE_URL)
    .then(res => {
      let results = res.data.data.results
      results.forEach(obj => {
        if (obj.name !== 'Avengers') {
          hero = {
            id: obj.id,
            _id: obj.id,
            name: obj.name,
            description: obj.description,
            image: obj.thumbnail.path + '/standard_fantastic.jpg',
            comics: obj.comics.available,
            series: obj.series.available,
            stories: obj.stories.available
          }
          heroes.push(hero)
        }
      })
      heroes.id = 1
      return heroes
    })
    .catch(err => {
      console.error(err)
    })
}

const getHeroById = (id) => {
    const BASE_URL = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`

    let hero = {}
    return axios
      .get(BASE_URL)
      .then(res => {
        let results = res.data.data.results
        results.map(obj => {
          hero = {
            id: obj.id,
            _id: obj.id,
            name: obj.name,
            description: obj.description,
            image: obj.thumbnail.path + '/standard_fantastic.jpg',
            comics: obj.comics.available,
            series: obj.series.available,
            stories: obj.stories.available
          }
        })
        return hero
      })
      .catch(err => {
        console.error(err)
      })
}

export {
  getHeroList,
  getHeroById
}