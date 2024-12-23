import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  chart: any;
  percentageChart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    // Задержка для гарантии загрузки элемента canvas
    setTimeout(() => {
      this.createWeightChart();
      this.createPercentageChart();
    }, 0);
  }

  createWeightChart() {
    this.chart = new Chart('weight-dynamic', {
      type: 'line',
      data: {
        labels: [
          '27 Ноября',
          '28 Ноября',
          '29 Ноября',
          '30 Ноября',
          '1 Декабря',
          '2 Декабря',
          '3 Декабря',
          '4 Декабря',
          '5 Декабря',
          '6 Декабря',
          '7 Декабря',
          '8 Декабря'
        ],
        datasets: [
          {
            label: 'Вес (кг)', // Подпись графика
            data: [70, 69.5, 70.2, 69.8, 69.5, 69.0, 68.5, 68.8, 68.5, 68.3, 68.0, 67.8, 67.5, 67.0], // Данные по оси Y
            borderColor: '#3e95cd', // Цвет линии
            fill: false, // Заполнение под графиком
            tension: 0.1 // Гладкость линии
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false, // Начинать с последнего значения
            title: {
              display: true,
              text: 'Вес (кг)' // Название оси Y
            }
          },
          x: {
            title: {
              display: true,
              text: 'Дата' // Название оси X
            }
          }
        },
      },
    });
  }

  createPercentageChart() {
    const weightData = [70, 69.5, 70.2, 69.8, 69.5, 69.0, 68.5, 68.8, 68.5, 68.3, 68.0, 67.8, 67.5, 67.0];
    const percentageChange = this.calculatePercentageChange(weightData);

    this.percentageChart = new Chart('percentage-weight-dynamic', {
      type: 'line',
      data: {
        labels: [
          '27 Ноября',
          '28 Ноября',
          '29 Ноября',
          '30 Ноября',
          '1 Декабря',
          '2 Декабря',
          '3 Декабря',
          '4 Декабря',
          '5 Декабря',
          '6 Декабря',
          '7 Декабря',
          '8 Декабря'
        ],
        datasets: [
          {
            label: 'Процентное изменение веса (%)', // Подпись графика
            data: percentageChange, // Данные по оси Y
            borderColor: '#ff5733', // Цвет линии
            fill: false, // Заполнение под графиком
            tension: 0.1 // Гладкость линии
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true, // Начинать с нуля
            title: {
              display: true,
              text: 'Процентное изменение (%)' // Название оси Y
            }
          },
          x: {
            title: {
              display: true,
              text: 'Дата' // Название оси X
            }
          }
        },
      },
    });
  }

  calculatePercentageChange(weights: number[]): number[] {
    const percentageChanges: number[] = [];

    for (let i = 1; i < weights.length; i++) {
      const change = ((weights[i] - weights[i - 1]) / weights[i - 1]) * 100;
      percentageChanges.push(change);
    }

    return percentageChanges;
  }
}