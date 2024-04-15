import React, { Component } from "react";
import Chart from "chart.js/auto";
import { FaTag, FaMoneyBillAlt } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";

// Icons
import { MdSell } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { TbCoinFilled } from "react-icons/tb";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCompras: 0,
    };
  }

  componentDidMount() {
    this.fetchComprasTotal();
  }

  fetchComprasTotal = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/compras');
      const data = await response.json();
      // Sumar los totales de las compras
      const totalCompras = data.reduce((total, compra) => total + compra.total, 0);
      this.setState({ totalCompras });
    } catch (error) {
      console.error('Error al obtener el total de compras:', error);
    }
  };

  render() {
    const { totalCompras } = this.state;
    return (
      <div>
        <ul className="flex gap-4 mb-8">
          <li className="bg-secondary-100 flex items-center w-[33%] py-4 px-8 gap-4 rounded-xl">
            <div className="bg-[#8142ff] p-8 rounded-lg">
            <FaShoppingCart className="text-4xl"/>
            </div>
            <span >
            <h3 className="font-bold text-3xl">${totalCompras.toLocaleString()}</h3>
              <p className="font-bold">Compras</p>
            </span>
          </li>
          <li className="bg-secondary-100 flex items-center w-[33%] py-4 px-8 gap-4 rounded-xl">
          <div className="bg-[#059bff] p-8 rounded-lg">
          <MdSell className="text-4xl"/>
            </div>
            <span >
              <h3 className="font-bold text-3xl">$1.350.000</h3>
              <p className="font-bold">Ventas</p>
            </span>
          </li>
          <li className="bg-secondary-100 flex items-center w-[33%] py-4 px-8 gap-4 rounded-xl">
          <div className="bg-[#ff4069] p-8 rounded-lg">
            <TbCoinFilled className="text-4xl"/>
            </div>
            <span>
              <h3 className="font-bold text-3xl">$712.000</h3>
              <p className="font-bold">Ganancias</p>
            </span>
          </li>
        </ul>

        <div className="w-full flex gap-12">
          <div className="bg-secondary-100 w-[55%] rounded-lg">
a
          </div>
          <div className="bg-secondary-100 w-[45%] rounded-lg">
a
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
