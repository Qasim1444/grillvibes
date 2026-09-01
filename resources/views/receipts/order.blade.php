<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice - Chizzix Cafe</title>
    <!-- Bootstrap 5 CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: #f8f9fa;
            font-family: Arial, sans-serif;
        }
        .invoice-card {
            max-width: 400px;
            margin: 1px auto;
            border-radius: 5px;
            box-shadow: 0 4px 12px 0 rgba(0,0,0,0.1);
        }
        .invoice-header {

            padding-bottom: 15px;
            margin-bottom: 15px;
        }
        .invoice-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .invoice-address {
            font-size: 0.85rem;
            color: #6c757d;
            margin-bottom: 5px;
        }
        .invoice-table th, .invoice-table td {
            padding: 8px 5px;
            vertical-align: middle;
        }
        .invoice-table thead th {
            border-bottom: 2px solid #dee2e6;
            font-weight: 600;
        }
        .invoice-table tbody tr:last-child td {
            border-bottom: none;
        }
        .calculation-row {
            border-top: 1px dashed #dee2e6;
            padding-top: 8px;
        }
        .positive-amount {
            color: #28a745;
        }
        .negative-amount {
            color: #dc3545;
        }
        .invoice-footer {
            color: #6c757d;
            font-size: 0.9rem;
            text-align: center;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px dashed #dee2e6;
        }
    </style>
</head>
<body>
<div class="card invoice-card">
    <div class="card-body p-4">
        <div class="invoice-header text-center">
            <img src="https://chizzixcafebackend.codewiresolutions.com/storage/logos/YSHC1wyB4rKmjtQyQTaGelnOhQk3aoqjGMqgouIa.png" alt="Chizzix Logo" width="100">

            <div class="invoice-address">
                Near Imtiaz Mall, Opposite Allied Bank, Ludden Road, Vehari<br>
                +92321-1231235
            </div>
        </div>

        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <span class="fw-semibold">Invoice No:</span>
                <span class="fw-bold">INV-{{ $order->id }}-{{ strtotime($order->order_datetime) }}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span class="fw-semibold">OT:</span>
                <span>{{ $order->type ?? 'N/A' }}</span>
            </div>
        </div>

        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <span class="fw-semibold">Date:</span>
                <span>{{ $order->order_datetime->format('d/m/Y H:i') }}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span class="fw-semibold">Sale's Associate:</span>
                <span>Chizzix</span>
            </div>
        </div>

        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <span class="fw-semibold">Customer:</span>
                <span>{{ $order->customer->name ?? 'Guest' }}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span class="fw-semibold">Phone:</span>
                <span>{{ $order->customer->contact ?? 'N/A' }}</span>
            </div>
            <div class="d-flex justify-content-between">
                <span class="fw-semibold">Address:</span>
                <span>{{ $order->customer->address ?? 'N/A' }}</span>
            </div>
        </div>

        <table class="table invoice-table mb-3">
            <thead>
            <tr>
                <th>Items</th>
                <th class="text-end">Qty</th>
                <th class="text-end">Price</th>
            </tr>
            </thead>
            <tbody>
            @foreach($order->orderItems as $item)
            <tr>
                <td>{{ $item->item->name ?? 'Item' }}</td>
                <td class="text-end">{{ $item->quantity }}</td>
                <td class="text-end">PKR {{ number_format($item->sub_total, 2) }}</td>
            </tr>
            @endforeach
            </tbody>
        </table>

        <div class="mb-2 text-end">
            <span class="fw-semibold">Total Items:</span>
            <span>{{ $order->qty }}</span>
        </div>

        <div class="mb-1 calculation-row d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>PKR {{ number_format($order->subtotal, 2) }}</span>
        </div>
        <div class="mb-1 calculation-row d-flex justify-content-between">
            <span>Service Charges ({{ $order->service_charges_percentage }}%):</span>
            <span class="positive-amount">+PKR {{ number_format($order->service_charges, 2) }}</span>
        </div>
        <div class="mb-1 calculation-row d-flex justify-content-between">
            <span>Discount:</span>
            <span class="negative-amount">-PKR {{ number_format($order->discount_amount, 2) }}</span>
        </div>
        <div class="mb-3 calculation-row d-flex justify-content-between">
            <span class="fw-bold">Grand Total:</span>
            <span class="fw-bold">PKR {{ number_format($order->grand_total, 2) }}</span>
        </div>

        <div class="invoice-footer">
            Thanks for visiting chizzix cafe
        </div>
    </div>
</div>
</body>
</html>
