import { IOrder } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Download, Printer } from "lucide-react";
import { useRef } from "react";

interface OrderConfirmationProps {
  order: IOrder;
}

export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore React functionality
  };

  const handleDownload = () => {
    const invoiceContent = `
Order Invoice #${order.id}
---------------------------
Customer: ${order.first_name} ${order.last_name}
Phone: ${order.phone}
Address: ${order.shipping_address}
---------------------------
Products:
${order.order_products
  .map(
    (product) =>
      `${product.product.name} x ${product.quantity} - ${formatPrice(
        parseFloat(product.total)
      )}`
  )
  .join("\n")}
---------------------------
Shipping: ${formatPrice(order.shipping_amount)}
Total: ${formatPrice(order.total_price)}
Payment Method: ${order.payment_method}
    `;

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div ref={printRef}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Invoice
            </h1>
            <p className="text-gray-600">Order ID: #{order.id}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Customer Information
                </h3>
                <p className="text-gray-600">
                  Name: {order.first_name} {order.last_name}
                </p>
                <p className="text-gray-600">Phone: {order.phone}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Shipping Address
                </h3>
                <p className="text-gray-600">{order.shipping_address}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-4">
                {order.order_products.map((product) => (
                  <div key={product.id} className="flex justify-between">
                    <div>
                      <p className="text-gray-600">
                        {product.product.name} x {product.quantity}
                      </p>
                    </div>
                    <p className="text-gray-900 font-medium">
                      {formatPrice(parseFloat(product.total))}
                    </p>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-900">Shipping</p>
                    <p className="text-gray-900">
                      {formatPrice(order.shipping_amount)}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="font-semibold text-gray-900">Total</p>
                    <p className="font-semibold text-gray-900">
                      {formatPrice(order.total_price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Payment Method: {order.payment_method}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center space-y-4 print:hidden">
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download size={20} /> Download Invoice
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <Printer size={20} /> Print Invoice
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
