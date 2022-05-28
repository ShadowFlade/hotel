import Chart from 'chart.js/auto';
import '../../components/hotel-card/hotel-card.js';
import '../../components/bullet-list/bullet-list.js';
import '../../components/comment/comment.js';
import '../../components/bill/bill.js';
import '../../components/features/features.js';
import '../../components/date-picker/date-picker.js';
import './room-details.scss';

$(function () {
  var options = {
    events: [],
  };

  var data = {
    datasets: [
      {
        data: [10, 20, 30],
        borderWidth: 0,

        backgroundColor: ['#b59eff', '#6fcf99', '#ffc19c', 'black'],
      },
    ],
  };
  new Chart($('.js-my-chart'), {
    type: 'pie',
    options: options,
    data: data,
  });
  const $chart = $('.js-my-chart');
  $chart.css('width', '100%');
  $chart.css('height', '100%');
  let i = 0;
  $('.js-graph__bullet').each(function () {
    $(this).css('background-color', data.datasets[0].backgroundColor[i]);
    i += 1;
  });
});
