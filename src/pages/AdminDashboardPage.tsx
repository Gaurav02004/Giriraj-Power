import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order, QuoteRequest } from '../types';
import {
  LayoutDashboard,
  Package,
  FileText,
  TrendingUp,
  DollarSign,
  Truck,
  Search,
  Eye,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    orders,
    quotes,
    products,
    updateOrderStatus,
    updateQuoteStatus,
    formatPrice,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'quotes' | 'inventory'>('overview');
  const [orderSearch, setOrderSearch] = useState('');
  const [quoteSearch, setQuoteSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  // Financial calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Processing' || o.orderStatus === 'Dispatched').length;
  const newQuotesCount = quotes.filter((q) => q.status === 'Pending').length;
  const lowStockCount = products.filter((p) => p.stock < 20).length;

  const filteredOrders = orders.filter((o) => {
    const q = orderSearch.toLowerCase();
    return (
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.companyName?.toLowerCase().includes(q) ||
      o.phone.toLowerCase().includes(q)
    );
  });

  const filteredQuotes = quotes.filter((quote) => {
    const q = quoteSearch.toLowerCase();
    return (
      quote.id.toLowerCase().includes(q) ||
      quote.fullName.toLowerCase().includes(q) ||
      quote.companyName.toLowerCase().includes(q) ||
      quote.productInterest.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white text-neutral-900 min-h-screen pb-20">
      {/* Admin Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-2">
                  <span>PowerRun Supplier Dispatch Portal</span>
                  <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded font-bold border border-yellow-500/30">
                    MASTER ADMIN
                  </span>
                </h1>
                <p className="text-xs text-neutral-500">Real-time B2B orders, BOQ quotation engine & central inventory hub</p>
              </div>
            </div>

            {/* Quick stats badges */}
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-lg text-neutral-700 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Live Dispatch Active</span>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-6 border-t border-neutral-200 pt-3 overflow-x-auto">
            {[
              { key: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
              { key: 'orders', label: `Orders (${orders.length})`, icon: Truck },
              { key: 'quotes', label: `Quote Requests (${quotes.length})`, icon: FileText },
              { key: 'inventory', label: `Live Catalog (${products.length})`, icon: Package },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-black text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4 Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-neutral-500">Total Billed Revenue</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-black font-mono mt-3">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                  <span>+18% vs last month</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-neutral-500">Active Site Orders</span>
                  <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-800 border border-yellow-200 flex items-center justify-center font-bold">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-black font-mono mt-3">
                  {orders.length} <span className="text-xs font-normal text-neutral-500">({pendingOrders} in transit)</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">100% on-time dispatch rate</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-neutral-500">Pending Quotes / BOQs</span>
                  <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-800 border border-yellow-200 flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-black font-mono mt-3">
                  {quotes.length} <span className="text-xs font-normal text-neutral-500">({newQuotesCount} pending)</span>
                </div>
                <div className="text-[11px] text-neutral-600 font-medium mt-1">Average estimate time: 1.4h</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-neutral-500">Inventory Health</span>
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-black border border-neutral-200 flex items-center justify-center font-bold">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-black font-mono mt-3">
                  {products.length} SKUs
                </div>
                <div className="text-[11px] text-neutral-600 font-medium mt-1">
                  {lowStockCount} items below safety stock
                </div>
              </div>
            </div>

            {/* Recent Orders & Recent Quotes Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-black flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>Recent Site Dispatches</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 4).map((order) => (
                    <div
                      key={order.id}
                      onClick={() => {
                        setSelectedOrder(order);
                        setActiveTab('orders');
                      }}
                      className="p-3.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-black">{order.orderNumber}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                              order.orderStatus === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : order.orderStatus === 'Dispatched'
                                ? 'bg-yellow-100 text-yellow-900 border border-yellow-300'
                                : 'bg-neutral-200 text-neutral-800 border border-neutral-300'
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 mt-1">
                          {order.customerName} • {order.companyName}
                        </p>
                      </div>
                      <span className="font-mono font-bold text-sm text-black">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Quotes */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-black flex items-center gap-2">
                    <FileText className="w-4 h-4 text-yellow-600" />
                    <span>Active BOQ Quotation Requests</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold"
                  >
                    View All Quotes →
                  </button>
                </div>

                <div className="space-y-3">
                  {quotes.slice(0, 4).map((quote) => (
                    <div
                      key={quote.id}
                      onClick={() => {
                        setSelectedQuote(quote);
                        setActiveTab('quotes');
                      }}
                      className="p-3.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-black">#{quote.id}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                              quote.status === 'Quoted' || quote.status === 'Approved'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-yellow-100 text-yellow-900 border border-yellow-300'
                            }`}
                          >
                            {quote.status}
                          </span>
                          {quote.hasBOMFile && (
                            <span className="text-[10px] bg-neutral-200 text-black px-1.5 py-0.5 rounded font-medium">
                              BOM File
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 line-clamp-1">
                          {quote.fullName} ({quote.projectType}) • {quote.productInterest}
                        </p>
                      </div>
                      <span className="text-xs text-neutral-600 shrink-0 font-medium">
                        {quote.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ORDERS MANAGEMENT TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search order #, contractor, phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
              <div className="text-xs text-neutral-500">
                Showing <strong className="text-black">{filteredOrders.length}</strong> orders
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Orders Table */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-700">
                    <thead className="bg-neutral-100 text-neutral-600 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-200">
                      <tr>
                        <th className="p-3.5">Order #</th>
                        <th className="p-3.5">Contractor / Firm</th>
                        <th className="p-3.5">Items</th>
                        <th className="p-3.5">Amount</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          className={`hover:bg-neutral-50 transition-colors cursor-pointer ${
                            selectedOrder?.id === order.id ? 'bg-emerald-50/50 border-l-2 border-emerald-600' : ''
                          }`}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <td className="p-3.5 font-mono font-bold text-black">{order.orderNumber}</td>
                          <td className="p-3.5">
                            <div className="font-bold text-black">{order.customerName}</div>
                            <div className="text-[10px] text-neutral-500">{order.companyName}</div>
                          </td>
                          <td className="p-3.5 text-neutral-600">
                            {order.items.length} materials
                          </td>
                          <td className="p-3.5 font-mono font-bold text-black">
                            {formatPrice(order.total)}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={order.orderStatus}
                              onChange={(e) => {
                                e.stopPropagation();
                                updateOrderStatus(order.id, e.target.value as any);
                              }}
                              className="bg-white border border-neutral-300 text-xs rounded px-2 py-1 text-neutral-900 font-medium focus:outline-hidden"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Out for Site Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                              }}
                              className="p-1.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                              title="View details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Detail Panel */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
                {selectedOrder ? (
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                      <div>
                        <h4 className="font-mono font-black text-sm text-black">
                          {selectedOrder.orderNumber}
                        </h4>
                        <span className="text-neutral-500 text-[10px]">
                          Placed on: {new Date(selectedOrder.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold text-[10px]">
                        {selectedOrder.orderStatus}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-neutral-500 font-bold uppercase text-[10px]">Contractor Info</div>
                      <div className="text-black font-semibold">{selectedOrder.customerName} ({selectedOrder.companyName})</div>
                      <div className="text-neutral-600">Phone: {selectedOrder.phone}</div>
                      <div className="text-neutral-600">Email: {selectedOrder.email}</div>
                      {selectedOrder.gstin && (
                        <div className="text-emerald-800 font-mono font-bold">GSTIN: {selectedOrder.gstin}</div>
                      )}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-neutral-200">
                      <div className="text-neutral-500 font-bold uppercase text-[10px]">Site Destination</div>
                      <div className="text-black">
                        {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                      </div>
                      {selectedOrder.shippingAddress.landmark && (
                        <div className="text-neutral-500 text-[11px] mt-0.5">
                          Landmark: {selectedOrder.shippingAddress.landmark}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-neutral-200">
                      <div className="text-neutral-500 font-bold uppercase text-[10px]">
                        Ordered Materials ({selectedOrder.items.length})
                      </div>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto">
                        {selectedOrder.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-[11px] py-1 border-b border-neutral-100">
                            <span className="truncate max-w-[180px] text-black">
                              {item.quantity}x {item.productName}
                            </span>
                            <span className="font-mono font-bold text-black">{formatPrice(item.totalPrice)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-200 flex justify-between items-baseline font-bold">
                      <span className="text-black">Total Order Value:</span>
                      <span className="text-base text-emerald-700 font-mono">
                        {formatPrice(selectedOrder.total)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-neutral-400 text-xs">
                    Select an order from the list to review complete site delivery and tax invoicing details.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. QUOTES MANAGEMENT TAB */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search quote #, firm, project type..."
                  value={quoteSearch}
                  onChange={(e) => setQuoteSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
              <div className="text-xs text-neutral-500">
                Showing <strong className="text-black">{filteredQuotes.length}</strong> quotation inquiries
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Quotes Table */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-700">
                    <thead className="bg-neutral-100 text-neutral-600 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-200">
                      <tr>
                        <th className="p-3.5">Quote #</th>
                        <th className="p-3.5">Contractor / Firm</th>
                        <th className="p-3.5">Project Scope</th>
                        <th className="p-3.5">Location</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredQuotes.map((quote) => (
                        <tr
                          key={quote.id}
                          className={`hover:bg-neutral-50 transition-colors cursor-pointer ${
                            selectedQuote?.id === quote.id ? 'bg-yellow-50/50 border-l-2 border-yellow-400' : ''
                          }`}
                          onClick={() => setSelectedQuote(quote)}
                        >
                          <td className="p-3.5 font-mono font-bold text-black">#{quote.id}</td>
                          <td className="p-3.5">
                            <div className="font-bold text-black">{quote.fullName}</div>
                            <div className="text-[10px] text-neutral-500">{quote.companyName}</div>
                          </td>
                          <td className="p-3.5">
                            <div className="text-black truncate max-w-[160px]">{quote.productInterest}</div>
                            <div className="text-[10px] text-neutral-500">{quote.quantity}</div>
                          </td>
                          <td className="p-3.5 text-neutral-600">{quote.deliveryLocation || 'India'}</td>
                          <td className="p-3.5">
                            <select
                              value={quote.status}
                              onChange={(e) => {
                                e.stopPropagation();
                                updateQuoteStatus(quote.id, e.target.value as any);
                              }}
                              className="bg-white border border-neutral-300 text-xs rounded px-2 py-1 text-neutral-900 font-medium focus:outline-hidden"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Reviewing">Reviewing</option>
                              <option value="Quoted">Quoted</option>
                              <option value="Approved">Approved</option>
                            </select>
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedQuote(quote);
                              }}
                              className="p-1.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quote Detail Panel */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
                {selectedQuote ? (
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                      <div>
                        <h4 className="font-mono font-black text-sm text-black">#{selectedQuote.id}</h4>
                        <span className="text-neutral-500 text-[10px]">{selectedQuote.projectType} Project</span>
                      </div>
                      <span className="bg-yellow-100 text-yellow-900 border border-yellow-300 px-2 py-0.5 rounded font-bold text-[10px]">
                        {selectedQuote.status}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-neutral-500 font-bold uppercase text-[10px]">Contact Person</div>
                      <div className="text-black font-semibold">{selectedQuote.fullName}</div>
                      <div className="text-neutral-600">{selectedQuote.companyName}</div>
                      <div className="text-neutral-600">Phone: {selectedQuote.phone}</div>
                      <div className="text-neutral-600">Email: {selectedQuote.email}</div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-neutral-200">
                      <div className="text-neutral-500 font-bold uppercase text-[10px]">Material Requirement</div>
                      <div className="text-black font-medium">{selectedQuote.productInterest}</div>
                      <div className="text-emerald-800 font-mono font-bold">Scope: {selectedQuote.quantity}</div>
                      <div className="text-neutral-600">Target Date: {selectedQuote.targetDeliveryDate}</div>
                      <div className="text-neutral-600">Location: {selectedQuote.deliveryLocation}</div>
                    </div>

                    {selectedQuote.additionalRequirements && (
                      <div className="pt-2 border-t border-neutral-200 text-neutral-700 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                        <strong>Technical Notes:</strong> {selectedQuote.additionalRequirements}
                      </div>
                    )}

                    <div className="pt-3 border-t border-neutral-200">
                      <button
                        onClick={() => {
                          updateQuoteStatus(selectedQuote.id, 'Quoted');
                          showToast('Quote Status Updated', `Quotation marked as Quoted.`, 'success');
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-xs"
                      >
                        Mark as Quoted & Email Contractor
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-neutral-400 text-xs">
                    Select a quotation request to view contact details, requested technical specs, and submit pricing.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs flex justify-between items-center text-xs">
              <span className="text-neutral-800 font-bold">
                Master Warehouse Inventory ({products.length} Active SKUs)
              </span>
              <span className="text-emerald-800 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">All CPRI / BIS Certified</span>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-700">
                  <thead className="bg-neutral-100 text-neutral-600 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-200">
                    <tr>
                      <th className="p-3.5">Product SKU</th>
                      <th className="p-3.5">Brand</th>
                      <th className="p-3.5">Material Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Base Unit Price</th>
                      <th className="p-3.5">Warehouse Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-3.5 font-mono text-neutral-500">{prod.sku}</td>
                        <td className="p-3.5 font-bold text-black">{prod.brand}</td>
                        <td className="p-3.5 text-neutral-900 font-medium truncate max-w-xs">{prod.name}</td>
                        <td className="p-3.5 text-neutral-500">{prod.category}</td>
                        <td className="p-3.5 font-mono font-bold text-black">
                          {formatPrice(prod.price)} / {prod.unit}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                              prod.stock > 50
                                ? 'text-emerald-800 bg-emerald-100 border border-emerald-200'
                                : prod.stock > 0
                                ? 'text-yellow-900 bg-yellow-100 border border-yellow-300'
                                : 'text-rose-800 bg-rose-100 border border-rose-200'
                            }`}
                          >
                            {prod.stock} units
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
