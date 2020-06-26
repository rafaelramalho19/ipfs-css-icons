import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number, color } from '@storybook/addon-knobs'
import camelcase from 'camelcase'
import 'tachyons'

const requireContext = require.context('!@svgr/webpack!ipfs-css/icons', true, /\.svg?$/)
const modules = requireContext.keys()
const icons = modules.map(m => ({
    name: camelcase(m.replace('./', '').replace('.svg', ''), {pascalCase: true}),
    Icon: requireContext(m).default
}))

const filterByTextQuery = (icon) => {
  const searchQuery = text('Search', '')
  return icon?.name?.includes(searchQuery)
}

storiesOf('Icons')
  .addDecorator(withKnobs)
  .add('List', () => {
    const size = number('Size', 32, { range: true, min: 1, max: 200, step: 1 })
    const fill = color('Fill', undefined)
    const stroke = color('Stroke', undefined)

    console.log(size)

    return (
      <div className="flex w-100 flex-wrap">
        {icons.filter(filterByTextQuery).map(({ Icon, name }) => (
          <div className="flex items-center flex-column ma3" key={name}>
            <Icon fill={fill} stroke={stroke} width={size} height={size} className="transition-all" />
            <span>{ name }</span>
          </div>)
        )}
      </div>
    )
  })
