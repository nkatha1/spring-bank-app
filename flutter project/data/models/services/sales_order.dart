class SalesOrderItem {
  final String productId;
  final int quantity;
  final double unitPrice;
  final double discountPercent;

  SalesOrderItem({
    required this.productId,
    required this.quantity,
    required this.unitPrice,
    required this.discountPercent,
  });

  factory SalesOrderItem.fromJson(Map<String, dynamic> json) {
    return SalesOrderItem(
      productId: json['product_id'],
      quantity: json['quantity'],
      unitPrice: json['unit_price'].toDouble(),
      discountPercent: json['discount_percent'].toDouble(),
    );
  }
}

class SalesOrder {
  final String orderId;
  final String customerId;
  final DateTime orderDate;
  final double totalAmount;
  final List<SalesOrderItem> items;

  SalesOrder({
    required this.orderId,
    required this.customerId,
    required this.orderDate,
    required this.totalAmount,
    required this.items,
  });

  factory SalesOrder.fromJson(Map<String, dynamic> json) {
    return SalesOrder(
      orderId: json['order_id'],
      customerId: json['customer_id'],
      orderDate: DateTime.parse(json['order_date']),
      totalAmount: json['total_amount'].toDouble(),
      items: (json['items'] as List)
          .map((item) => SalesOrderItem.fromJson(item))
          .toList(),
    );
  }
}