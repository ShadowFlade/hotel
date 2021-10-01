import './graph.scss'
import { Chart } from 'chart.js'
$(function() {
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
  var myChart = new Chart($('.js-myChart'), {
    type: 'pie',
    options: options,
    data: data,
  })
  $('.js-myChart').css('width', '100%')
  $('.js-myChart').css('height', '100%')
  let i = 0
  $('.js-graph__span').each(function(index) {
    $(this).css('background-color', data.datasets[0].backgroundColor[i])
    i += 1
  })
})
