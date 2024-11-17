import React from 'react'
import { Link } from 'react-router-dom'
import ButtonGroup from '../components/ButtonGroup'

type Props = {}

const Home = (props: Props) => {
  return (
    <div>

    <div>
      <div>Product api</div>
      <ButtonGroup buttons={
        [
          {
            href: '/product',
            btnText: 'Add product'
          },
          {
            href: '/products',
            btnText: 'View product'
          },
        ]
      } />
    </div>
    <div>
      <div>shop api</div>
      <ButtonGroup buttons={
        [
          {
            href: '/shop',
            btnText: 'Add shop'
          },
          {
            href: '/shops',
            btnText: 'View shop'
          },
        ]
      } />
    </div>
    </div>
  )
}

export default Home