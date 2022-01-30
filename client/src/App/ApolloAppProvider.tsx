import React, { useEffect, useState } from 'react'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'

const ApolloAppProvider: React.FC<any> = ({ children }) => {
  const [client, setClient] = useState()

  useEffect(() => {
    const serverHost = window.location.host
    const link = createHttpLink({
      uri: `http://${serverHost}/api/v1/graphql`,
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
