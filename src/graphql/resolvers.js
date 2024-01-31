import { countryInfo } from './country'

const resolvers = {
  Query: {
    countries: async (_, { value }) => {
      const response = countryInfo.filter(({ name }) => {
        const formattedName = name.toLowerCase()
        const formattedValue = value.toLowerCase()
    
        return formattedName.startsWith(formattedValue)
      }).map(({ name, currency }) => {
        return {
          name,
          currency: currency.name
        }
      })
      return response
    }
  }
}

export default resolvers
