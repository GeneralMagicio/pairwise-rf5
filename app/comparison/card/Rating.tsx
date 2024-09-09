import { FC } from 'react'
import { Rating as RatingComponent, Star } from '@smastrom/react-rating'

interface Props {
  value: number
  onChange: (val: number) => void
}

export const Rating: FC<Props> = ({ value, onChange }) => {
  return (

    <div className="flex w-[350px] items-center justify-between rounded-lg bg-gray-950 px-4 py-6">
      <span className="text-sm text-white"> Rate this project </span>
      <RatingComponent
        style={{ maxWidth: 165, maxHeight: 25 }}
        value={value || 3}
        onChange={onChange}
        isRequired={true}
        itemStyles={{
          itemShapes: Star,
          activeFillColor: value === null ? '#454545' : '#ffe100',
          inactiveFillColor: '#aaa',
        }}
      />
    </div>
  )
}
