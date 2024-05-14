import React, { Component } from "react";
import Chart from "chart.js/auto";
import { FaShoppingCart } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { TbCoinFilled } from "react-icons/tb";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCompras: 0,
      totalVentas: 0,
      ventasMensuales: [],
      selectedMonth: new Date().toISOString().slice(0, 7),
    };
    this.chartRef = React.createRef();
    this.chartInstance = null;
  }

  componentDidMount() {
    this.fetchComprasTotal();
    this.fetchVentasTotal();
    this.fetchVentasMensuales();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedMonth !== this.state.selectedMonth) {
      this.fetchVentasMensuales();
    }
  }

  fetchComprasTotal = async () => {
    try {
      const response = await fetch('https://beautysalesbackend.onrender.com/api/compras');
      const data = await response.json();
      const totalCompras = data.reduce((total, compra) => total + compra.total, 0);
      this.setState({ totalCompras });
    } catch (error) {
      console.error('Error al obtener el total de compras:', error);
    }
  };

  fetchVentasTotal = async () => {
    try {
      const response = await fetch('https://beautysalesbackend.onrender.com/api/ventas');
      const data = await response.json();
      const totalVentas = data.reduce((total, venta) => total + (venta.detallesVenta.reduce((subtotal, detalle) => subtotal + detalle.total, 0)), 0);
      this.setState({ totalVentas });
    } catch (error) {
      console.error('Error al obtener el total de ventas:', error);
    }
  };

  fetchVentasMensuales = async () => {
    try {
      const response = await fetch('https://beautysalesbackend.onrender.com/api/ventas');
      const data = await response.json();
      const ventasMensuales = this.groupSalesByMonth(data);
      this.setState({ ventasMensuales }, () => {
        this.renderChart();
      });
    } catch (error) {
      console.error('Error al obtener las ventas mensuales:', error);
    }
  };

  groupSalesByMonth = (sales) => {
    const monthlySales = {};

    sales.forEach((sale) => {
      const saleDate = new Date(sale.fecha);
      const month = `${saleDate.getFullYear()}-${(saleDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      if (month === this.state.selectedMonth) {
        if (!monthlySales[saleDate.getDate()]) {
          monthlySales[saleDate.getDate()] = 0;
        }

        sale.detallesVenta.forEach((detalle) => {
          monthlySales[saleDate.getDate()] += detalle.total;
        });
      }
    });

    return monthlySales;
  };

  handleChangeMonth = (event) => {
    this.setState({ selectedMonth: event.target.value });
  };

  renderChart = () => {
    const chartRef = this.chartRef.current.getContext("2d");
    if (this.chartInstance !== null) {
      this.chartInstance.destroy();
    }
    this.chartInstance = new Chart(chartRef, {
      type: "line",
      data: {
        labels: Object.keys(this.state.ventasMensuales),
        datasets: [
          {
            label: "Gráfico de ventas",
            data: Object.values(this.state.ventasMensuales),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                var label = context.dataset.label || '';

                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat().format(context.parsed.y);
                }
                return label;
              },
              title: function (context) {
                return new Date().toISOString().slice(0, 7);
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Día',
            }
          },
          y: {
            title: {
              display: true,
              text: 'Ventas ($)',
            }
          }
        }
      }
    });
  };

  render() {
    const { totalCompras, totalVentas } = this.state;
    return (
      <div>
        <ul className="flex gap-4 mb-8">
          <li className="bg-secondary-100 flex items-center w-[33%] py-4 px-8 gap-4 rounded-xl">
            <div className="bg-[#8142ff] p-8 rounded-lg">
              <FaShoppingCart className="text-4xl text-white"/>
            </div>
            <span>
              <h3 className="font-bold text-3xl text-texto-100">${totalCompras.toLocaleString()}</h3>
              <p className="font-bold text-texto-100">Compras</p>
            </span>
          </li>
          <li className="bg-secondary-100 flex items-center w-[33%] py-4 px-8 gap-4 rounded-xl">
            <div className="bg-[#059bff] p-8 rounded-lg">
              <MdSell className="text-4xl text-white"/>
            </div>
            <span>
              <h3 className="font-bold text-3xl text-texto-100">${totalVentas.toLocaleString()}</h3>
              <p className="font-bold text-texto-100">Ventas</p>
            </span>
          </li>
          <li className="bg-secondary-100 flex items-center w-[33%] py-4 px-8 gap-4 rounded-xl">
            <div className="bg-[#ff4069] p-8 rounded-lg">
              <TbCoinFilled className="text-4xl text-white"/>
            </div>
            <span>
              <h3 className="font-bold text-3xl text-texto-100">${(totalVentas - totalCompras).toLocaleString()}</h3>
              <p className="font-bold text-texto-100">Ganancias</p>
            </span>
          </li>
        </ul>

        <div className="w-full flex gap-12">
          <div className="bg-secondary-100 w-[55%] rounded-lg">
            <canvas ref={this.chartRef} />
          </div>
          <div className="bg-secondary-100 w-[45%] rounded-lg">
            {/* Aquí puedes agregar el segundo gráfico */}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
