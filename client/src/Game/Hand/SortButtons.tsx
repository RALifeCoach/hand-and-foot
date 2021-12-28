import React from 'react'
import useSendMessage from '../hooks/useSendMessage'
import {useRecoilValue} from 'recoil'
import {sortOrderAtom} from '../../atoms/game'
import cx from 'clsx'

const SortButtons = () => {
  const sortOrder = useRecoilValue(sortOrderAtom)
  const sendMessage = useSendMessage()
  return (
    <div className="flex flex-col w-15 mr-2 mb-2 mt-3 text-center cursor-pointer">
      <div
        className={cx(
          'p-2 border text-xl border-gray-600 mb-1',
          {
            'bg-blue-300': sortOrder === 'rank',
            'bg-gray-300': sortOrder !== 'rank'
          }
        )}
        onClick={() => sendMessage('setSortOrder', {sortOrder: 'rank'})}
      >
        A-4
      </div>
      <div
        className={cx(
          'p-2 border text-xl border-gray-600 mb-1',
          {
            'bg-blue-300': sortOrder === 'suit',
            'bg-gray-300': sortOrder !== 'suit'
          }
        )}
        onClick={() => sendMessage('setSortOrder', {sortOrder: 'suit'})}
      >
        {String.fromCharCode(9824)}-{String.fromCharCode(9827)}
      </div>
    </div>
  )
}

export default SortButtons
