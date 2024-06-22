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
      comprasMensuales: [], // Nuevo estado para compras mensuales
      selectedMonth: new Date().toISOString().slice(0, 7),
      productosVendidos: []
    };
    this.chartRef = React.createRef();
    this.chartRefPie = React.createRef();
    this.chartInstance = null;
    this.chartPieInstance = null;
  }

  componentDidMount() {
    this.fetchComprasTotal();
    this.fetchVentasTotal();
    this.fetchVentasMensuales();
    this.fetchProductosMasVendidos();
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
      const ventasResponse = await fetch('https://beautysalesbackend.onrender.com/api/ventas');
      const ventasData = await ventasResponse.json();
      const ventasMensuales = this.groupSalesByMonth(ventasData);

      const comprasResponse = await fetch('https://beautysalesbackend.onrender.com/api/compras');
      const comprasData = await comprasResponse.json();
      const comprasMensuales = this.groupSalesByMonth(comprasData, 'compras');

      this.setState({ ventasMensuales, comprasMensuales }, () => {
        this.renderChart();
      });
    } catch (error) {
      console.error('Error al obtener las ventas y compras mensuales:', error);
    }
  };

  fetchProductosMasVendidos = async () => {
    try {
      const response = await fetch('https://beautysalesbackend.onrender.com/api/productos');
      const data = await response.json();
      const productosVendidos = data.productos
        .filter(producto => producto.canvendida)
        .map(producto => ({
          nombre: producto.nombre,
          canvendida: producto.canvendida
        }));
      this.setState({ productosVendidos }, () => {
        this.renderPieChart();
      });
    } catch (error) {
      console.error('Error al obtener los productos más vendidos:', error);
    }
  };

  groupSalesByMonth = (data, type = 'ventas') => {
    const monthlyData = {};

    data.forEach((item) => {
      const date = new Date(item.fecha);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;

      if (month === this.state.selectedMonth) {
        if (!monthlyData[date.getDate()]) {
          monthlyData[date.getDate()] = 0;
        }

        if (type === 'ventas') {
          item.detallesVenta.forEach((detalle) => {
            monthlyData[date.getDate()] += detalle.total;
          });
        } else if (type === 'compras') {
          monthlyData[date.getDate()] += item.total;
        }
      }
    });

    return monthlyData;
  };

  handleChangeMonth = (event) => {
    this.setState({ selectedMonth: event.target.value });
  };

  renderChart = () => {
    const chartRef = this.chartRef.current.getContext("2d");
    if (this.chartInstance !== null) {
      this.chartInstance.destroy();
    }

    const labels = Object.keys(this.state.ventasMensuales);

    this.chartInstance = new Chart(chartRef, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Ventas",
            data: Object.values(this.state.ventasMensuales),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "Compras",
            data: labels.map(day => this.state.comprasMensuales[day] || 0),
            fill: false,
            borderColor: "rgb(192, 75, 75)",
            tension: 0.1,
          }
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.raw !== null) {
                  label += new Intl.NumberFormat().format(context.raw);
                }
                return label;
              },
              title: function () {
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
              text: 'Monto ($)',
            }
          }
        }
      }
    });
  };

  renderPieChart = () => {
    const chartRef = this.chartRefPie.current.getContext("2d");
    if (this.chartPieInstance !== null) {
      this.chartPieInstance.destroy();
    }

    const nombres = this.state.productosVendidos.map(producto => producto.nombre);
    const cantidades = this.state.productosVendidos.map(producto => producto.canvendida);

    this.chartPieInstance = new Chart(chartRef, {
      type: 'pie',
      data: {
        labels: nombres,
        datasets: [{
          label: 'Productos más vendidos',
          data: cantidades,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'black',  // Color de los labels en la leyenda
              font: {
                size: 14  // Tamaño de la fuente de los labels
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.raw !== null) {
                  label += context.raw;
                }
                return label;
              },
              labelTextColor: function(context) {
                return '#fff';  // Cambiar el color del texto de los labels en los tooltips a blanco
              }
            },
            titleFont: {
              size: 16,  // Tamaño de la fuente del título en las tooltips
              weight: 'bold'
            },
            bodyFont: {
              size: 14,  // Tamaño de la fuente del cuerpo en las tooltips
            },
            titleColor: '#fff',  // Color del título en las tooltips a blanco
            bodyColor: '#fff'  // Color del cuerpo en las tooltips a blanco
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
          <div className="bg-secondary-100 w-[55%] rounded-lg flex justify-center items-center p-4">
            <canvas ref={this.chartRef} />
          </div>
          <div className="bg-secondary-100 w-[45%] rounded-lg justify-center items-center p-4 flex flex-col">
            {/* Aquí puedes agregar el segundo gráfico */}
            <h3 className="text-black font-bold mb-4">Productos mas vendidos</h3>
            <canvas ref={this.chartRefPie} className="max-w-[80%] max-h-[80%]" />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
