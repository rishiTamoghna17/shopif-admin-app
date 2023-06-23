import React from 'react'
import "../assets/style.css"
import { Icon } from '@shopify/polaris';
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
    BankMajor
  } from '@shopify/polaris-icons';
function Sidebar() {
  return (
<>
<div className = "sidebar">
    <div className = "sidebar-top">
        <Icon source={HomeMajor}
  color="base"/>
    </div>

</div>




</>
  )};

export default Sidebar