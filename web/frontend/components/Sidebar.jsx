import React from "react";
import "../assets/style.css";
import { Link, Icon } from "@shopify/polaris";
import { useNavigate } from "@shopify/app-bridge-react";
import {
  HomeMajor,
  MarketingMajor,
  CashDollarMajor,
  ComposeMajor,
  ProductCostMajor,
  TaxMajor,
  PinMajor,
  InventoryMajor,
  ShipmentMajor,
  TitleMinor,
  SandboxMajor,
  ExistingInventoryMajor,
  NoteMajor,
  BankMajor,
} from "@shopify/polaris-icons";
function Sidebar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-top">
          {/* <i className="logo fa-brands fa-sketch"></i> */}
          <Icon source={HomeMajor} color="subdued" />
          {/* <span className="brand">Home</span> */}
        </div>
        <div className="sidebar-center">
          <ul className="list">
            <li className="list-item">
              <div className="pedro">
                {" "}
                <Icon source={MarketingMajor} color="subdued" />
                <span className="pedro1">
                  <Link
                    removeUnderline
                    monochrome
                    onClick={() => {
                      navigate("/products");
                    }}
                  >
                    products
                  </Link>
                </span>
              </div>
            </li>

            <li className="list-item">
              <div className="pedro">
                {" "}
                <Icon source={CashDollarMajor} color="subdued" />
                <span className="pedro1">
                  <Link
                    removeUnderline
                    monochrome
                    onClick={() => {
                      navigate("/plans");
                    }}
                  >
                    Plans
                  </Link>
                </span>
              </div>
            </li>

            <li className="list-item">
              <div className="pedro">
                {" "}
                <Icon source={ProductCostMajor} color="subdued" />
                <span className="pedro1">
                  <Link
                    removeUnderline
                    monochrome
                    onClick={() => {
                      navigate("/orders");
                    }}
                  >
                    orders
                  </Link>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className="sidebar-bottom">
          <div className="color-box dark"></div>
          <div className="color-box night"></div>
          <div className="color-box light"></div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
