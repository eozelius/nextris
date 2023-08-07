import classNames from 'classnames/bind';

import styles from './Grid.module.css'

export default function Grid () {
  // 10 columns, 20 rows
  const grid = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, 'asdf', null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null]
  ]

  return (
    <div className={styles['grid-container']}>
      {grid.map((row, i) => (
        <ol key={i}>
          {row.map((col, j) => {
            const cx = classNames.bind(styles)
            const className = cx({
              empty: col === null,
              cell: true,
            })

            return (
              <li key={j}>
                <div className={className}>
                  
                </div>
              </li>
            )
          })}
        </ol>
      ))}
    </div>
  )
}