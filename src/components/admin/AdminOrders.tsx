import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Truck,
  Phone,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  Ban,
  Check,
} from 'lucide-react';
import {
  FirestoreOrder as OrderData,
  getStoredOrders,
  saveStoredOrders,
} from '../../firebase/orderService';

export const AdminOrders: React.FC = () => {
  const { currentUser, isAdmin, setDemoAdmin } = useAuth();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'delivered' | 'cancelled'>('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Load orders and subscribe to live local updates
  useEffect(() => {
    const loadOrders = () => {
      const stored = getStoredOrders();
      setOrders(stored);
      setLoading(false);
    };

    loadOrders();

    const handleUpdate = () => {
      loadOrders();
    };

    window.addEventListener('giriraj_orders_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('giriraj_orders_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Update order status in local store
  const handleUpdateStatus = async (orderId: string, newStatus: 'pending' | 'confirmed' | 'delivered' | 'cancelled') => {
    setUpdatingId(orderId);
    try {
      const currentList = getStoredOrders();
      const updated = currentList.map((ord) =>
        ord.id === orderId || ord.orderNumber === orderId ? { ...ord, status: newStatus } : ord
      );
      saveStoredOrders(updated);
      setOrders(updated);
      if (selectedOrder && (selectedOrder.id === orderId || selectedOrder.orderNumber === orderId)) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err: any) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.userPhone.toLowerCase().includes(q) ||
      (o.customerName && o.customerName.toLowerCase().includes(q)) ||
      o.deliveryAddress.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 border border-yellow-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            <span>Pending</span>
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 border border-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            <span>Confirmed</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            <ShieldCheck className="w-3 h-3" />
            <span>Delivered</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 border border-rose-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            <Ban className="w-3 h-3" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return <span className="text-neutral-600 capitalize">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Verification Header */}
      <div className="bg-neutral-900 text-white rounded-2xl p-5 border border-neutral-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-black">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">Live Real-Time Orders Feed</h2>
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Live Active</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Instant contractor dispatch updates for <span className="text-yellow-400 font-bold">Giriraj Power</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-xl text-neutral-300">
            Account: <code className="text-white font-mono">{currentUser?.email || currentUser?.phoneNumber || 'Admin Active'}</code>
          </div>
          {!isAdmin && (
            <button
              onClick={() => setDemoAdmin(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer text-xs"
            >
              Grant Admin Preview
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by phone, order ID, address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-hidden focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {(['all', 'pending', 'confirmed', 'delivered', 'cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200'
              }`}
            >
              {st} {st !== 'all' && `(${orders.filter((o) => o.status === st).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table and Detail View */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center text-neutral-500 flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
          <span className="text-xs font-bold">Loading Orders...</span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center space-y-3">
          <Package className="w-10 h-10 text-neutral-300 mx-auto" />
          <h3 className="text-sm font-bold text-neutral-800">No Orders Match Your Filter</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            When contractors check out from the site, incoming dispatches will automatically populate here in real time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Orders Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-700">
                <thead className="bg-neutral-100 text-neutral-600 uppercase text-[10px] font-bold tracking-wider border-b border-neutral-200">
                  <tr>
                    <th className="p-3.5">Order ID & Date</th>
                    <th className="p-3.5">Customer Phone</th>
                    <th className="p-3.5">Materials / Items</th>
                    <th className="p-3.5">Total (₹)</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`hover:bg-neutral-50 transition-colors cursor-pointer ${
                        selectedOrder?.id === order.id ? 'bg-emerald-50/50 border-l-3 border-emerald-600' : ''
                      }`}
                    >
                      <td className="p-3.5">
                        <div className="font-mono font-bold text-black">{order.orderNumber}</div>
                        <div className="text-[10px] text-neutral-400">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5 font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 w-fit">
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{order.userPhone}</span>
                        </div>
                        {order.customerName && (
                          <div className="text-[10px] text-neutral-500 mt-0.5 truncate max-w-[140px]">
                            {order.customerName}
                          </div>
                        )}
                      </td>

                      <td className="p-3.5">
                        <div className="text-black font-semibold">
                          {order.items.length} {order.items.length === 1 ? 'material' : 'materials'}
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate max-w-[160px]">
                          {order.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}
                        </div>
                      </td>

                      <td className="p-3.5 font-mono font-black text-black text-sm">
                        ₹{Number(order.totalAmount).toLocaleString('en-IN')}
                      </td>

                      <td className="p-3.5">
                        {getStatusBadge(order.status)}
                      </td>

                      <td className="p-3.5 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id || order.orderNumber, 'confirmed')}
                            disabled={updatingId === order.id}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer shadow-2xs"
                            title="Mark Confirmed"
                          >
                            Confirm
                          </button>
                        )}
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id || order.orderNumber, 'delivered')}
                            disabled={updatingId === order.id}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer shadow-2xs"
                            title="Mark Delivered"
                          >
                            Delivered
                          </button>
                        )}
                        {order.status !== 'delivered' && order.status !== 'cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id || order.orderNumber, 'cancelled')}
                            disabled={updatingId === order.id}
                            className="bg-neutral-100 hover:bg-rose-100 text-neutral-600 hover:text-rose-700 text-[11px] font-semibold px-2 py-1 rounded-lg transition-colors cursor-pointer border border-neutral-200"
                            title="Cancel Order"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Order Detail Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
            {selectedOrder ? (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <div>
                    <h4 className="font-mono font-black text-sm text-black">{selectedOrder.orderNumber}</h4>
                    <span className="text-neutral-500 text-[10px]">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div>{getStatusBadge(selectedOrder.status)}</div>
                </div>

                {/* Customer & Phone */}
                <div className="space-y-2 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Verified Contact</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-black flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-700" />
                      <span>{selectedOrder.userPhone}</span>
                    </span>
                    <a
                      href={`tel:${selectedOrder.userPhone.replace(/\s+/g, '')}`}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
                    >
                      Call Buyer
                    </a>
                  </div>
                  {selectedOrder.customerName && (
                    <div className="text-neutral-700 font-medium">{selectedOrder.customerName}</div>
                  )}
                  {selectedOrder.companyName && (
                    <div className="text-neutral-500 text-[11px]">{selectedOrder.companyName}</div>
                  )}
                </div>

                {/* Site Delivery Address */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Site Delivery Location</span>
                  </span>
                  <p className="text-neutral-800 font-medium leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                    {selectedOrder.deliveryAddress}
                  </p>
                </div>

                {/* Items List */}
                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                    Materials Ordered ({selectedOrder.items.length})
                  </span>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1.5 border-b border-neutral-100">
                        <div className="truncate pr-2">
                          <span className="font-bold text-black">{item.qty}x</span>{' '}
                          <span className="text-neutral-800">{item.name}</span>
                        </div>
                        <span className="font-mono font-bold text-black shrink-0">
                          ₹{(item.price * item.qty).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                  <span className="font-bold text-black text-sm">Total Value:</span>
                  <span className="text-lg font-black text-emerald-700 font-mono">
                    ₹{Number(selectedOrder.totalAmount).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Status Action Buttons */}
                <div className="pt-2 border-t border-neutral-200 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id || selectedOrder.orderNumber, 'confirmed')}
                    disabled={updatingId === selectedOrder.id}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-xs text-center cursor-pointer"
                  >
                    Mark Confirmed
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id || selectedOrder.orderNumber, 'delivered')}
                    disabled={updatingId === selectedOrder.id}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-xs text-center cursor-pointer"
                  >
                    Mark Delivered
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-neutral-400 text-xs">
                Select an order row from the real-time list to inspect itemized BOM details and update dispatch stages.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
