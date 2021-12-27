import React, {memo, useEffect, useState} from 'react'
import Loading from './Loading'
import SnackAlert from './SnackAlert'

export interface IProps {
  status: { status: string, response: any, exception: Error };
  title?: string;
}

const UpdateHandling = (props: IProps) => {
  const {status, title} = props
  const [error, setError] = useState('')

  useEffect(() => {
    if (status.status === 'failure') {
      setError(status.exception.message)
    }
  }, [status.status, status.exception])

  return (
    <>
      <Loading open={status.status === 'in progress'} title={title}/>
      <SnackAlert
        open={error !== ''}
        text={`Update Failed with message: ${error}`}
        onClose={() => setError('')}
        severity="error"
      />
    </>
  )
}

export default memo(UpdateHandling)
