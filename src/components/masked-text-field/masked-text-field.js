import IMask from 'imask';
import './masked-text-field.scss';
const maskOptions= {
  mask: Date,  // enable date mask

  // other options are optional
  pattern: 'd.`m.`Y',  // Pattern mask with defined blocks, default is 'd{.}`m{.}`Y'
  // you can provide your own blocks definitions, default blocks for date mask are:
  blocks: {
    d: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
      maxLength: 2,
    },
    m: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
    Y: {
      mask: IMask.MaskedRange,
      from: 1900,
      to: 2022,
    }}}
const handleContentLoaded=()=>{
  const inputs=Array.from(document.getElementsByClassName('text-field__input'))
  inputs.map(input=>{
    const mask=IMask(input,maskOptions)
  })
}

document.addEventListener('DOMContentLoaded',handleContentLoaded)
