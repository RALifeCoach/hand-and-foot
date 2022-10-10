import React, { useEffect, useState } from 'react'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'

const ApolloAppProvider: React.FC<any> = ({ children }) => {
  const [client, setClient] = useState<any>()

  useEffect(() => {
    const link = createHttpLink({
      uri: process.env.REACT_APP_GRAPHQL_PATH,
    })

    const client = new ApolloClient({
      link,
      cache: new InMemoryCache()
    })

    setClient(client)
  }, [])

  if (!client) {
    return null
  }

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

export default ApolloAppProvider
