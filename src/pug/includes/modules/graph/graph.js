import './graph.scss'
import { Chart } from 'chart.js'
$(function () {
  var options = {
    events: [],
  }

  var data = {
    datasets: [
      {
        data: [10, 20, 30],
        borderColor: ['rgb(229, 229, 229)'],
        borderWidth: 3,

        backgroundColor: [
          'red',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86 )',
          'black',
        ],
      },
    ],
  }
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart($('.js-myChart'), {
    type: 'pie',
    options: options,
    data: data,
  })
  const $chart = $('.js-myChart')
  $chart.css('width', '100%')
  $chart.css('height', '100%')
  let i = 0
  $('.js-graph__span').each(function () {
    $(this).css('background-color', data.datasets[0].backgroundColor[i])
    i += 1
  })
})
