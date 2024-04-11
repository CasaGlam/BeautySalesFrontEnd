import React, { Component } from "react";
import Chart from "chart.js/auto";
import { FaTag, FaMoneyBillAlt } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";

class Dashboard extends Component {
  // Datos ficticios para el gráfico de barras
  data = {
    labels: ["Producto A", "Producto B", "Producto C", "Producto D", "Producto E"],
    datasets: [{
      label: 'Cantidad Vendida',
      data: [25, 40, 15, 30, 20],
      backgroundColor: 'rgb(179, 115, 103)',
      borderColor: 'rgb(179, 115, 103)',
      borderWidth: 1
    }]
  };

  chartRef = React.createRef();

  componentDidMount() {
    const ctx = this.chartRef.current.getContext("2d");
    if (window.myChart) {
      window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
      type: "bar",
      data: this.data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              padding: 20 // Ajusta el margen inferior del label de leyenda
            }
          }
        }
      }
    });
  }

  render() {
    return (
      <div className="container mx-auto">
        <div className="bg-secondary-100 py-4 px-8 rounded-lg mb-5">
          <div className="flex flex-col gap-4 md:flex-row justify-around">
            <div className="bg-primary p-6 rounded-lg flex gap-4 items-center w-full md:w-[32%]">
              <div className="w-[40%] flex justify-center items-center rounded-lg py-4 border border-black">
                <FaTag className="w-12 h-12 text-black" />
              </div>
              <div className="w-[60%]items-center flex flex-col justify-center">
                <h2 className="text-xl font-bold text-black">
                  Total
                  <br /> de ventas:
                </h2>
                <div className="">
                  <span className="text-black text-xl">$ 2.500.000</span>
                </div>
              </div>
            </div>
            <div className="bg-primary p-6 rounded-lg flex gap-4 items-center w-full md:w-[32%]">
              <div className="w-[40%] flex justify-center items-center rounded-lg py-4 border border-black">
                <FaBasketShopping className="w-12 h-12 text-black" />
              </div>
              <div className="w-[60%]items-center flex flex-col justify-center">
                <h2 className="text-xl font-bold text-black">
                  Total
                  <br /> de compras:
                </h2>
                <div className="">
                  <span className="text-black text-xl">$ 1.500.000</span>
                </div>
              </div>
            </div>
            <div className="bg-primary p-6 rounded-lg flex gap-4 items-center w-full md:w-[32%] ">
              <div className="w-[40%] flex justify-center items-center rounded-lg py-4 border border-black">
                <FaMoneyBillAlt className="w-12 h-12 text-black" />
              </div>
              <div className="w-[60%]items-center flex flex-col justify-center">
                <h2 className="text-xl font-bold text-black">
                  Ganancias totales:
                </h2>
                <div className="">
                  <span className="text-black text-xl">$ 1.000.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-secondary-100 py-4 px-8 rounded-lg w-full md:w-[63%]">
            <h2 className="text-black font-bold mb-4">Productos Vendidos</h2>
            <canvas ref={this.chartRef}></canvas>
          </div>
          <div className="bg-secondary-100 py-4 px-8 rounded-lg w-full md:w-[35%]">
            <h2 className="bg-primary p-4 rounded-t-xl text-black font-bold">
              Productos recomendados
            </h2>
            <table className="w-full">
              <tbody className="border-l border-r border-b border-primary rounded-b-lg">
                {[...Array(10).keys()].map(index => (
                  <tr key={index + 1} className={`${index % 2 === 0 ? 'bg-secondary-900' : 'bg-secondary-100'}`}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">Producto de belleza {index + 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
