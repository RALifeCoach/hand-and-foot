import React, {memo, useEffect, useState} from 'react'
import Loading from './Loading'
import SnackAlert from './SnackAlert'

export interface IProps {
  status: { status: string, response: any, exception: Error };
  title?: string;
}

const FetchHandling = (props: IProps) => {
  const {status, title} = props
  const [error, setError] = useState('')

  useEffect(() => {
    if (status.status === 'failure') {
      if (status.exception.message === 'Forbidden') {
        throw new Error('You are not authorized to run this application.')
      }
      setError(status.exception.message)
    }
  }, [status.status, status.exception])

  return (
    <>
      <Loading open={status.status === 'in progress'} title={title}/>
      <SnackAlert
        open={error !== ''}
        text={`Fetch Failed with message: ${error}`}
        onClose={() => setError('')}
        severity="error"
      />
    </>
  )
}

export default memo(FetchHandling)
