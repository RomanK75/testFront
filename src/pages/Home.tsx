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
      <div>Stock api</div>
      <ButtonGroup buttons={
        [
          {
            href: '/stock/add',
            btnText: 'Add stock'
          },
          {
            href: '/stock/view',
            btnText: 'View stock'
          },
          {
            href: '/stock/edit',
            btnText: 'Edit/Delete stock'
          }
        ]
      } />
    </div>
    </div>
  )
}

export default Home