import { Fragment } from 'react'

// Wraps each word in a mask so it can slide up into view (see utils/scrollMotion.ts)
function Words({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="word"><span className="word-inner">{word}</span></span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  )
}

export default Words
